import React, { useState, useEffect } from "react";
import TextInput from "./components/TextInput";
import TextOutput from "./components/TextOutput";
import ActionButton from "./components/ActionButton";
import { detectLanguage } from "./api/languageDetection";
import { initializeSummarizer, summarizeText } from "./api/summarizeText";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [summarizer, setSummarizer] = useState(null);

  // Initialize summarizer on mount (preloading the model)
  useEffect(() => {
    const loadSummarizer = async () => {
      const instance = await initializeSummarizer(setError);
      setSummarizer(instance);
    };
    loadSummarizer();
  }, []);

  // Handle input and language detection
  const handleSend = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text.");
      return;
    }

    try {
      await detectLanguage(inputText, setError, (detectedLanguage) => {
        setDetectedLanguage(detectedLanguage);

        // Save message
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: inputText, language: detectedLanguage },
        ]);
      });

      setInputText("");
    } catch (err) {
      setError("Error processing text: " + err.message);
    }
  };

  // Handle fast summarization (reuse preloaded model)
  const handleSummarize = async (text) => {
    if (detectedLanguage !== "en" || !summarizer) return;

    try {
      const summaryResult = await summarizeText(
        text,
        summarizer,
        setError
      );
      setSummary(summaryResult);
    } catch (err) {
      setError("Error summarizing text: " + err.message);
    }
  };

  return (
    <div className="w-[90%] max-w-xl m-auto bg-white py-2 h-screen overflow-y-scroll relative">
      {/* Display Messages */}
      {messages.map((msg, index) => (
        <div key={index}>
          <TextOutput
            inputText={msg.text}
            detectedLanguage={
              msg.text.length < 150
                ? `${msg.language}`
                : null
            }
          />

          {/* Show Summarize Button if Text > 150 chars & Language is English */}
          {msg.text.length > 150 && msg.language === "en" && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() => handleSummarize(msg.text)}
            >
              Summarize
            </button>
          )}
        </div>
      ))}

      {/* Display Summary */}
      {summary && (
        <p className="mt-4 p-2 bg-gray-100 rounded-lg shadow-sm">
          Summary: {summary}
        </p>
      )}

      {/* Input and Action */}
      <div className="flex items-center gap-3 px-3 static bottom-0">
        <TextInput
          setInputText={setInputText}
          inputText={inputText}
          error={error}
          setError={setError}
        />
        <ActionButton onClick={handleSend} />
      </div>
    </div>
  );
}

export default App;
