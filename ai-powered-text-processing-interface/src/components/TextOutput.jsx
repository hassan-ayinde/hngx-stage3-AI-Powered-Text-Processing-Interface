import React from 'react';

const TextOutput = ({ inputText, detectedLanguage }) => {
  return (
    <div>
      <div>
        <input
          type="text"
          id="first_name"
          value={inputText}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          readOnly
        />

        {detectedLanguage && (
          <p className="mt-2 text-sm text-gray-700">
            Detected Language: {detectedLanguage}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextOutput;
