import React, { useState } from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import RotateRightIcon from "@mui/icons-material/RotateRight";

type ShipProps = {
  name: string;
  size: number;
};

const CELL_SIZE = 40;
const CELL_SPACING = 0; // Adjust gap for consistency with GameBoard cells

const Ship: React.FC<ShipProps> = ({ name, size }) => {
  const [isHorizontal, setIsHorizontal] = useState(true);

  const handleRotate = () => setIsHorizontal(!isHorizontal);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "ship",
      JSON.stringify({ name, size, isHorizontal }),
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      style={{ cursor: "grab", marginBottom: "1rem" }}
      draggable
      onDragStart={handleDragStart}
    >
      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
        {name} ({size} cells)
      </Typography>
      <Box
        display="flex"
        flexDirection={isHorizontal ? "row" : "column"}
        style={{
          alignItems: "center",
          gap: `${CELL_SPACING}px`,
          position: "relative",
        }}
      >
        {Array.from({ length: size }).map((_, index) => (
          <Paper
            key={index}
            elevation={2}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: "#90caf9",
              border: "1px solid #1976d2",
            }}
          />
        ))}
        <IconButton
          onClick={handleRotate}
          size="small"
          style={{
            position: "absolute",
            top: "-1.5rem",
            right: isHorizontal ? "-1.5rem" : "auto",
            bottom: isHorizontal ? "auto" : "-1.5rem",
            left: isHorizontal ? "auto" : "-1.5rem",
          }}
        >
          <RotateRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Ship;
