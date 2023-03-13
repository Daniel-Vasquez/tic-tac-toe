export const DeadHeat = ({resetGame}) => {
  return (
    <div className="winner">
      <div className="text">
        <h2>Empate</h2>
        <button onClick={resetGame}>Reiniciar juego</button>
      </div>
    </div>
  )
}