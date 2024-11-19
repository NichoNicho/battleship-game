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

const initialState: LocalGameState = {
  shotsByPlayer: [[], []],
  shipsByPlayer: [
    randomizeShipsOnBoard(BOARD_SIZE, initialShips).placedShips,
    randomizeShipsOnBoard(BOARD_SIZE, initialShips).placedShips,
  ],
  currentPlayer: 1,
  winner: null,
};

const isValidShot = (row: number, col: number, boardSize: number): boolean =>
  row >= 0 && col >= 0 && row < boardSize && col < boardSize;

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
      state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;

      const opponentShips = state.shipsByPlayer[state.currentPlayer - 1];
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
      const newShips = randomizeGameShips();
      state.shotsByPlayer = [[], []];
      state.shipsByPlayer = [newShips.player1Ships, newShips.player2Ships];
      state.currentPlayer = 1;
      state.winner = null;
    },
  },
});

export const { fireShot: fireShotLocal, resetGame: resetLocalGame } =
  localGameSlice.actions;
export default localGameSlice.reducer;
