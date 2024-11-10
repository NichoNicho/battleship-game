import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "$store/index";

export type Ship = {
  name: string;
  size: number;
  isHorizontal: boolean;
  row: number;
  col: number;
  hits: number;
  sunk: boolean;
};

type GameState = {
  player1Ships: Ship[];
  player2Ships: Ship[];
  player1Shots: { row: number; col: number }[];
  player2Shots: { row: number; col: number }[];
  currentPlayer: 1 | 2;
};

const initialState: GameState = {
  player1Ships: [],
  player2Ships: [],
  player1Shots: [],
  player2Shots: [],
  currentPlayer: 1,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerShips(
      state,
      action: PayloadAction<{ player: 1 | 2; ships: Ship[] }>,
    ) {
      if (action.payload.player === 1) {
        state.player1Ships = action.payload.ships;
      } else {
        state.player2Ships = action.payload.ships;
      }
    },
    fireShot(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;
      const isPlayer1Turn = state.currentPlayer === 1;

      const currentShots = isPlayer1Turn
        ? state.player1Shots
        : state.player2Shots;
      const opponentShips = isPlayer1Turn
        ? state.player2Ships
        : state.player1Ships;

      currentShots.push({ row, col });

      const hitShip = opponentShips.find((ship) =>
        ship.isHorizontal
          ? row === ship.row && col >= ship.col && col < ship.col + ship.size
          : col === ship.col && row >= ship.row && row < ship.row + ship.size,
      );

      if (hitShip) {
        hitShip.hits += 1;
        hitShip.sunk = hitShip.hits >= hitShip.size;
      }

      state.currentPlayer = isPlayer1Turn ? 2 : 1;
    },
  },
});

export const selectShipStatuses = (state: RootState, player: 1 | 2) =>
  player === 1 ? state.game.player1Ships : state.game.player2Ships;

export const { setPlayerShips, fireShot } = gameSlice.actions;
export default gameSlice.reducer;
