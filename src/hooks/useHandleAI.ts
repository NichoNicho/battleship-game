import { useAppDispatch, useAppSelector } from "$store";
import { fireShotAI, resetAIGame } from "$slices/aiGameSlice";
import { getNextAIMove, addSurroundingCellsToStack } from "$domain/aiLogic";
import { useState, useEffect } from "react";

export const useHandleAI = () => {
  const dispatch = useAppDispatch();
  const aiGame = useAppSelector((state) => state.aiGame);

  const [targetStack, setTargetStack] = useState<
    { row: number; col: number }[]
  >([]);

  const handleShot = (row: number, col: number) => {
    dispatch(fireShotAI({ row, col, boardSize: 10 }));
  };

  useEffect(() => {
    if (aiGame.currentPlayer === 2 && !aiGame.winner) {
      const aiMove = getNextAIMove(targetStack, new Set(aiGame.aiShots));
      handleShot(aiMove.row, aiMove.col);

      const hit = aiGame.playerShips.some((ship) =>
        ship.isHorizontal
          ? ship.row === aiMove.row &&
            aiMove.col >= ship.col &&
            aiMove.col < ship.col + ship.size
          : ship.col === aiMove.col &&
            aiMove.row >= ship.row &&
            aiMove.row < ship.row + ship.size,
      );

      if (hit) {
        setTargetStack((prev) =>
          addSurroundingCellsToStack(
            prev,
            aiMove.row,
            aiMove.col,
            new Set(aiGame.aiShots),
          ),
        );
      }
    }
  }, [
    aiGame.currentPlayer,
    aiGame.winner,
    aiGame.aiShots,
    aiGame.playerShips,
    targetStack,
  ]);

  const resetGameHandler = () => {
    dispatch(resetAIGame());
    setTargetStack([]);
  };

  return {
    playerShips: aiGame.playerShips,
    aiShips: aiGame.aiShips,
    playerShots: aiGame.playerShots,
    aiShots: aiGame.aiShots,
    currentPlayer: aiGame.currentPlayer,
    winner: aiGame.winner,
    handleShot,
    resetGame: resetGameHandler,
  };
};
