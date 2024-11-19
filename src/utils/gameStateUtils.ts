import { Ship } from "$types/Ship";

/**
 * Checks if all ships of a player are sunk, indicating a win condition.
 * @param ships - Array of Ship objects representing a player's fleet.
 * @returns True if all ships are sunk, otherwise false.
 */
export const checkWinCondition = (ships: Ship[]): boolean => {
  return ships.every((ship) => ship.sunk);
};
