export const Square = ({ children, isSeleted, updateBoard, index }) => {
  const className = `square ${isSeleted ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}