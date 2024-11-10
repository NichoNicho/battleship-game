import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import GameBoard from "$components/GameBoard";
import ScoreBoard from "$components/ScoreBoard";

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

const PlayWithAI: React.FC = () => {
  const [playerShips, setPlayerShips] = useState<Ship[]>([]);
  const [aiShips, setAiShips] = useState<Ship[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 for player, 2 for AI
  const [playerShots, setPlayerShots] = useState<
    { row: number; col: number }[]
  >([]);
  const [aiShots, setAiShots] = useState<{ row: number; col: number }[]>([]);
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

    const initialShips = [
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

    setPlayerShips(initializeShips([...initialShips]));
    setAiShips(initializeShips([...initialShips]));
  }, []);

  useEffect(() => {
    randomizeShips();
  }, [randomizeShips]);

  const checkWinCondition = () => {
    if (playerShips.every((ship) => ship.sunk)) {
      setWinner("AI Wins!");
    } else if (aiShips.every((ship) => ship.sunk)) {
      setWinner("Player Wins!");
    }
  };

  const handlePlayerShot = (row: number, col: number) => {
    if (currentPlayer === 1 && !winner) {
      setPlayerShots((prev) => [...prev, { row, col }]);
      setAiShips((prevShips) =>
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
      setTimeout(handleAiMove, 1000); // Delay for AI thinking
    }
  };

  const handleAiMove = () => {
    const { row, col } = getAiMove();
    setAiShots((prev) => [...prev, { row, col }]);
    setPlayerShips((prevShips) =>
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
  };

  const getAiMove = () => {
    let row: number, col: number;
    do {
      row = Math.floor(Math.random() * BOARD_SIZE);
      col = Math.floor(Math.random() * BOARD_SIZE);
    } while (aiShots.some((shot) => shot.row === row && shot.col === col));
    return { row, col };
  };

  const isHit = (row: number, col: number, ship: Ship): boolean => {
    return ship.isHorizontal
      ? row === ship.row && col >= ship.col && col < ship.col + ship.size
      : col === ship.col && row >= ship.row && row < ship.row + ship.size;
  };

  const restartGame = () => {
    setPlayerShots([]);
    setAiShots([]);
    setWinner(null);
    setCurrentPlayer(1);
    randomizeShips();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "1rem", textAlign: "center" }}>
            <Typography variant="h5">
              {winner
                ? winner
                : `Current Turn: ${currentPlayer === 1 ? "Player" : "AI"}`}
            </Typography>
            {!winner && (
              <Typography variant="body1">
                {currentPlayer === 1 ? "Your turn!" : "AI is thinking..."}
              </Typography>
            )}
          </Paper>
          <Button
            onClick={restartGame}
            variant="contained"
            color="secondary"
            style={{ marginTop: "1rem" }}
          >
            Restart Game
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary">
            AI Fleet & Waters
          </Button>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4} mt={3}>
              <ScoreBoard ships={aiShips} />
            </Grid>
            <Grid item xs={8}>
              <GameBoard
                placedShips={aiShips}
                shipColors={shipColors}
                shots={playerShots}
                onFireShot={(row, col) => {
                  if (currentPlayer === 1) handlePlayerShot(row, col);
                }}
                isPlayerTurn={currentPlayer === 1}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary">
            Your Fleet & Waters
          </Button>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={8}>
              <GameBoard
                placedShips={playerShips}
                shipColors={shipColors}
                shots={aiShots}
                onFireShot={() => {}}
                isPlayerTurn={false} // AI cannot interact with player board
              />
            </Grid>
            <Grid item xs={4} mt={3}>
              <ScoreBoard ships={playerShips} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayWithAI;
