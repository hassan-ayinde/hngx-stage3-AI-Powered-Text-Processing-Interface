// components/TextOutput.js
import React from 'react';

const TextOutput = ({ inputText, detectedLanguage }) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        value={inputText}
        readOnly
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      />
      {detectedLanguage && (
        <p className="mt-2 text-sm text-gray-700">
          Detected Language: {detectedLanguage}
        </p>
      )}
    </div>
  );
};

export default TextOutput;
