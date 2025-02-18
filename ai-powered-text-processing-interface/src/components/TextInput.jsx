// components/TextInput.js
import React from 'react';

const TextInput = ({ setInputText, inputText, error, setError }) => {
  return (
    <div className='w-full'>
      <textarea
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => setError('')} // Clear error on focus
        placeholder="Type your message..."
        rows='5'
        className="resizable-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4"
      ></textarea>
      <div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default TextInput;
