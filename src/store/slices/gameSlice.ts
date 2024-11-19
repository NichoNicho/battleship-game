import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ship } from "$types/Ship";
import { randomizeShipsOnBoard } from "$utils/boardUtils";
import { initialShips, BOARD_SIZE } from "$constants/gameConstants";

type LocalGameState = {
  shotsByPlayer: [string[], string[]];
  shipsByPlayer: [Ship[], Ship[]];
  currentPlayer: number;
  winner: string | null;
};

type AIGameState = {
  playerShots: string[];
  aiShots: string[];
  playerShips: Ship[];
  aiShips: Ship[];
  currentPlayer: number;
  winner: string | null;
};

type GameState = {
  localGame: LocalGameState;
  aiGame: AIGameState;
};

const randomizeGameShips = () => {
  const { placedShips: player1Ships } = randomizeShipsOnBoard(
    BOARD_SIZE,
    initialShips,
  );
  const { placedShips: player2Ships } = randomizeShipsOnBoard(
    BOARD_SIZE,
    initialShips,
  );
  return { player1Ships, player2Ships };
};

const initialLocalGameState: LocalGameState = {
  shotsByPlayer: [[], []],
  shipsByPlayer: [
    randomizeShipsOnBoard(BOARD_SIZE, initialShips).placedShips,
    randomizeShipsOnBoard(BOARD_SIZE, initialShips).placedShips,
  ],
  currentPlayer: 1,
  winner: null,
};

const initialAIGameState: AIGameState = {
  playerShots: [],
  aiShots: [],
  playerShips: randomizeShipsOnBoard(BOARD_SIZE, initialShips).placedShips,
  aiShips: randomizeShipsOnBoard(BOARD_SIZE, initialShips).placedShips,
  currentPlayer: 1,
  winner: null,
};

const initialState: GameState = {
  localGame: initialLocalGameState,
  aiGame: initialAIGameState,
};

const isValidShot = (row: number, col: number, boardSize: number): boolean =>
  row >= 0 && col >= 0 && row < boardSize && col < boardSize;

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    fireShot(
      state,
      action: PayloadAction<{
        mode: "localGame" | "aiGame";
        row: number;
        col: number;
        boardSize: number;
      }>,
    ) {
      const { mode, row, col, boardSize } = action.payload;
      console.log(`Before fireShot (${mode}):`, JSON.stringify(state[mode]));

      if (mode === "localGame") {
        const { localGame } = state;
        const currentPlayerIndex = localGame.currentPlayer - 1;
        const currentShots = localGame.shotsByPlayer[currentPlayerIndex];

        if (
          localGame.winner ||
          !isValidShot(row, col, boardSize) ||
          currentShots.includes(`${row}-${col}`)
        ) {
          return;
        }

        currentShots.push(`${row}-${col}`);
        localGame.currentPlayer = localGame.currentPlayer === 1 ? 2 : 1;
      }

      if (mode === "aiGame") {
        const { aiGame } = state;
        const currentShots =
          aiGame.currentPlayer === 1 ? aiGame.playerShots : aiGame.aiShots;

        if (
          aiGame.winner ||
          !isValidShot(row, col, boardSize) ||
          currentShots.includes(`${row}-${col}`)
        ) {
          return;
        }

        currentShots.push(`${row}-${col}`);
        aiGame.currentPlayer = aiGame.currentPlayer === 1 ? 2 : 1;
      }
      console.log(`After fireShot (${mode}):`, JSON.stringify(state[mode]));
    },
    resetGame(state, action: PayloadAction<{ mode: "localGame" | "aiGame" }>) {
      const { mode } = action.payload;
      const newShips = randomizeGameShips();

      if (mode === "localGame") {
        state.localGame = {
          shotsByPlayer: [[], []],
          shipsByPlayer: [newShips.player1Ships, newShips.player2Ships],
          currentPlayer: 1,
          winner: null,
        };
      }

      if (mode === "aiGame") {
        state.aiGame = {
          playerShots: [],
          aiShots: [],
          playerShips: newShips.player1Ships,
          aiShips: newShips.player2Ships,
          currentPlayer: 1,
          winner: null,
        };
      }
    },
  },
});

export const { fireShot, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
