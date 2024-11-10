import { Ship } from "$types/Ship";
import { BOARD_SIZE, initialShips } from "$constants/gameConstants";

/**
 * Checks if a given position on the game board is a hit on a ship.
 * @param row - The row index of the position.
 * @param col - The column index of the position.
 * @param ship - The ship object to check against.
 * @returns True if the position is a hit on the ship, false otherwise.
 */
export const isHit = (row: number, col: number, ship: Ship): boolean => {
  return ship.isHorizontal
    ? row === ship.row && col >= ship.col && col < ship.col + ship.size
    : col === ship.col && row >= ship.row && row < ship.row + ship.size;
};

/**
 * Checks if a given coordinate is a miss on the game board.
 * @param row - The row index of the coordinate.
 * @param col - The column index of the coordinate.
 * @param ships - An array of ships on the game board.
 * @returns A boolean value indicating whether the coordinate is a miss.
 */
export const isMiss = (row: number, col: number, ships: Ship[]): boolean => {
  return !ships.some((ship) => isHit(row, col, ship));
};

/**
 * Checks if all ships of a player are sunk, indicating a win condition.
 * @param ships - Array of Ship objects representing a player's fleet.
 * @param player - Name of the player ("Player 1" or "Player 2") for contextual win message.
 * @returns Win message for the player if all ships are sunk, otherwise null.
 */
export const checkWinCondition = (
  ships: Ship[],
  player: "Player 1" | "Player 2",
): string | null => {
  const allSunk = ships.every((ship) => ship.sunk);
  return allSunk ? `${player} Wins!` : null;
};

/**
 * Handles firing a shot at a specific row and column on the game board.
 * Updates the target ships and shots based on the result of the shot.
 *
 * @param row The row index of the shot.
 * @param col The column index of the shot.
 * @param targetShips The array of target ships.
 * @param shots The array of previous shots.
 * @returns An object containing the updated ships and shots.
 */
export const handleFireShot = (
  row: number,
  col: number,
  targetShips: Ship[],
  shots: { row: number; col: number }[],
): { updatedShips: Ship[]; updatedShots: { row: number; col: number }[] } => {
  const newShots = [...shots, { row, col }];
  const newShips = targetShips.map((ship) => {
    if (isHit(row, col, ship)) {
      const newHits = ship.hits + 1;
      return { ...ship, hits: newHits, sunk: newHits >= ship.size };
    }
    return ship;
  });
  return { updatedShips: newShips, updatedShots: newShots };
};

/**
 * Randomizes the positions of ships on the game board.
 * @returns An array of Ship objects with randomized positions.
 */
export const randomizeShips = (): Ship[] => {
  const board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(false));

  return initialShips.map((ship: Ship) => {
    let isPositionValid = false;
    let row = 0;
    let col = 0;
    let isHorizontal = true;

    while (!isPositionValid) {
      isHorizontal = Math.random() < 0.5;
      row = Math.floor(
        Math.random() *
          (isHorizontal ? BOARD_SIZE : BOARD_SIZE - ship.size + 1),
      );
      col = Math.floor(
        Math.random() *
          (isHorizontal ? BOARD_SIZE - ship.size + 1 : BOARD_SIZE),
      );

      isPositionValid = Array.from({ length: ship.size }).every((_, i) => {
        const r = isHorizontal ? row : row + i;
        const c = isHorizontal ? col + i : col;
        return r < BOARD_SIZE && c < BOARD_SIZE && !board[r][c];
      });

      if (isPositionValid) {
        Array.from({ length: ship.size }).forEach((_, i) => {
          const r = isHorizontal ? row : row + i;
          const c = isHorizontal ? col + i : col;
          board[r][c] = true;
        });
      }
    }
    return { ...ship, row, col, isHorizontal, hits: 0, sunk: false };
  });
};

/**
 * Returns an array of surrounding cells for a given row and column,
 * excluding cells that have already been shot.
 *
 * @param row - The row index of the current cell.
 * @param col - The column index of the current cell.
 * @param shots - An array of previously shot cells.
 * @returns An array of surrounding cells that have not been shot.
 */
export const getSurroundingCells = (
  row: number,
  col: number,
  shots: { row: number; col: number }[],
): { row: number; col: number }[] => {
  const potentialTargets = [
    { row: row - 1, col: col },
    { row: row + 1, col: col },
    { row: row, col: col - 1 },
    { row: row, col: col + 1 },
  ];

  return potentialTargets.filter(
    (target) =>
      target.row >= 0 &&
      target.row < BOARD_SIZE &&
      target.col >= 0 &&
      target.col < BOARD_SIZE &&
      !shots.some((shot) => shot.row === target.row && shot.col === target.col),
  );
};

/**
 * Determines the AI's next move based on previous shots and target stack.
 * @param aiShots - The shots that the AI has already fired.
 * @param targetStack - A stack of potential target cells based on recent hits.
 * @returns The next move for the AI as an object containing row and col.
 */
export const getNextAIMove = (
  aiShots: { row: number; col: number }[],
  targetStack: { row: number; col: number }[],
): { row: number; col: number } => {
  // If there are cells in the target stack, pop and return the next target.
  if (targetStack.length > 0) {
    return targetStack.pop()!;
  }

  // Otherwise, pick a random cell that hasn't been shot yet.
  const unshotCells = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (!aiShots.some((shot) => shot.row === row && shot.col === col)) {
        unshotCells.push({ row, col });
      }
    }
  }

  // Select a random cell from available unshot cells.
  return unshotCells[Math.floor(Math.random() * unshotCells.length)];
};
