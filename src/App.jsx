// Import Dependencies
import { useEffect, useState } from 'react'
import Cell from './components/Cell'
import './App.css'

function App() {

  // useState Dependencies
  // sets currentPlayer choosen by User in the beginning of game
  const [currentPlayers, setCurrentPlayers] = useState([])

  // will be set true when Players are set
  const [isGameReady, setIsGameReady] = useState(false)

  // Logic to get wich PLayers turn it is
  const [isCircleTurn, setIsCircleTurn] = useState(true)

  // Dependecie for the Reset-Board Button wich will be renderd if the Game is won or a draw occures
  const [isActive, setIsActive] = useState(false)

  // Board will be disabled if the game is won or a draw occures
  const [isBoardDisabled, setIsBoardDisabled] = useState(false)

  // Counts for keeping track of wins from the players
  const [crossCount, setCrossCount] = useState(0)
  const [circleCount, setCircleCount] = useState(0)

  // Dependecie for setting the winning/draw Text
  const [winningMessage, setWinningMessage] = useState("")

  // Dependencie for the Gameboard - to keep track wich cells are taken already and check a win
  const [cells, setCells] = useState(Array(9).fill(""))

  // Outputs the correct Player
  const currentPlayer = isCircleTurn ? currentPlayers[0] : currentPlayers[1]

  // Contant for the Message - Outputs the set winningMessage or wich Players turn it is
  const message = winningMessage || `Turn: ${currentPlayer}` 

  // Scoreboard to keep track of wins
  const countDisplay = `${currentPlayers[0] || 'Circle'} Wins: ${circleCount} || ${currentPlayers[1] || 'Cross'} Wins: ${crossCount}`

  // Handles the Form submit on the start of the game
  const handleSubmit = (e) => {

    // sets the choosen Playernames
    const setPlayers = () => {
      e.preventDefault()
      const p1 = document.querySelector('#p1')
      const p2 = document.querySelector('#p2')
      
      setCurrentPlayers([p1.value, p2.value])
      setIsGameReady(true)
      return
    }
    setPlayers()
    return
  }

  // function to check if a win or draw occured
  const checkWin = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8]
    ]

    const isDraw = cells.every(cell => cell !== '')
    const findWinner = winningCombos.find(
      combo => cells[combo[0]] !== '' &&
               cells[combo[0]] === cells[combo[1]] &&
               cells[combo[1]] === cells[combo[2]]
    );
    const winner = findWinner ? cells[findWinner[0]] : null

    let roundMessage = ''
    let circleWins = circleCount
    let crossWins = crossCount

      if(winner) { 
        roundMessage = `${currentPlayers[winner === 'circle' ? 0 : 1]} won this Round`
        circleWins += winner === 'circle' ? 1 : 0
        crossWins += winner === 'cross' ? 1 : 0
        setIsActive(true)
        setIsBoardDisabled(true)
      }
      else if(isDraw) {
        roundMessage = "This round was a Draw"
        setIsActive(true)
        setIsBoardDisabled(true)
      }

      setWinningMessage(roundMessage)
      setCircleCount(circleWins)
      setCrossCount(crossWins)

    return
  }
  
  // checkWin will be called each time the Cells Array changes
  useEffect(() => {
    checkWin()
  }, [cells])

  // helper function to clear the Gameboard of the symbols
  const clearClassNames = () => {
    const choosenElements = document.querySelectorAll('.choosen-symbol')
    choosenElements.forEach(el => {
      el.removeAttribute('class')
      el.classList.add('choosen-symbol')
    })
  }

  // Function that resets all dependecies for a new game
  const resetGame = () => {
    setIsCircleTurn(true)
    setWinningMessage('')
    setIsActive(false)
    setCells(Array(9).fill(""))
    clearClassNames()
    setIsBoardDisabled(false)
  }

  // Returns either the Startscreen with the SetPlayers Form or the Gameboard
  return (

    !isGameReady 
      ? 
      <div className='app' style={{justifyContent:"center"}}>
          <h1>Tic Tac Toe</h1>
          <div className='form-wrapper'>
            <h3>Set Playernames</h3>
            <form className='set-players' onSubmit={(e) => { handleSubmit(e) }}>
              <label htmlFor="p1">Player 1</label>
              <input type="text" id='p1'/>
              <label htmlFor="p2">Player 2</label>
              <input type="text" id='p2'/>
              <p>Or press "Play" to set no Names.</p>
              <button type='submit'>Play</button>
            </form>
          </div>
        </div>
        : 
        <div className='app'>
          {/* if isAcitve is true the button will be rendered */}
        {isActive ? <button className='restart-btn' onClick={() => { resetGame() }}>Reset Board</button> : ""}
        <h1>Tic Tac Toe</h1>
          <div className='count-display'>{countDisplay}</div>
          <div className='message-display'><span>{message}</span></div>
          {/* Gameboard will be disabled if win/draw occures */}
        <div className={`gameboard ${isBoardDisabled ? 'disabled' : ''}`}>
          {cells.map((cell, index) => {
            return <Cell 
            id={index} 
            key={index} 
            cells={cells}
            setCells={setCells}
            isCircleTurn={isCircleTurn}
            setIsCircleTurn={setIsCircleTurn}
            />
          })}
        </div>
      </div>
  )
}

export default App
