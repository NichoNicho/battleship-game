import React, { useCallback, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { Ship } from "$types/Ship";
import { isHit } from "$utils/shipUtils";

const BOARD_SIZE = 10;
const ROW_LABELS = "ABCDEFGHIJ".split("");
const COLUMN_LABELS = Array.from({ length: BOARD_SIZE }, (_, i) =>
  (i + 1).toString(),
);

type GameBoardProps = {
  placedShips: Ship[];
  shipColors: Record<string, string>;
  shots: Set<string>;
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
  useEffect(() => {
    console.log("GameBoard Props:", { placedShips, shots, isPlayerTurn });
  }, [placedShips, shots, isPlayerTurn]);
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (isPlayerTurn) {
        onFireShot(row, col);
      }
    },
    [onFireShot, isPlayerTurn],
  );

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
            const cellColor = (() => {
              if (
                Array.from(shots).some(
                  (shot) => shot === `${rowIndex}-${colIndex}`,
                )
              ) {
                const occupyingShip = placedShips.find((ship) =>
                  isHit(rowIndex, colIndex, ship),
                );
                return occupyingShip
                  ? shipColors[occupyingShip.name || "default"]
                  : "grey";
              }
              return "#e3f2fd";
            })();

            //console.log(`Cell [${rowIndex}-${colIndex}] color:`, cellColor); // Debug log

            return (
              <Grid
                item
                xs={1}
                key={`cell-${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                data-testid={`cell-${rowIndex}-${colIndex}`}
              >
                <Paper
                  elevation={1}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: cellColor,
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
