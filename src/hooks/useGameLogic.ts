import { useState, useCallback } from "react";
import { Ship } from "$types/Ship";
import { randomizeShips } from "$utils/gameUtils";

export const useGameLogic = () => {
  const [player1Ships, setPlayer1Ships] = useState<Ship[]>(randomizeShips());
  const [player2Ships, setPlayer2Ships] = useState<Ship[]>(randomizeShips());
  const [player1Shots, setPlayer1Shots] = useState<
    { row: number; col: number }[]
  >([]);
  const [player2Shots, setPlayer2Shots] = useState<
    { row: number; col: number }[]
  >([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);

  const resetGame = useCallback(() => {
    setPlayer1Ships(randomizeShips());
    setPlayer2Ships(randomizeShips());
    setPlayer1Shots([]);
    setPlayer2Shots([]);
    setCurrentPlayer(1);
    setWinner(null);
  }, []);

  const checkWinCondition = useCallback(
    (ships: Ship[], player: "Player 1" | "Player 2") => {
      if (ships.every((ship) => ship.sunk)) {
        setWinner(`${player} Wins!`);
      }
    },
    [],
  );

  return {
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
  };
};
