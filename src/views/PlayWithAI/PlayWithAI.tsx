import React from "react";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import GameBoard from "$components/GameBoard";
import ScoreBoard from "$components/ScoreBoard";
import { shipColors } from "$constants/gameConstants";
import { useGameLogic } from "$hooks/useGameLogic";
import { Ship } from "$types/Ship";
import { transformToShipStatuses } from "$utils/shipUtils";

const PlayWithAI: React.FC = () => {
  const { t } = useTranslation("playWithAI");
  const {
    player1Ships: playerShips,
    player2Ships: aiShips,
    player1Shots: playerShots,
    player2Shots: aiShots,
    currentPlayer,
    winner,
    fireShot,
    resetGame,
  } = useGameLogic();

  const renderGameBoard = (
    playerShips: Ship[],
    opponentShots: string[],
    isPlayerTurn: boolean,
    onFireShot: (row: number, col: number) => void,
    label: string,
  ) => (
    <Grid item xs={6} key={label}>
      <Button fullWidth variant="contained" color="primary">
        {label}
      </Button>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={5} mt={3}>
          <ScoreBoard
            ships={transformToShipStatuses(playerShips, opponentShots)}
          />
        </Grid>
        <Grid item xs={7}>
          <GameBoard
            key={`ai-${label}`}
            placedShips={playerShips}
            shipColors={shipColors}
            shots={new Set(opponentShots)}
            onFireShot={onFireShot}
            isPlayerTurn={isPlayerTurn}
          />
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "1rem", textAlign: "center" }}>
            <Typography variant="h5">
              {winner
                ? winner
                : t("currentTurn", {
                    player: currentPlayer === 1 ? "Player" : "AI",
                  })}
            </Typography>
            {!winner && (
              <Typography variant="body1">{t("fireInstruction")}</Typography>
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
        {renderGameBoard(
          aiShips,
          playerShots,
          currentPlayer === 1,
          (row, col) => currentPlayer === 1 && fireShot(row, col),
          t("aiFleet"),
        )}
        {renderGameBoard(
          playerShips,
          aiShots,
          currentPlayer === 2,
          () => {},
          t("playerFleet"),
        )}
      </Grid>
    </Box>
  );
};

export default PlayWithAI;
