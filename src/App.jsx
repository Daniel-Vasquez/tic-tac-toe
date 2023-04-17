import { useState } from "react"
import { Board } from "./component/Board.jsx"
import { Square } from "./component/Square.jsx"
import { WinnerModal } from './component/WinnerModal.jsx'
import { checkWinner, TURNS, POINTS_WIN, getRandomIndex } from "./utils"
import { ScoreBoard } from "./component/ScoreBoard"
import { ButtonResetGame } from "./component/ButtonResetGame.jsx"

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const [pointX, setPointX] = useState(0)

  const [pointO, setPointO] = useState(0)

  const [isCheckedBot, setIsCheckedBot] = useState(false);

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]

    if (isCheckedBot === false) {
      newBoard[index] = turn
      setBoard(newBoard)

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)
    } else {
      if (turn === TURNS.X) {
        newBoard[index] = turn
        setBoard(newBoard)
      }

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

      const robotShot = getRandomIndex(newBoard)

      if (robotShot != undefined) {
        newBoard[robotShot] = newTurn
      }

      setBoard(newBoard)
    }

    const newWiner = checkWinner(newBoard)

    if (newWiner) {
      setWinner(newWiner)
    }

    if (newWiner === TURNS.X && newWiner != null) {
      setPointX(pointX + 1)
    }

    if (newWiner === TURNS.O && newWiner != null) {
      setPointO(pointO + 1)
    }

    const allPositionsHaveValue = newBoard.every((square) => square !== undefined && square !== null);

    if (allPositionsHaveValue && !newWiner) {
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

  const handleInputChange = () => {
    setIsCheckedBot(!isCheckedBot);
    hardReset()
  };

  const somePositionHasValue = board.some(square => square != null)

  if (pointX == POINTS_WIN || pointO == POINTS_WIN) {
    return (
      <WinnerModal
        winner={winner}
        pointX={pointX}
        pointO={pointO}
        fnReset={hardReset}
      />
    )
  }

  if (winner || winner === false) {
    return (
      <WinnerModal
        winner={winner}
        pointX={pointX}
        pointO={pointO}
        fnReset={resetGame}
      />
    )
  }

  return (
    <main className="board">
      <header className="header">
        <h1 className="board-title">Tic tac toe</h1>
        <p className="board-text">Que gane el mejor a {POINTS_WIN} puntos.</p>
      </header>

      <div className="switch-container">
        JUGAR CONTRA LA MAQUINA
        <div className="switch-container-options">
          <span>NO</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isCheckedBot}
              onChange={handleInputChange}
            />
            <span className="slider"></span>
          </label>
          <span>SI</span>
        </div>
      </div>

      <div className="container-app ">
        <ScoreBoard
          pointX={pointX}
          pointO={pointO}
        />

        <section className="game">
          <Board board={board} updateBoard={updateBoard} />
        </section>

        {!isCheckedBot && (
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
        )}
      </div>

      {somePositionHasValue && pointX <= 0 && pointO <= 0 && (
        <ButtonResetGame
          fnReset={hardReset}
          text='Reiniciar juego'
          className='start-again-btn'
        />
      )}

      {(pointX > 0 || pointO > 0) &&
        <ButtonResetGame
          fnReset={hardReset}
          text='Reiniciar juego'
          className='start-again-btn'
        />
      }
    </main>
  )
}

export default App