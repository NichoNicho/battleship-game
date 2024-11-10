import React from "react";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import GameBoard from "$components/GameBoard";
import ScoreBoard from "$components/ScoreBoard";
import { shipColors } from "$constants/gameConstants";
import { useHandleShot } from "$hooks/useHandleShot";

const PlayLocal: React.FC = () => {
  const { t } = useTranslation("playLocal");
  const {
    currentPlayer,
    winner,
    player1Shots,
    player2Shots,
    player1Ships,
    player2Ships,
    handleShot,
    resetGame,
  } = useHandleShot();

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
                shots={player1Shots}
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
            {t("player1FleetWaters")}
          </Button>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={8}>
              <GameBoard
                placedShips={player1Ships}
                shipColors={shipColors}
                shots={player2Shots}
                onFireShot={(row, col) =>
                  currentPlayer === 2 && handleShot(row, col)
                }
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
