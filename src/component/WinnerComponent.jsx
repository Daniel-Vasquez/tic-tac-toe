import { Square } from "./Square";

export const WinnerComponent = ({ resetGame, winner }) => {
  return (
    <section className="winner">
      <div className="text">
        <h2>Ganó</h2>

        <header className="win">
          <Square>{winner}</Square>
        </header>

        <footer>
          <button onClick={resetGame}>Reiniciar juego</button>
        </footer>
      </div>
    </section>
  );
}