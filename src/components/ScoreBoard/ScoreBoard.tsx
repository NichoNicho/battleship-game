import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

type ShipStatus = {
  name: string;
  size: number;
  hits: number;
  sunk: boolean;
};

type ScoreBoardProps = {
  playerName: string;
  ships: ShipStatus[];
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ playerName, ships }) => {
  return (
    <TableContainer component={Paper} style={{ margin: "16px 0" }}>
      <Typography variant="h6" align="center">
        {playerName}'s Fleet
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ship</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="center">Hits</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ships.map((ship) => (
            <TableRow key={ship.name}>
              <TableCell>{ship.name}</TableCell>
              <TableCell align="center">{ship.size}</TableCell>
              <TableCell align="center">{ship.hits}</TableCell>
              <TableCell align="center">
                {ship.sunk ? "Sunk" : "Afloat"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreBoard;
