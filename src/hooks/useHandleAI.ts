import { useState, useEffect } from "react";
import { Ship } from "$types/Ship";
import {
  checkWinCondition,
  randomizeShips,
  handleFireShot,
  getSurroundingCells,
  isHit,
} from "$utils/gameUtils";
import { BOARD_SIZE } from "$constants/gameConstants";

export const useHandleAI = () => {
  const [playerShips, setPlayerShips] = useState<Ship[]>(randomizeShips());
  const [aiShips, setAiShips] = useState<Ship[]>(randomizeShips());
  const [playerShots, setPlayerShots] = useState<
    { row: number; col: number }[]
  >([]);
  const [aiShots, setAiShots] = useState<{ row: number; col: number }[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);
  const [targetStack, setTargetStack] = useState<
    { row: number; col: number }[]
  >([]);

  const resetGame = () => {
    setPlayerShips(randomizeShips());
    setAiShips(randomizeShips());
    setPlayerShots([]);
    setAiShots([]);
    setCurrentPlayer(1);
    setWinner(null);
    setTargetStack([]);
  };

  const handleShot = (row: number, col: number) => {
    if (currentPlayer === 1) {
      const { updatedShips, updatedShots } = handleFireShot(
        row,
        col,
        aiShips,
        playerShots,
      );
      setAiShips(updatedShips);
      setPlayerShots(updatedShots);
      setCurrentPlayer(2);

      const result = checkWinCondition(updatedShips, "Player 1");
      if (result) setWinner(result);
    }
  };

  useEffect(() => {
    if (currentPlayer === 2 && !winner) {
      const aiMove = getNextAIMove(aiShots, targetStack);
      setAiShots((prev) => [...prev, aiMove]);

      const hitShip = playerShips.find((ship) =>
        isHit(aiMove.row, aiMove.col, ship),
      );
      if (hitShip) {
        hitShip.hits += 1;
        hitShip.sunk = hitShip.hits >= hitShip.size;

        const newTargets = getSurroundingCells(aiMove.row, aiMove.col, aiShots);
        setTargetStack((prev) => [...prev, ...newTargets]);
      }

      setPlayerShips([...playerShips]);
      setCurrentPlayer(1);

      const result = checkWinCondition(playerShips, "Player 2");
      if (result) setWinner(result);
    }
  }, [currentPlayer, aiShots, playerShips, targetStack, winner]);

  const getNextAIMove = (
    aiShots: { row: number; col: number }[],
    targetStack: { row: number; col: number }[],
  ) => {
    if (targetStack.length > 0) {
      const nextTarget = targetStack.pop();
      setTargetStack(targetStack);
      return nextTarget!;
    }

    const unshotCells = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (!aiShots.some((shot) => shot.row === r && shot.col === c)) {
          unshotCells.push({ row: r, col: c });
        }
      }
    }

    return unshotCells[Math.floor(Math.random() * unshotCells.length)];
  };

  return {
    playerShips,
    aiShips,
    playerShots,
    aiShots,
    currentPlayer,
    winner,
    handleShot,
    resetGame,
  };
};
