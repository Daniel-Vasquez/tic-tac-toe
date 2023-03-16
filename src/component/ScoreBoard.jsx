export const ScoreBoard = ({ pointX, pointO }) => {
  const  xTextPoints = pointX === 1 ? 'punto' : 'puntos'
  const  oTextPoints = pointO === 1 ? 'punto' : 'puntos'

  return (
    <section className="scoreboard">
      <h3>Marcador</h3>
      <p>
        X: {pointX} {xTextPoints}
      </p>
      <p>
        O: {pointO} {oTextPoints}
      </p>
    </section>
  )
}
