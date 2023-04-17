import { TURNS } from "../utils"

export const ScoreBoard = ({ pointX, pointO }) => {
  const  xTextPoints = pointX === 1 ? 'punto' : 'puntos'
  const  oTextPoints = pointO === 1 ? 'punto' : 'puntos'

  return (
    <section className="scoreboard">
      <h3>Marcador</h3>
      <div className="scoreboard-info">
        <p>
          <span className="scoreboard-info__turn">
            {TURNS.X}:
          </span>
          {pointX} {xTextPoints}
        </p>
        <p>
          <span className="scoreboard-info__turn">
            {TURNS.O}:
          </span>
          {pointO} {oTextPoints}
        </p>
      </div>
    </section>
  )
}
