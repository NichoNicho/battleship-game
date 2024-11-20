import { Ship } from "$types/Ship";
import { randomizeShipsOnBoard } from "./board";

/**
 * Validates if a shot is within the bounds of the board.
 * @param row - The row index of the shot.
 * @param col - The column index of the shot.
 * @param boardSize - The size of the board.
 * @returns True if the shot is valid, false otherwise.
 */
export const isValidShot = (
  row: number,
  col: number,
  boardSize: number,
): boolean => row >= 0 && col >= 0 && row < boardSize && col < boardSize;

/**
 * Checks if the current player has won by hitting all opponent ships.
 * @param currentShots - The shots fired by the current player.
 * @param opponentShips - The opponent's ships.
 * @returns True if the current player has won, false otherwise.
 */
export const checkWinner = (
  currentShots: string[],
  opponentShips: Ship[],
): boolean => {
  const allCoordinates = opponentShips.flatMap((ship) =>
    Array.from({ length: ship.size }).map((_, i) => {
      const row = ship.isHorizontal ? ship.row : ship.row + i;
      const col = ship.isHorizontal ? ship.col + i : ship.col;
      return `${row}-${col}`;
    }),
  );

  return allCoordinates.every((coord) => currentShots.includes(coord));
};

/**
 * Randomizes ships for both players or AI and player.
 * @param boardSize - The size of the board.
 * @param ships - The list of ship templates to place.
 * @returns An object containing randomized ship placements for two players.
 */
export const randomizeGameShips = (
  boardSize: number,
  ships: Ship[],
): { player1Ships: Ship[]; player2Ships: Ship[] } => {
  const { placedShips: player1Ships } = randomizeShipsOnBoard(boardSize, ships);
  const { placedShips: player2Ships } = randomizeShipsOnBoard(boardSize, ships);

  return { player1Ships, player2Ships };
};
