import { useState } from "react"
import { Square } from "./component/Square"
import { checkWinner, TURNS, POINTS_WIN } from "./utils"
import { WinnerComponent } from './component/WinnerComponent.jsx'
import { DeadHeat } from "./component/DeadHeat"
import { ScoreBoard } from "./component/ScoreBoard"

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const [pointX, setPointX] = useState(0)

  const [pointO, setPointO] = useState(0)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWiner = checkWinner(newBoard)

    if (newWiner) {
      setWinner(newWiner)
    }

    if (newWiner === 'X') {
      setPointX(pointX + 1)
    }

    if (newWiner === 'O') {
      setPointO(pointO + 1)
    } 
    
    const allPositionsHaveValue = newBoard.every((value) => value !== undefined && value !== null);

    if (allPositionsHaveValue && !winner) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    if (pointX == POINTS_WIN || pointO == POINTS_WIN) {
      setPointX(0)
      setPointO(0)
    }
  }
  
  if (pointX == POINTS_WIN || pointO == POINTS_WIN) {
    return (
      <div className="winner">
        <div className="text">
          <h2>Ganador definitivo:</h2>
          <div className="win">
            <Square>{winner}</Square>
          </div>
          <button onClick={resetGame}>Reiniciar juego</button>
        </div>
      </div>
    )
  }

  return (
    <main className="board">
      <div>
        <h1>Tic tac toe</h1>
        <p style={{ margin: '20px 0px' }}>Que gane el mejor a {POINTS_WIN} puntos.</p>
      </div>
        
      <div className='container-app'>
        <section className="scoreboard">
          <h3>Marcador</h3>
          <ScoreBoard letter='X' point={ pointX } />
          <ScoreBoard letter='O' point={ pointO } />
        </section>

        <section className="game">
          {board.map((letter, index) => (
            <Square
              key={index}
              index={index}
              updateBoard={(index) => updateBoard(index)}
            >
              { letter }
            </Square>
          ))}
        </section>
        
        <div>
          <h3>Turno:</h3>
          <section className="turn">
          <Square isSeleted={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSeleted={turn === TURNS.O}>
            {TURNS.O}
          </Square>
          </section>
        </div>

        { winner && <WinnerComponent winner={winner} resetGame={ resetGame } /> }
      
        { winner === false && <DeadHeat resetGame={ resetGame } /> }

      </div>
    </main>
  )
}

export default App