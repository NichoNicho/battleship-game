import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ship } from "$types/Ship";
import {
  randomizeGameShips,
  isValidShot,
  checkWinner,
} from "$domain/gameLogic";
import { BOARD_SIZE, initialShips } from "$constants/gameConstants";

type AIGameState = {
  playerShots: string[];
  aiShots: string[];
  playerShips: Ship[];
  aiShips: Ship[];
  currentPlayer: number;
  winner: string | null;
};

const { player1Ships, player2Ships } = randomizeGameShips(
  BOARD_SIZE,
  initialShips,
);

const initialState: AIGameState = {
  playerShots: [],
  aiShots: [],
  playerShips: player1Ships,
  aiShips: player2Ships,
  currentPlayer: 1,
  winner: null,
};

const aiGameSlice = createSlice({
  name: "aiGame",
  initialState,
  reducers: {
    fireShot(
      state,
      action: PayloadAction<{ row: number; col: number; boardSize: number }>,
    ) {
      const { row, col, boardSize } = action.payload;
      const currentShots =
        state.currentPlayer === 1 ? state.playerShots : state.aiShots;

      if (
        state.winner ||
        !isValidShot(row, col, boardSize) ||
        currentShots.includes(`${row}-${col}`)
      ) {
        return;
      }

      currentShots.push(`${row}-${col}`);

      const opponentShips =
        state.currentPlayer === 1 ? state.aiShips : state.playerShips;
      if (checkWinner(currentShots, opponentShips)) {
        state.winner = state.currentPlayer === 1 ? "Player" : "AI";
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
      state.playerShots = [];
      state.aiShots = [];
      state.playerShips = player1Ships;
      state.aiShips = player2Ships;
      state.currentPlayer = 1;
      state.winner = null;
    },
  },
});

export const { fireShot: fireShotAI, resetGame: resetAIGame } =
  aiGameSlice.actions;
export default aiGameSlice.reducer;
