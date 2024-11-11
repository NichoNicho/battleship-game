import React from "react";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import GameBoard from "$components/GameBoard";
import ScoreBoard from "$components/ScoreBoard";
import { useTranslation } from "react-i18next";
import { shipColors } from "$constants/gameConstants";
import { useHandleAI } from "$hooks/useHandleAI";

const PlayWithAI: React.FC = () => {
  const { t } = useTranslation("playWithAI");
  const {
    playerShips,
    aiShips,
    playerShots,
    aiShots,
    currentPlayer,
    winner,
    handleShot,
    resetGame,
  } = useHandleAI();

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
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary">
            {t("aiFleet")}
          </Button>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={5} mt={3}>
              <ScoreBoard ships={aiShips} />
            </Grid>
            <Grid item xs={7}>
              <GameBoard
                placedShips={aiShips}
                shipColors={shipColors}
                shots={playerShots}
                onFireShot={(row, col) =>
                  currentPlayer === 1 && handleShot(row, col)
                }
                isPlayerTurn={currentPlayer === 1}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary">
            {t("playerFleet")}
          </Button>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={7}>
              <GameBoard
                placedShips={playerShips}
                shipColors={shipColors}
                shots={aiShots}
                onFireShot={() => {}}
                isPlayerTurn={false}
              />
            </Grid>
            <Grid item xs={5} mt={3}>
              <ScoreBoard ships={playerShips} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayWithAI;
