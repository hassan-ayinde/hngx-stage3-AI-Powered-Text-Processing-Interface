import React,{useState} from 'react'
import TextInput from './components/TextInput'
import TextOutput from './components/TextOutput'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('');

  return (
    <div className='w-[90%] max-w-xl m-auto'>
      <TextOutput inputText={inputText} />
      <TextInput setInputText={setInputText} />
    </div>
  )
}

export default App
