import { Square } from "./Square";

export const WinnerModal = ({ fnReset, winner, pointX, pointO }) => {
  const winnerText = winner === false ? 'Empate' : 'Ganó'
  const ultimateWinnerText = pointX === 3 || pointO === 3 ? true : false 

  return (
    <section className="winner">
      <div className="text">
        {ultimateWinnerText
          ? <h2>Ganador definitivo</h2>
          : <h2> {winnerText} </h2>
        }
        
        {winner && 
          <header className="win">
            <Square>{winner}</Square>
          </header>
        }

        <footer>
          {ultimateWinnerText
            ? <button className="btn-hardReset" onClick={fnReset}>Reiniciar juego</button>
            : <button onClick={fnReset}>Volver a jugar</button>
          }
        </footer>
      </div>
    </section>
  );
}