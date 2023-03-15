import { Square } from "./Square";
import { POINTS_WIN } from "../utils"


export const WinnerComponent = ({ fnReset, winner, text }) => {
  return (
    <section className="winner">
      <div className="text">
        <h2>{text}:</h2>
        
        <header className="win">
          <Square>{winner}</Square>
        </header>

        <footer>
          <button onClick={fnReset}>Volver a jugar</button>
        </footer>
      </div>
    </section>
  );
}