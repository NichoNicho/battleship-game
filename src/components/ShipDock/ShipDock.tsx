import React from "react";
import { Box } from "@mui/material";
import Ship from "$components/Ship";

const ships = [
  { name: "Carrier", size: 5 },
  { name: "Battleship", size: 4 },
  { name: "Destroyer", size: 3 },
  { name: "Submarine", size: 3 },
  { name: "PatrolBoat", size: 2 },
];

type ShipDockProps = {
  placedShips: { name: string }[];
};

const ShipDock: React.FC<ShipDockProps> = ({ placedShips }) => {
  const unplacedShips = ships.filter(
    (ship) => !placedShips.some((placedShip) => placedShip.name === ship.name),
  );
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ padding: "1rem", width: "150px" }}
    >
      {unplacedShips.map((ship) => (
        <Ship key={ship.name} name={ship.name} size={ship.size} />
      ))}
    </Box>
  );
};

export default ShipDock;
