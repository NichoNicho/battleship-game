import React, { useCallback } from "react";
import { Grid, Paper, Typography } from "@mui/material";

const BOARD_SIZE = 10;
const ROW_LABELS = "ABCDEFGHIJ".split("");
const COLUMN_LABELS = Array.from({ length: BOARD_SIZE }, (_, i) =>
  (i + 1).toString(),
);

type Ship = {
  name: string;
  size: number;
  isHorizontal: boolean;
  row: number;
  col: number;
  hits: number;
  sunk: boolean;
};

type GameBoardProps = {
  placedShips: Ship[];
  shipColors: Record<string, string>;
  shots: { row: number; col: number }[];
  onFireShot: (row: number, col: number) => void;
  isPlayerTurn: boolean;
};

const CELL_SIZE = 40;
const CELL_SPACING = 1;

const GameBoard: React.FC<GameBoardProps> = ({
  placedShips,
  shipColors,
  shots,
  onFireShot,
  isPlayerTurn,
}) => {
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      isPlayerTurn ? onFireShot(row, col) : null;
    },
    [onFireShot, isPlayerTurn],
  );

  const isHit = (row: number, col: number) =>
    shots.some((shot) => shot.row === row && shot.col === col) &&
    placedShips.some((ship) =>
      ship.isHorizontal
        ? row === ship.row && col >= ship.col && col < ship.col + ship.size
        : col === ship.col && row >= ship.row && row < ship.row + ship.size,
    );

  const isMiss = (row: number, col: number) =>
    shots.some((shot) => shot.row === row && shot.col === col) &&
    !isHit(row, col);

  return (
    <Grid
      container
      spacing={CELL_SPACING}
      style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}
    >
      <Grid item xs={1}></Grid>
      {COLUMN_LABELS.map((label, index) => (
        <Grid
          item
          xs={1}
          key={`col-label-${index}`}
          style={{ textAlign: "center" }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="textSecondary"
          >
            {label}
          </Typography>
        </Grid>
      ))}
      {ROW_LABELS.map((label, rowIndex) => (
        <Grid
          container
          item
          xs={12}
          spacing={CELL_SPACING}
          key={`row-${rowIndex}`}
        >
          <Grid
            item
            xs={1}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="textSecondary"
            >
              {label}
            </Typography>
          </Grid>
          {Array.from({ length: BOARD_SIZE }).map((_, colIndex) => {
            const occupyingShip = placedShips.find((ship) =>
              ship.isHorizontal
                ? ship.row === rowIndex &&
                  colIndex >= ship.col &&
                  colIndex < ship.col + ship.size
                : ship.col === colIndex &&
                  rowIndex >= ship.row &&
                  rowIndex < ship.row + ship.size,
            );

            const cellColor = occupyingShip
              ? shipColors[occupyingShip.name]
              : "#e3f2fd";

            return (
              <Grid
                item
                xs={1}
                key={`cell-${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                <Paper
                  elevation={1}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: isHit(rowIndex, colIndex)
                      ? "red"
                      : isMiss(rowIndex, colIndex)
                        ? "lightgray"
                        : cellColor,
                    border: "1px solid #1976d2",
                    cursor: isPlayerTurn ? "pointer" : "default",
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      ))}
    </Grid>
  );
};

export default GameBoard;
