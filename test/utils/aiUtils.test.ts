import { getNextAIMove, addSurroundingCellsToStack } from "$utils/aiUtils";

describe("aiUtils", () => {
  it("getNextAIMove selects the next target from the stack", () => {
    const targetStack = [{ row: 3, col: 4 }];
    const aiShots = new Set<string>();

    const move = getNextAIMove(targetStack, aiShots);
    expect(move).toEqual({ row: 3, col: 4 });
    expect(targetStack).toHaveLength(0);
  });

  it("getNextAIMove selects a random unshot cell when the stack is empty", () => {
    const targetStack: { row: number; col: number }[] = [];
    const aiShots = new Set(["0-0", "0-1", "0-2", "0-3"]);

    const move = getNextAIMove(targetStack, aiShots);
    expect(move).toHaveProperty("row");
    expect(move).toHaveProperty("col");
    expect(aiShots.has(`${move.row}-${move.col}`)).toBe(false);
  });

  it("addSurroundingCellsToStack adds valid cells around a hit", () => {
    const targetStack: { row: number; col: number }[] = [];
    const aiShots = new Set(["1-1"]);

    const updatedStack = addSurroundingCellsToStack(targetStack, 2, 2, aiShots);

    expect(updatedStack).toEqual(
      expect.arrayContaining([
        { row: 1, col: 2 },
        { row: 3, col: 2 },
        { row: 2, col: 1 },
        { row: 2, col: 3 },
      ]),
    );
    expect(updatedStack).not.toContainEqual({ row: 1, col: 1 });
  });

  it("addSurroundingCellsToStack avoids adding out-of-bounds cells", () => {
    const targetStack: { row: number; col: number }[] = [];
    const aiShots = new Set<string>();

    const updatedStack = addSurroundingCellsToStack(targetStack, 0, 0, aiShots);

    expect(updatedStack).toEqual(
      expect.arrayContaining([
        { row: 1, col: 0 },
        { row: 0, col: 1 },
      ]),
    );
    expect(updatedStack).not.toContainEqual({ row: -1, col: 0 });
    expect(updatedStack).not.toContainEqual({ row: 0, col: -1 });
  });
});
