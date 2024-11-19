import { isHit, isMiss, randomizeShips } from "$utils/shipUtils";
import { Ship } from "$types/Ship";
import { BOARD_SIZE, initialShips } from "$constants/gameConstants";

describe("shipUtils", () => {
  const mockHorizontalShip: Ship = {
    name: "Destroyer",
    size: 2,
    row: 0,
    col: 0,
    isHorizontal: true,
    hits: 0,
    sunk: false,
  };

  const mockVerticalShip: Ship = {
    name: "Battleship",
    size: 4,
    row: 1,
    col: 3,
    isHorizontal: false,
    hits: 0,
    sunk: false,
  };

  const mockFleet: Ship[] = [
    mockHorizontalShip,
    mockVerticalShip,
    {
      name: "Submarine",
      size: 3,
      row: 5,
      col: 5,
      isHorizontal: true,
      hits: 0,
      sunk: false,
    },
  ];

  it("isHit identifies hits on a horizontal ship", () => {
    expect(isHit(0, 0, mockHorizontalShip)).toBe(true);
    expect(isHit(0, 1, mockHorizontalShip)).toBe(true);
    expect(isHit(0, 2, mockHorizontalShip)).toBe(false);
  });

  it("isHit identifies hits on a vertical ship", () => {
    expect(isHit(1, 3, mockVerticalShip)).toBe(true);
    expect(isHit(2, 3, mockVerticalShip)).toBe(true);
    expect(isHit(5, 3, mockVerticalShip)).toBe(false);
  });

  it("isMiss identifies misses on the board", () => {
    expect(isMiss(0, 2, mockFleet)).toBe(true);
    expect(isMiss(1, 3, mockFleet)).toBe(false);
    expect(isMiss(0, 0, mockFleet)).toBe(false);
    expect(isMiss(6, 6, mockFleet)).toBe(true);
  });

  it("isMiss works for empty fleets", () => {
    expect(isMiss(0, 0, [])).toBe(true);
    expect(isMiss(5, 5, [])).toBe(true);
  });

  it("isHit works on edge cases", () => {
    const edgeShip: Ship = {
      name: "Patrol Boat",
      size: 1,
      row: 9,
      col: 9,
      isHorizontal: true,
      hits: 0,
      sunk: false,
    };

    expect(isHit(9, 9, edgeShip)).toBe(true);
    expect(isHit(9, 8, edgeShip)).toBe(false);
    expect(isHit(8, 9, edgeShip)).toBe(false);
    expect(isHit(8, 8, edgeShip)).toBe(false);
  });

  it("isMiss handles edge cases correctly", () => {
    expect(isMiss(9, 9, mockFleet)).toBe(true);
    expect(isMiss(-1, 0, mockFleet)).toBe(true);
    expect(isMiss(0, -1, mockFleet)).toBe(true);
    expect(isMiss(BOARD_SIZE, 0, mockFleet)).toBe(true);
    expect(isMiss(0, BOARD_SIZE, mockFleet)).toBe(true);
  });

  it("randomizeShips returns ships within board bounds", () => {
    const ships = randomizeShips(initialShips);
    ships.forEach((ship) => {
      if (ship.isHorizontal) {
        expect(ship.row).toBeGreaterThanOrEqual(0);
        expect(ship.row).toBeLessThan(BOARD_SIZE);
        expect(ship.col).toBeGreaterThanOrEqual(0);
        expect(ship.col + ship.size - 1).toBeLessThan(BOARD_SIZE);
      } else {
        expect(ship.col).toBeGreaterThanOrEqual(0);
        expect(ship.col).toBeLessThan(BOARD_SIZE);
        expect(ship.row).toBeGreaterThanOrEqual(0);
        expect(ship.row + ship.size - 1).toBeLessThan(BOARD_SIZE);
      }
    });
  });

  it("randomizeShips places ships without overlap", () => {
    const ships = randomizeShips(initialShips);
    const occupiedCells = new Set<string>();
    ships.forEach((ship) => {
      const cells = [];
      for (let i = 0; i < ship.size; i++) {
        const cell = ship.isHorizontal
          ? `${ship.row}-${ship.col + i}`
          : `${ship.row + i}-${ship.col}`;
        cells.push(cell);
      }
      cells.forEach((cell) => {
        expect(occupiedCells.has(cell)).toBe(false);
        occupiedCells.add(cell);
      });
    });
  });
});
