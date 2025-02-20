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
        placeholder="Type your text here..."
        rows='3'
        className=" resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
      ></textarea>
      <div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default TextInput;
