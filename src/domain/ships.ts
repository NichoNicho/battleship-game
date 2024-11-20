import { Ship } from "$types/Ship";

/**
 * Checks if a given position (row, col) is a hit on a ship.
 * @param row - The row index of the position.
 * @param col - The column index of the position.
 * @param ship - The ship object to check against.
 * @returns A boolean indicating whether the position is a hit on the ship.
 */
export const isHit = (row: number, col: number, ship: Ship): boolean => {
  return ship.isHorizontal
    ? row === ship.row && col >= ship.col && col < ship.col + ship.size
    : col === ship.col && row >= ship.row && row < ship.row + ship.size;
};

/**
 * Transforms an array of ships into an array of ship statuses.
 * Each ship status includes the ship's name, size, number of hits, and whether it is sunk.
 *
 * @param {Ship[]} ships - The array of ships.
 * @param {string[]} opponentShots - The array of opponent's shots.
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
