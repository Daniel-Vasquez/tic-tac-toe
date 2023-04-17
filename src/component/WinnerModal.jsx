import { Square } from "./Square";
import { ButtonResetGame } from "./ButtonResetGame";

export const WinnerModal = ({ fnReset, winner, pointX, pointO }) => {
  const winnerText = winner === false ? 'Empate' : 'Ganó'
  const ultimateWinnerText = pointX === 3 || pointO === 3 ? true : false
  const classNameBtn = ultimateWinnerText ? 'start-again-btn' : ''

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
            ? <ButtonResetGame fnReset={fnReset} text='Reiniciar juego' className={classNameBtn}/>
            : <ButtonResetGame fnReset={fnReset} text='Volver a jugar' />
          }
        </footer>
      </div>
    </section>
  );
}