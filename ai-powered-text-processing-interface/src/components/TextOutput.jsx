import React from 'react'

const TextOutput = () => {
  return (
    <div>
        <div>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readOnly/>

            {/* {languageDetection && <p>Detected Language: {languageDetection}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>} */}
        </div>
    </div>
  )
}

export default TextOutput