import React from "react";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import GameBoard from "$components/GameBoard";
import ScoreBoard from "$components/ScoreBoard";
import { shipColors } from "$constants/gameConstants";
import { useGameLogic } from "$hooks/useGameLogic";
import { Ship } from "$types/Ship";
import { transformToShipStatuses } from "$domain/ships";

const PlayLocal: React.FC = () => {
  const { t } = useTranslation("playLocal");
  const {
    player1Shots,
    player2Shots,
    player1Ships,
    player2Ships,
    currentPlayer,
    winner,
    fireShot,
    resetGame,
  } = useGameLogic();

  const renderLocalGameBoard = (
    playerShips: Ship[],
    opponentShots: string[],
    isPlayerTurn: boolean,
    onFireShot: (row: number, col: number) => void,
    label: string,
  ) => {
    return (
      <Grid item xs={6}>
        <Button fullWidth variant="contained" color="primary">
          {label}
        </Button>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={7}>
            <GameBoard
              key={`local-${label}`}
              placedShips={playerShips}
              shipColors={shipColors}
              shots={new Set(opponentShots)}
              onFireShot={onFireShot}
              isPlayerTurn={isPlayerTurn}
            />
          </Grid>
          <Grid item xs={5} mt={3}>
            <ScoreBoard
              ships={transformToShipStatuses(playerShips, opponentShots)}
            />
          </Grid>
        </Grid>
      </Grid>
    );
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
            onClick={resetGame}
            style={{ marginTop: "1rem" }}
          >
            {t("restartGame")}
          </Button>
        </Grid>
        {renderLocalGameBoard(
          player2Ships,
          player1Shots,
          currentPlayer === 1,
          (row, col) => currentPlayer === 1 && fireShot(row, col),
          t("player2FleetWaters"),
        )}
        {renderLocalGameBoard(
          player1Ships,
          player2Shots,
          currentPlayer === 2,
          (row, col) => currentPlayer === 2 && fireShot(row, col),
          t("player1FleetWaters"),
        )}
      </Grid>
    </Box>
  );
};

export default PlayLocal;
