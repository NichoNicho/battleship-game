import { checkWinCondition } from "$utils/gameStateUtils";
import { Ship } from "$types/Ship";

describe("gameStateUtils", () => {
  const mockFleet: Ship[] = [
    {
      name: "Destroyer",
      size: 2,
      row: 0,
      col: 0,
      isHorizontal: true,
      hits: 2,
      sunk: true,
    },
    {
      name: "Battleship",
      size: 4,
      row: 1,
      col: 3,
      isHorizontal: false,
      hits: 0,
      sunk: false,
    },
  ];

  it("checkWinCondition returns true when all ships are sunk", () => {
    const sunkFleet = mockFleet.map((ship) => ({ ...ship, sunk: true }));
    expect(checkWinCondition(sunkFleet)).toBe(true);
  });

  it("checkWinCondition returns false when any ship is not sunk", () => {
    expect(checkWinCondition(mockFleet)).toBe(false);
  });
});
