import React, { useState } from 'react';
import ActionButton from './ActionButton';
import { detectLanguage } from '../api/languageDetection';

const TextInput = ({ setInputText, setDetectedLanguage }) => {
  const [localText, setLocalText] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLocalText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!localText.trim()) {
      setError('Please enter some text');
      return;
    }
    setInputText(localText); // Share the text with parent component
    await detectLanguage(localText, setError, setDetectedLanguage); // Pass the setDetectedLanguage to detectLanguage
  };

  return (
    <div>
      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your Text</label>
      <textarea
        id="message"
        rows="7"
        value={localText}
        onChange={handleChange}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder="Write your thoughts here..."
      ></textarea>
      <ActionButton onClick={handleSubmit} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TextInput;
