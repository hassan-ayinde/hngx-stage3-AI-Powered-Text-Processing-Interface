import React, { useState, useEffect } from "react";

const LanguageTranslator = ({ inputText, detectedLanguage}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("es"); // Default: Spanish
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState("");
  const [translator, setTranslator] = useState(null);

  // Language Options
  const languages = [
    { code: "en", name: "English" },
    { code: "pt", name: "Portuguese" },
    { code: "es", name: "Spanish" },
    { code: "ru", name: "Russian" },
    { code: "tr", name: "Turkish" },
    { code: "fr", name: "French" },
  ];

  // Initialize translator on mount or language change
  useEffect(() => {
    const initializeTranslator = async () => {
      try {
        if (!self.ai?.translator) {
          setError("Translator API is not available.");
          return;
        }

        const apiToken = import.meta.env.VITE_TRANSLATOR_API_TOKEN;
        // const apiOrigin = import.meta.env.VITE_API_ORIGIN;

        if (!apiToken) {
          setError("Missing API token. Check your .env file.");
          return;
        }

        // Ensure we don't try to translate to the same language
        if (detectedLanguage === selectedLanguage) {
          setError("Source and target languages cannot be the same.");
          return;
        }

        // Initialize the translator
        const options = {
          token: apiToken,
          // origin: apiOrigin,
          sourceLanguage: detectedLanguage || "en", // Fallback to English
          targetLanguage: selectedLanguage,
          experimental: false,
        };

        const translatorInstance = await self.ai.translator.create(options);
        await translatorInstance.ready; // Wait for model to load

        console.log("Translator initialized successfully.", translatorInstance);
        setTranslator(translatorInstance);
      } catch (err) {
        setError(`Error initializing translator: ${err.message}`);
      }
    };

    initializeTranslator();
  }, [selectedLanguage, detectedLanguage]);

  // Translation Handler
  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("No text to translate.");
      return;
    }

    if (!translator) {
      setError("Translator is not initialized. Please wait.");
      return;
    }

    try {
      setError(""); // Clear previous errors
      const translation = await translator.translate(inputText);
      setTranslatedText(translation || "Translation unavailable.");
    } catch (err) {
      setError(`Error during translation: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        {/* Detected Language */}
        {detectedLanguage && (
          <p className="mt-2 text-sm text-gray-700">
            {languages.find((l) => l.code === detectedLanguage)?.name || detectedLanguage}
          </p>
        )}


        {/* Language Selector (Disable Source Language) */}
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="p-2 border rounded-md mt-2"
        >
          {languages.map((lang) => (
            <option
              key={lang.code}
              value={lang.code}
              disabled={lang.code === detectedLanguage} // Disable source language
            >
              {lang.name} ({lang.code})
            </option>
          ))}
        </select>

        {/* Translate Button */}
        <button
          onClick={handleTranslate}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400 cursor-pointer"
          disabled={!translator || detectedLanguage === selectedLanguage}
        >
          Translate
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Translated Output */}
      {translatedText && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p>
            <strong>Translated Output:</strong>
          </p>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default LanguageTranslator;
