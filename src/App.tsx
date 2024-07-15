// CSS
import './App.css'

// React
import { useCallback, useEffect, useState } from 'react'

// Dados (data)
import {wordsList} from './data/words'

// Components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  {id:1, name: "start"},
  {id:2, name: "game"},
  {id:3, name: "end"},
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const pickedWordAndCategory = () => {
    //Seleciona uma categoria aleatória

    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // Seleciona uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]


    return {category, word}
  }

  // Começa o jogo
  const startGame = () => {
    
    //Seleciona a categoria e a palavra
    const {word, category} = pickedWordAndCategory()

    //Cria array de letras
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    // Preencher os estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(letters)


    setGameStage(stages[1].name)
  }

  // Processa a letra
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  // Reiniciar o jogo
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <>
      <div>
        {gameStage === 'start' && <StartScreen startGame={startGame}/>}
        {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
        {gameStage === 'end' && <GameOver retry={retry}/>}
      </div>

    </>
  )
}

export default App
