import { isHit } from "$utils/gameUtils";
import { Ship } from "$types/Ship";
import { useGameLogic } from "./useGameLogic";

export const useHandleShot = () => {
  const {
    player1Ships,
    player2Ships,
    player1Shots,
    player2Shots,
    currentPlayer,
    winner,
    setPlayer1Ships,
    setPlayer2Ships,
    setPlayer1Shots,
    setPlayer2Shots,
    setCurrentPlayer,
    checkWinCondition,
    resetGame,
  } = useGameLogic();

  const handleShot = (row: number, col: number) => {
    if (winner) return;

    if (currentPlayer === 1) {
      const newShots = [...player1Shots, { row, col }];
      setPlayer1Shots(newShots);
      const updatedShips = player2Ships.map((ship: Ship) =>
        isHit(row, col, ship)
          ? { ...ship, hits: ship.hits + 1, sunk: ship.hits + 1 >= ship.size }
          : ship,
      );
      setPlayer2Ships(updatedShips);
      checkWinCondition(updatedShips, "Player 1");
      setCurrentPlayer(2);
    } else {
      const newShots = [...player2Shots, { row, col }];
      setPlayer2Shots(newShots);
      const updatedShips = player1Ships.map((ship: Ship) =>
        isHit(row, col, ship)
          ? { ...ship, hits: ship.hits + 1, sunk: ship.hits + 1 >= ship.size }
          : ship,
      );
      setPlayer1Ships(updatedShips);
      checkWinCondition(updatedShips, "Player 2");
      setCurrentPlayer(1);
    }
  };

  return {
    currentPlayer,
    winner,
    player1Ships,
    player2Ships,
    player1Shots,
    player2Shots,
    handleShot,
    resetGame,
  };
};
