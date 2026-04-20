import './App.css'
import { useState } from 'react'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar onSearch={}/> //Funktion för API-anrop sätts in här

    </>
  )
}

export default App
