export type Cell = {
  value: number;
  solution: number;
  given: boolean;
  userFilled: boolean;
};

export type Board = Cell[][];

const SIZE = 9;

function shuffle(array: number[]): number[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function isValid(
  board: number[][],
  row: number,
  col: number,
  number: number,
): boolean {
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === number) {
      return false;
    }

    if (board[i][col] === number) {
      return false;
    }
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === number) {
        return false;
      }
    }
  }

  return true;
}

function solve(board: number[][]): boolean {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col] !== 0) {
        continue;
      }

      const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      for (const number of numbers) {
        if (isValid(board, row, col, number)) {
          board[row][col] = number;

          if (solve(board)) {
            return true;
          }

          board[row][col] = 0;
        }
      }

      return false;
    }
  }

  return true;
}

function createSolvedBoard(): number[][] {
  const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

  solve(board);

  return board;
}

export function generateSudoku(difficulty = 0.45): Board {
  const solved = createSolvedBoard();

  const board: Board = solved.map((row) =>
    row.map((solution) => ({
      value: solution,
      solution,
      given: true,
      userFilled: false,
    })),
  );

  const cellsToRemove = Math.floor(81 * difficulty);

  const positions = shuffle(Array.from({ length: 81 }, (_, index) => index));

  for (let i = 0; i < cellsToRemove; i++) {
    const index = positions[i];

    const row = Math.floor(index / 9);
    const col = index % 9;

    board[row][col].value = 0;
    board[row][col].given = false;
  }

  return board;
}

export function cloneBoard(board: Board): Board {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
    })),
  );
}

export function countFilledCells(board: Board): number {
  return board.reduce(
    (total, row) => total + row.filter((cell) => cell.value !== 0).length,
    0,
  );
}

export function countUserFilledCells(board: Board): number {
  return board.reduce(
    (total, row) =>
      total + row.filter((cell) => cell.userFilled && cell.value !== 0).length,
    0,
  );
}

export function isBoardComplete(board: Board): boolean {
  return board.every((row) =>
    row.every((cell) => cell.value !== 0 && cell.value === cell.solution),
  );
}

export function removeRandomUserNumber(board: Board): Board {
  const newBoard = cloneBoard(board);

  const candidates: Array<[number, number]> = [];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = newBoard[row][col];

      if (cell.userFilled && cell.value !== 0) {
        candidates.push([row, col]);
      }
    }
  }

  if (candidates.length === 0) {
    return newBoard;
  }

  const random = candidates[Math.floor(Math.random() * candidates.length)];

  const [row, col] = random;

  newBoard[row][col].value = 0;
  newBoard[row][col].userFilled = false;

  return newBoard;
}

export function setCellValue(
  board: Board,
  row: number,
  col: number,
  value: number,
): Board {
  const newBoard = cloneBoard(board);

  const cell = newBoard[row][col];

  if (cell.given) {
    return newBoard;
  }

  cell.value = value;
  cell.userFilled = value !== 0;

  return newBoard;
}
