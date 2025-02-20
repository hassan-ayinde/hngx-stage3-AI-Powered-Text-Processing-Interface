// components/TextOutput.js
import React from 'react';
import LanguageTranslator from '../api/LanguageTranslator';

const TextOutput = ({ inputText, detectedLanguage}) => {
  return (
    <div className="mt-4 px-3 w-full flex justify-end">
      <div className=''>
        <p
          className=" bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
        >{inputText}</p>
        <div className=''>
          <LanguageTranslator 
            inputText={inputText} detectedLanguage={detectedLanguage}
          />
        </div>
      </div>


    </div>
  );
};

export default TextOutput;
