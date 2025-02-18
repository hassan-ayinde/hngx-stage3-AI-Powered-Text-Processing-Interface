// App.js
import React, { useState } from 'react';
import TextInput from './components/TextInput';
import TextOutput from './components/TextOutput';
import ActionButton from './components/ActionButton';
import './App.css';
import { detectLanguage } from './api/languageDetection';

function App() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]); // Store multiple chat messages
  const [error, setError] = useState('');

  const handleSend = () => {
    if (!inputText.trim()){
      setError('Please enter some text');
      return;
    }; // Prevent empty messages

    // Detect language and update messages
    detectLanguage(inputText, console.error, (detectedLanguage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, language: detectedLanguage },
      ]);
      setInputText(''); // Clear input after sending
    });
  };

  return (
    <div className="w-[90%] max-w-xl m-auto">
      {messages.map((msg, index) => (
        <TextOutput
          key={index}
          inputText={msg.text}
          detectedLanguage={msg.language}
        />
      ))}
      <div className='flex items-end'>
        <TextInput 
          setInputText={setInputText} inputText={inputText} 
          error={error} 
          setError={setError}
        />
        <ActionButton onClick={handleSend} />
      </div>
    </div>
  );
}

export default App;
