import { checkWinner } from "$domain/gameLogic";
import { Ship } from "$types/Ship";

describe("gameLogic", () => {
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

  it("checkWinner returns true when all ships are sunk", () => {
    const currentShots = ["0-0", "0-1", "1-3", "2-3", "3-3", "4-3"];

    expect(checkWinner(currentShots, mockFleet)).toBe(true);
  });

  it("checkWinner returns false when any ship is not sunk", () => {
    const currentShots = ["0-0", "0-1", "1-3", "2-3"];

    expect(checkWinner(currentShots, mockFleet)).toBe(false);
  });
});
