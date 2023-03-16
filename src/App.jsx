import { useState } from "react"
import { Board } from "./component/Board.jsx"
import { Square } from "./component/Square.jsx"
import { WinnerModal } from './component/WinnerModal.jsx'
import { checkWinner, TURNS, POINTS_WIN } from "./utils"
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

    if (newWiner === 'X' && newWiner != null) {
      setPointX(pointX + 1)
    }

    if (newWiner === 'O' && newWiner != null) {
      setPointO(pointO + 1)
    } 
    
    const allPositionsHaveValue = newBoard.every((square) => square !== undefined && square !== null);

    if (allPositionsHaveValue) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const hardReset = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    setPointX(0)
    setPointO(0)
  }
  
  if (pointX == POINTS_WIN || pointO == POINTS_WIN) {
    return (
      <WinnerModal
        winner={winner}
        pointX={pointX}
        pointO={ pointO }
        fnReset={ hardReset }
      />
    )
  }

  return (
    <main className="board">
      <header className="header">
        <h1 className="board-title">Tic tac toe</h1>
        <p className="board-text">Que gane el mejor a {POINTS_WIN} puntos.</p>
      </header>
        
      <div className='container-app'>
        <ScoreBoard
          pointX={pointX}
          pointO={pointO}
        />

        <section className="game">
          <Board board={ board } updateBoard={ updateBoard }/>
        </section>  

        <section className="turns-container">
          <h3>Turno:</h3>
          <section className="turn">
            <Square isSeleted={turn === TURNS.X}>
              {TURNS.X}
            </Square>
            <Square isSeleted={turn === TURNS.O}>
              {TURNS.O}
            </Square>
          </section>
        </section>

        {(winner || winner === false) &&
          <WinnerModal
            winner={winner}
            pointX={ pointX }
            pointO={ pointO }
            fnReset={ resetGame }
          />
        }
      </div>

      <div className="start-again-btn">
        {(pointX > 0 || pointO > 0 ) && 
          <button
            className="btn-hardReset"
            onClick={hardReset}
          >
            Reiniciar juego
          </button>
        }
      </div>
    </main>
  )
}

export default App