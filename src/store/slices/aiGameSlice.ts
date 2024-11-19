import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ship } from "$types/Ship";
import { randomizeShipsOnBoard } from "$utils/boardUtils";
import { initialShips, BOARD_SIZE } from "$constants/gameConstants";

type AIGameState = {
  playerShots: string[];
  aiShots: string[];
  playerShips: Ship[];
  aiShips: Ship[];
  currentPlayer: number;
  winner: string | null;
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

const initialState: AIGameState = {
  playerShots: [],
  aiShots: [],
  playerShips: randomizeShipsOnBoard(BOARD_SIZE, initialShips).placedShips,
  aiShips: randomizeShipsOnBoard(BOARD_SIZE, initialShips).placedShips,
  currentPlayer: 1,
  winner: null,
};

const isValidShot = (row: number, col: number, boardSize: number): boolean =>
  row >= 0 && col >= 0 && row < boardSize && col < boardSize;

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
        state.winner || // Prevent shots after game ends
        !isValidShot(row, col, boardSize) || // Prevent invalid shots
        currentShots.includes(`${row}-${col}`) // Prevent duplicate shots
      ) {
        return;
      }
    
      currentShots.push(`${row}-${col}`);
    
      // Check for winner
      const opponentShips =
        state.currentPlayer === 1 ? state.aiShips : state.playerShips;
      const allCoordinates = opponentShips.flatMap((ship) =>
        Array.from({ length: ship.size }).map((_, i) => {
          const row = ship.isHorizontal ? ship.row : ship.row + i;
          const col = ship.isHorizontal ? ship.col + i : ship.col;
          return `${row}-${col}`;
        }),
      );
    
      const allHits = new Set(currentShots);
      if (allCoordinates.every((coord) => allHits.has(coord))) {
        state.winner = state.currentPlayer === 1 ? "Player" : "AI";
        return;
      }
    
      // Toggle turn
      state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
    },
    
    resetGame(state) {
      const newShips = randomizeGameShips();
      state.playerShots = [];
      state.aiShots = [];
      state.playerShips = newShips.player1Ships;
      state.aiShips = newShips.player2Ships;
      state.currentPlayer = 1;
      state.winner = null;
    },
  },
});

export const { fireShot: fireShotAI, resetGame: resetAIGame } =
  aiGameSlice.actions;
export default aiGameSlice.reducer;
