import { CellState } from "$types/CellState";
import { Ship } from "$types/Ship";

/**
 * Initializes an empty game board with the given size.
 * @param boardSize - The size of the board (e.g., 10 for a 10x10 board).
 * @returns A 2D array representing the board state.
 */
export const initializeBoard = (boardSize: number): CellState[][] => {
  return Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({
      hasShip: false,
      hit: false,
    })),
  );
};

/**
 * Places a ship on the game board.
 * @param board - The current state of the board.
 * @param row - Starting row position for the ship.
 * @param col - Starting column position for the ship.
 * @param size - Size of the ship to place.
 * @param isHorizontal - Whether the ship is placed horizontally.
 * @returns A new board with the ship placed.
 */
export const placeShipOnBoard = (
  board: CellState[][],
  row: number,
  col: number,
  size: number,
  isHorizontal: boolean,
): CellState[][] => {
  const newBoard = board.map((row) => [...row]);
  for (let i = 0; i < size; i++) {
    const r = isHorizontal ? row : row + i;
    const c = isHorizontal ? col + i : col;
    newBoard[r][c] = { ...newBoard[r][c], hasShip: true };
  }
  return newBoard;
};

/**
 * Validates if a ship can be placed at a given position.
 * @param board - The current state of the board.
 * @param row - Starting row position for the ship.
 * @param col - Starting column position for the ship.
 * @param size - Size of the ship.
 * @param isHorizontal - Whether the ship is placed horizontally.
 * @returns True if the ship can be placed, false otherwise.
 */
export const canPlaceShip = (
  board: CellState[][],
  row: number,
  col: number,
  size: number,
  isHorizontal: boolean,
): boolean => {
  for (let i = 0; i < size; i++) {
    const r = isHorizontal ? row : row + i;
    const c = isHorizontal ? col + i : col;
    if (
      r >= board.length ||
      c >= board[0].length ||
      board[r][c].hasShip === true
    ) {
      return false;
    }
  }
  return true;
};

/**
 * Randomly places ships on the board.
 * @param boardSize - The size of the board (e.g., 10 for a 10x10 board).
 * @param ships - The list of ships to place.
 * @returns An object containing the updated board and the ships with their positions.
 */
export const randomizeShipsOnBoard = (
  boardSize: number,
  ships: Ship[],
): { board: CellState[][]; placedShips: Ship[] } => {
  let board = initializeBoard(boardSize);
  const placedShips: Ship[] = [];

  ships.forEach((ship) => {
    let placed = false;
    while (!placed) {
      const isHorizontal = Math.random() > 0.5;
      const row = Math.floor(Math.random() * boardSize);
      const col = Math.floor(Math.random() * boardSize);

      if (canPlaceShip(board, row, col, ship.size, isHorizontal)) {
        board = placeShipOnBoard(board, row, col, ship.size, isHorizontal);
        placedShips.push({ ...ship, row, col, isHorizontal });
        placed = true;
      }
    }
  });

  return { board, placedShips };
};
