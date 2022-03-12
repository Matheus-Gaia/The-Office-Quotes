import Quotes from "./components/Quotes";
import Character from "./components/Character";
import Buttom from "./components/Buttom";
import { useState, useEffect } from "react"
import axios from "axios";
import sound from "./components/audio/audio.mp3"


const audio = new Audio(sound)

function App() {
  const [quote, setQuote] = useState('')
  const [character, setCharacter] = useState('')
  
  const url = 'https://www.officeapi.dev/api/quotes/random'

  const handleClick = () => {
    getApiData()
    audio.play()
  }

  useEffect(() => {
    getApiData()
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  const getApiData = async () => {
    try {
      const response = await axios.get(url)
      setData(response.data.data) 
    } catch (err) {
      console.log(err.message)
    }
  }

  const setData = (data) => {
    const {firstname, lastname} = data.character
    setCharacter(`- ${firstname} ${lastname}`)
    setQuote(data.content)
  }

  return (
    <div className="App">
      <h1>The Office Random Quotes Generator!</h1>
      <Quotes quote={quote}/>
      <Character character={character}/>
      <Buttom handleClick={handleClick}/>
    </div>
  );
}

export default App;
