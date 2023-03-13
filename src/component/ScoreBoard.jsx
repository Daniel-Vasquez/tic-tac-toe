export const ScoreBoard = ({letter, point}) => {
  if (point === 1) {
    return (<p>{letter}: {point} punto</p>)
  } 

  return (<p>{letter}: {point} puntos</p>)
}