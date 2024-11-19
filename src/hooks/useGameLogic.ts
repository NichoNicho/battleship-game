import { useAppDispatch, useAppSelector } from "$store";
import { fireShotLocal, resetLocalGame } from "$slices/localGameSlice";

export const useGameLogic = () => {
  const dispatch = useAppDispatch();
  const { shotsByPlayer, shipsByPlayer, currentPlayer, winner } =
    useAppSelector((state) => state.localGame);

  const fireShotHandler = (row: number, col: number) => {
    dispatch(fireShotLocal({ row, col, boardSize: 10 }));
  };

  const resetGameHandler = () => {
    dispatch(resetLocalGame());
  };

  return {
    player1Shots: shotsByPlayer[0],
    player2Shots: shotsByPlayer[1],
    player1Ships: shipsByPlayer[0],
    player2Ships: shipsByPlayer[1],
    currentPlayer,
    winner,
    fireShot: fireShotHandler,
    resetGame: resetGameHandler,
  };
};
