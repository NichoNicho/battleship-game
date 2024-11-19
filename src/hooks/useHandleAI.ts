import { useAppDispatch, useAppSelector } from "$store";
import { fireShot, resetGame } from "$slices/gameSlice";
import { getNextAIMove, addSurroundingCellsToStack } from "$utils/aiUtils";
import { useState, useEffect } from "react";

export const useHandleAI = () => {
  const dispatch = useAppDispatch();
  const aiGame = useAppSelector((state) => state.game.aiGame);

  console.log("useHandleAI AIGame State:", aiGame);

  const [targetStack, setTargetStack] = useState<
    { row: number; col: number }[]
  >([]);

  const handleShot = (row: number, col: number) => {
    if (aiGame.currentPlayer === 1) {
      dispatch(fireShot({ mode: "aiGame", row, col, boardSize: 10 }));
    }
  };

  useEffect(() => {
    if (aiGame.currentPlayer === 2 && !aiGame.winner) {
      const aiMove = getNextAIMove(targetStack, new Set(aiGame.aiShots));
      dispatch(
        fireShot({
          mode: "aiGame",
          row: aiMove.row,
          col: aiMove.col,
          boardSize: 10,
        }),
      );

      const hit = aiGame.playerShots.includes(`${aiMove.row}-${aiMove.col}`);
      if (hit) {
        const updatedStack = addSurroundingCellsToStack(
          targetStack,
          aiMove.row,
          aiMove.col,
          new Set(aiGame.aiShots),
        );
        setTargetStack(updatedStack);
      }
    }
  }, [aiGame, targetStack, dispatch]);

  const resetGameHandler = () => {
    dispatch(resetGame({ mode: "aiGame" }));
    setTargetStack([]);
  };

  return {
    playerShots: aiGame.playerShots,
    aiShots: aiGame.aiShots,
    playerShips: aiGame.playerShips,
    aiShips: aiGame.aiShips,
    currentPlayer: aiGame.currentPlayer,
    winner: aiGame.winner,
    handleShot,
    resetGame: resetGameHandler,
  };
};
