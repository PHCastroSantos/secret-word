import './Game.css'

const Game = ({verifyLetter}) => {
  return (
    <div className='game'>
        <p className='poinst'>
            <span>Pontuação: 000</span>
        </p>
        <h1 className='tip'>Adivinhe a palavra:</h1>
        <h3>Dica sobre a palavra: <span>Dica...</span></h3>

        <div className="wordContainer">
            <span className='letter'>A</span>
            <span className="blankSquare">B</span>
        </div>
        
        <div className="letterContainer">
            <p>Tente adivinhar uma letra da palavra:</p>
            <form>
                <input type="text" name='letter' maxLength={1} required/>
                <button>Jogar!</button>
            </form>
        </div>

        <div className="wrongLettersContainer">
            <p>Letras já utilizadas:</p>
            <span>a, </span>
            <span>b, </span>
        </div>
    </div>
  )
}

export default Game