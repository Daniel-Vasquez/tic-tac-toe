const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const TURNS = {
  X: 'X',
  O: 'O'
}

export const POINTS_WIN = 3

export const checkWinner = (newBoard) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo

    if (
      newBoard[a] &&
      newBoard[a] === newBoard[b] &&
      newBoard[a] === newBoard[c]
    ) {
      return newBoard[a]
    }
  }

  return null
}

export function getRandomIndex(board) {
  const availableIndexes = board
    .map((value, index) => value !== 'X' && value !== 'O' ? index : -1)
    .filter(index => index !== -1);

  if (availableIndexes.length <= 1) {
    return undefined
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * availableIndexes.length);
  } while (availableIndexes[randomIndex] === undefined);

  const indexToRemove = availableIndexes[randomIndex];
  availableIndexes[randomIndex] = undefined;

  return indexToRemove;
}