import { useAppDispatch, useAppSelector } from "$store";
import { fireShot, resetGame } from "$slices/gameSlice";

export const useGameLogic = () => {
  const dispatch = useAppDispatch();
  const localGame = useAppSelector((state) => state.game.localGame);

  console.log("useGameLogic LocalGame State:", localGame);

  const fireShotHandler = (row: number, col: number) => {
    dispatch(fireShot({ mode: "localGame", row, col, boardSize: 10 }));
  };

  const resetGameHandler = () => {
    dispatch(resetGame({ mode: "localGame" }));
  };

  return {
    player1Shots: localGame.shotsByPlayer[0],
    player2Shots: localGame.shotsByPlayer[1],
    player1Ships: localGame.shipsByPlayer[0],
    player2Ships: localGame.shipsByPlayer[1],
    currentPlayer: localGame.currentPlayer,
    winner: localGame.winner,
    fireShot: fireShotHandler,
    resetGame: resetGameHandler,
  };
};
