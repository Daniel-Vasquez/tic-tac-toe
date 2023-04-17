export const ButtonResetGame = ({fnReset, text, className}) => {
  return (
    <div className={className}>
      <button
        className="btn-hardReset"
        onClick={fnReset}
      >
        {text}
      </button>
    </div>
  )
}
