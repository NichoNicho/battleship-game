export const BOARD_SIZE = 10;

export const initialShips = [
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

export const shipColors: Record<string, string> = {
  Carrier: "#D32F2F",
  Battleship: "#303F9F",
  Destroyer: "#0288D1",
  Submarine: "#388E3C",
  PatrolBoat: "#FBC02D",
};
