export const ButtonResetGame = ({fnReset, text}) => {
  return (
    <button
      className="btn-hardReset"
      onClick={fnReset}
    >
      {text}
    </button>
  )
}
