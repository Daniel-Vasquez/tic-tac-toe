import { useState } from "react"

const TURNS = {
  X: 'X',
  O: 'O'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const Square = ({ children, isSeleted, updateBoard, index }) => {
  const className = `square ${isSeleted ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  // const [board, setBoard] = useState(
  //   ['x', 'x', 'x', 'o', 'o', 'o', 'x', 'o', 'x']
  // )
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)

  // Null: no hay ganador, False: Empate.
  const [winner, setWinner] = useState(null)

  //Ningun ganador, empate
  const [notWinner, setNotWinner] = useState(false)

  //Puntos X
  const [pointX, setPointX] = useState(0)

   //Puntos O
  const [pointO, setPointO] = useState(0)
  
  const checkWinner = (newBoard) => {
    // Revisamos todas las combinaciones ganadoras
    // Para ver si X u O gano
    for (const combo of WINNER_COMBOS) {
      // a, b, c --> Es cada número de la lista, ejemplo: [0, 1, 2]
      const [a, b, c] = combo

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a] // Retorna el ganador
      }
    }


    return false
  }

  const updateBoard = (index) => {
    // No actualizar esta pocisión, si ya tiene algo
    if (board[index] || winner) return

    // Actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Revisar si hay un ganador
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

    setNotWinner(allPositionsHaveValue)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    setNotWinner(false)
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>

      <section className="game">
        {board.map((_, index) => (
          <Square
            key={index}
            index={index}
            updateBoard={(index) => updateBoard(index)}
          >
            {_}
          </Square>
        ))}
      </section>

      {winner ?
        (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 'Empate' : 'Ganó la'
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Reiniciar juego</button>
              </footer>
            </div>
          </section>
        ) :
        (
          <section className="turn">

            <Square isSeleted={turn === TURNS.X}>
              {TURNS.X}
            </Square>
            <Square isSeleted={turn === TURNS.O}>
              {TURNS.O}
            </Square>
          </section>
        )
      }

      {
        notWinner && !winner && (
          <div className="winner">
            <div className="text">
              <h2>Empate</h2>
              <button onClick={resetGame}>Reiniciar juego</button>
            </div>
          </div>
        )
      }

      <section className="scoreboard">
        <h3>Marcador</h3>
        <p>X: { pointX } puntos</p>
        <p>0: { pointO } puntos</p>
      </section>
    </main>
  )
}

export default App
