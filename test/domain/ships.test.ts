import { isHit } from "$domain/ships";
import { Ship } from "$types/Ship";

describe("ships", () => {
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
});
