import React, { useState } from 'react';
import TextInput from './components/TextInput';
import TextOutput from './components/TextOutput';
import './App.css';
import { detectLanguage } from './api/languageDetection';

function App() {
  const [inputText, setInputText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState(''); // Add state for detected language
  return (
    <div className="w-[90%] max-w-xl m-auto">
      <TextOutput inputText={inputText} detectedLanguage={detectedLanguage} /> {/* Pass detectedLanguage */}
      <TextInput 
        setInputText={setInputText} 
        detectLanguage={detectLanguage} // Pass detectLanguage to TextInput
        setDetectedLanguage={setDetectedLanguage} // Pass setDetectedLanguage to TextInput
      />
    </div>
  );
}

export default App;
