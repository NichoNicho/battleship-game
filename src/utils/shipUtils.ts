import { Ship } from "$types/Ship";
import { BOARD_SIZE } from "$constants/gameConstants";

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
 * Randomizes the positions of ships on the game board.
 * Ensures no overlapping or out-of-bound placement.
 * @returns An array of Ship objects with randomized positions.
 */
export const randomizeShips = (ships: Ship[]): Ship[] => {
  const board: Set<string> = new Set();

  return ships.map((ship) => {
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
        return r < BOARD_SIZE && c < BOARD_SIZE && !board.has(`${r}-${c}`);
      });

      if (isPositionValid) {
        Array.from({ length: ship.size }).forEach((_, i) => {
          const r = isHorizontal ? row : row + i;
          const c = isHorizontal ? col + i : col;
          board.add(`${r}-${c}`);
        });
      }
    }

    return { ...ship, row, col, isHorizontal, hits: 0, sunk: false };
  });
};

/**
 * Transforms an array of ships and opponent shots into an array of ship statuses.
 * @param {Ship[]} ships - The array of ships.
 * @param {string[]} opponentShots - The array of opponent shots.
 * @returns {ShipStatus[]} - The array of ship statuses.
 */
export const transformToShipStatuses = (
  ships: Ship[],
  opponentShots: string[],
) =>
  ships.map((ship) => {
    const hits = Array.from({ length: ship.size }).filter((_, index) => {
      const row = ship.isHorizontal ? ship.row : ship.row + index;
      const col = ship.isHorizontal ? ship.col + index : ship.col;
      const shotKey = `${row}-${col}`;
      return opponentShots.includes(shotKey);
    }).length;

    return {
      name: ship.name,
      size: ship.size,
      hits,
      sunk: hits === ship.size,
    };
  });
