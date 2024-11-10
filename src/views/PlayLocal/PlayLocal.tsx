import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import GameBoard from "$components/GameBoard";
import ScoreBoard from "$components/ScoreBoard";
import { useTranslation } from "react-i18next";

type Ship = {
  name: string;
  size: number;
  isHorizontal: boolean;
  row: number;
  col: number;
  hits: number;
  sunk: boolean;
};

const BOARD_SIZE = 10;
const shipColors: Record<string, string> = {
  Carrier: "#D32F2F",
  Battleship: "#303F9F",
  Destroyer: "#0288D1",
  Submarine: "#388E3C",
  PatrolBoat: "#FBC02D",
};

const PlayLocal: React.FC = () => {
  const { t } = useTranslation();
  const [player1Ships, setPlayer1Ships] = useState<Ship[]>([]);
  const [player2Ships, setPlayer2Ships] = useState<Ship[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Shots, setPlayer1Shots] = useState<
    { row: number; col: number }[]
  >([]);
  const [player2Shots, setPlayer2Shots] = useState<
    { row: number; col: number }[]
  >([]);
  const [winner, setWinner] = useState<string | null>(null);

  const randomizeShips = useCallback(() => {
    const initializeShips = (ships: Ship[]): Ship[] => {
      const board = Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(false));
      return ships.map((ship) => {
        let isPositionValid = false;
        let row = 0;
        let col = 0;
        let isHorizontal = true;

        while (!isPositionValid) {
          isHorizontal = Math.random() < 0.5;
          row = Math.floor(
            Math.random() *
              (isHorizontal ? BOARD_SIZE : BOARD_SIZE - ship.size + 1),
          );
          col = Math.floor(
            Math.random() *
              (isHorizontal ? BOARD_SIZE - ship.size + 1 : BOARD_SIZE),
          );

          isPositionValid = Array.from({ length: ship.size }).every((_, i) => {
            const r = isHorizontal ? row : row + i;
            const c = isHorizontal ? col + i : col;
            return r < BOARD_SIZE && c < BOARD_SIZE && !board[r][c];
          });

          if (isPositionValid) {
            Array.from({ length: ship.size }).forEach((_, i) => {
              const r = isHorizontal ? row : row + i;
              const c = isHorizontal ? col + i : col;
              board[r][c] = true;
            });
          }
        }
        return { ...ship, row, col, isHorizontal, hits: 0, sunk: false };
      });
    };

    setPlayer1Ships(initializeShips([...initialShips]));
    setPlayer2Ships(initializeShips([...initialShips]));
    setPlayer1Shots([]);
    setPlayer2Shots([]);
    setCurrentPlayer(1);
    setWinner(null);
  }, []);

  useEffect(() => {
    randomizeShips();
  }, [randomizeShips]);

  const checkWinCondition = () => {
    if (player1Ships.every((ship) => ship.sunk)) {
      setWinner(t("playerWins", { player: 2 }));
    } else if (player2Ships.every((ship) => ship.sunk)) {
      setWinner(t("playerWins", { player: 1 }));
    }
  };

  const handleFireShot = (row: number, col: number) => {
    if (winner) return;

    if (currentPlayer === 1) {
      setPlayer2Shots((prev) => [...prev, { row, col }]);
      setPlayer2Ships((prevShips) =>
        prevShips.map((ship) => {
          if (isHit(row, col, ship)) {
            const newHits = ship.hits + 1;
            const isSunk = newHits >= ship.size;
            return { ...ship, hits: newHits, sunk: isSunk };
          }
          return ship;
        }),
      );
      checkWinCondition();
      setCurrentPlayer(2);
    } else {
      setPlayer1Shots((prev) => [...prev, { row, col }]);
      setPlayer1Ships((prevShips) =>
        prevShips.map((ship) => {
          if (isHit(row, col, ship)) {
            const newHits = ship.hits + 1;
            const isSunk = newHits >= ship.size;
            return { ...ship, hits: newHits, sunk: isSunk };
          }
          return ship;
        }),
      );
      checkWinCondition();
      setCurrentPlayer(1);
    }
  };

  const initialShips: Ship[] = [
    {
      name: "Carrier",
      size: 5,
      isHorizontal: true,
      row: 0,
      col: 0,
      hits: 0,
      sunk: false,
    },
    {
      name: "Battleship",
      size: 4,
      isHorizontal: true,
      row: 0,
      col: 0,
      hits: 0,
      sunk: false,
    },
    {
      name: "Destroyer",
      size: 3,
      isHorizontal: true,
      row: 0,
      col: 0,
      hits: 0,
      sunk: false,
    },
    {
      name: "Submarine",
      size: 3,
      isHorizontal: true,
      row: 0,
      col: 0,
      hits: 0,
      sunk: false,
    },
    {
      name: "PatrolBoat",
      size: 2,
      isHorizontal: true,
      row: 0,
      col: 0,
      hits: 0,
      sunk: false,
    },
  ];

  const isHit = (row: number, col: number, ship: Ship): boolean => {
    return ship.isHorizontal
      ? row === ship.row && col >= ship.col && col < ship.col + ship.size
      : col === ship.col && row >= ship.row && row < ship.row + ship.size;
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "1rem", textAlign: "center" }}>
            <Typography variant="h5">
              {winner ? winner : t("currentTurn", { player: currentPlayer })}
            </Typography>
            {!winner && (
              <Typography variant="body1">
                {t("playerTurnPrompt", { player: currentPlayer })}
              </Typography>
            )}
          </Paper>
          <Button
            variant="contained"
            color="secondary"
            onClick={randomizeShips}
            style={{ marginTop: "1rem" }}
          >
            {t("restartGame")}
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary">
            {t("player2FleetWaters")}
          </Button>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4} mt={3}>
              <ScoreBoard ships={player2Ships} />
            </Grid>
            <Grid item xs={8}>
              <GameBoard
                placedShips={player2Ships}
                shipColors={shipColors}
                shots={player2Shots}
                onFireShot={(row, col) => {
                  if (currentPlayer === 1) handleFireShot(row, col);
                }}
                isPlayerTurn={currentPlayer === 1}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary">
            {t("player1FleetWaters")}
          </Button>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={8}>
              <GameBoard
                placedShips={player1Ships}
                shipColors={shipColors}
                shots={player1Shots}
                onFireShot={(row, col) => {
                  if (currentPlayer === 2) handleFireShot(row, col);
                }}
                isPlayerTurn={currentPlayer === 2}
              />
            </Grid>
            <Grid item xs={4} mt={3}>
              <ScoreBoard ships={player1Ships} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayLocal;
