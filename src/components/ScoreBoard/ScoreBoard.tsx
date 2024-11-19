import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type ShipStatus = {
  name: string;
  size: number;
  hits: number;
  sunk: boolean;
};

type ScoreBoardProps = {
  ships: ShipStatus[];
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ ships }) => {
  const { t } = useTranslation("playLocal");

  return (
    <TableContainer component={Paper} style={{ margin: "16px 0" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("ship")}</TableCell>
            <TableCell align="center">{t("size")}</TableCell>
            <TableCell align="center">{t("hits")}</TableCell>
            <TableCell align="center">{t("status")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ships.map(({ name, size, hits, sunk }) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell align="center">{size}</TableCell>
              <TableCell align="center">{hits}</TableCell>
              <TableCell align="center">
                {sunk ? t("sunk") : t("afloat")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreBoard;
