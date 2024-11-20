import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ship } from "$types/Ship";
import {
  randomizeGameShips,
  isValidShot,
  checkWinner,
} from "$domain/gameLogic";
import { BOARD_SIZE, initialShips } from "$constants/gameConstants";

type LocalGameState = {
  shotsByPlayer: [string[], string[]];
  shipsByPlayer: [Ship[], Ship[]];
  currentPlayer: number;
  winner: string | null;
};

const { player1Ships, player2Ships } = randomizeGameShips(
  BOARD_SIZE,
  initialShips,
);

const initialState: LocalGameState = {
  shotsByPlayer: [[], []],
  shipsByPlayer: [player1Ships, player2Ships],
  currentPlayer: 1,
  winner: null,
};

const localGameSlice = createSlice({
  name: "localGame",
  initialState,
  reducers: {
    fireShot(
      state,
      action: PayloadAction<{ row: number; col: number; boardSize: number }>,
    ) {
      const { row, col, boardSize } = action.payload;
      const currentPlayerIndex = state.currentPlayer - 1;
      const currentShots = state.shotsByPlayer[currentPlayerIndex];

      if (
        state.winner ||
        !isValidShot(row, col, boardSize) ||
        currentShots.includes(`${row}-${col}`)
      ) {
        return;
      }

      currentShots.push(`${row}-${col}`);

      const opponentShips = state.shipsByPlayer[state.currentPlayer % 2];
      if (checkWinner(currentShots, opponentShips)) {
        state.winner = `Player ${state.currentPlayer}`;
        return;
      }

      state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;

      opponentShips.forEach((ship) => {
        for (let i = 0; i < ship.size; i++) {
          const cellKey = ship.isHorizontal
            ? `${ship.row}-${ship.col + i}`
            : `${ship.row + i}-${ship.col}`;
          if (cellKey === `${row}-${col}`) {
            ship.hits += 1;
            if (ship.hits === ship.size) {
              ship.sunk = true;
            }
          }
        }
      });
    },
    resetGame(state) {
      const { player1Ships, player2Ships } = randomizeGameShips(
        BOARD_SIZE,
        initialShips,
      );
      state.shotsByPlayer = [[], []];
      state.shipsByPlayer = [player1Ships, player2Ships];
      state.currentPlayer = 1;
      state.winner = null;
    },
  },
});

export const { fireShot: fireShotLocal, resetGame: resetLocalGame } =
  localGameSlice.actions;
export default localGameSlice.reducer;
