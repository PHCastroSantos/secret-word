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

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickedWordAndCategory = useCallback(() => {
    //Seleciona uma categoria aleatória

    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // Seleciona uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]


    return {category, word}
  }, [words])

  // Começa o jogo
  const startGame = useCallback(() => {

    clearLetterStates()
    
    //Seleciona a categoria e a palavra
    const {word, category} = pickedWordAndCategory()

    //Cria array de letras
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    // Preencher os estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)


    setGameStage(stages[1].name)
  },[pickedWordAndCategory])

  // Processa a letra
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //Checar se a letra já foi utilizada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    //

    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter,
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  function clearLetterStates() {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if(guesses <= 0) {
      clearLetterStates()

      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {

    const uniqueLetters = [... new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore + 100)
    }

    startGame()

  }, [guessedLetters, letters, startGame])

  // Reiniciar o jogo
  const retry = () => {
    setScore(0)
    setGuesses(3)

    setGameStage(stages[0].name)
  }

  return (
    <>
      <div>
        {gameStage === 'start' && <StartScreen startGame={startGame}/>}
        {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
        {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
      </div>

    </>
  )
}

export default App
