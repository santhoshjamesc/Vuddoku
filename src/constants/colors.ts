export const COLORS = {
  paper: "#F2E8D5",
  black: "#111111",
  red: "#D7262E",
  blue: "#1746D1",
  yellow: "#F4C430",
  white: "#FFFFFF",
  grey: "#777777",
};

// One distinct, high-contrast color per Sudoku digit (1-9), used consistently
// on the number pad and on every filled cell across the board.
export const NUMBER_COLORS: Record<number, string> = {
  1: "#1746D1", // blue
  2: "#D7262E", // red
  3: "#1E8A4C", // green
  4: "#E67E22", // orange
  5: "#7B2CBF", // purple
  6: "#0E8388", // teal
  7: "#C2185B", // magenta
  8: "#8B5E34", // brown
  9: "#B8860B", // gold
};
