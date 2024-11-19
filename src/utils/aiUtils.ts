import { BOARD_SIZE } from "$constants/gameConstants";

/**
 * Gets the next move for the AI based on the target stack and previous shots.
 * @param targetStack - Stack of prioritized cells to target.
 * @param aiShots - Set of coordinates already targeted by the AI.
 * @returns The next move (row and col).
 */
export const getNextAIMove = (
  targetStack: { row: number; col: number }[],
  aiShots: Set<string>,
): { row: number; col: number } => {
  if (targetStack.length > 0) {
    return targetStack.pop()!;
  }

  const unshotCells = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const key = `${r}-${c}`;
      if (!aiShots.has(key)) {
        unshotCells.push({ row: r, col: c });
      }
    }
  }

  return unshotCells[Math.floor(Math.random() * unshotCells.length)];
};

/**
 * Adds surrounding cells to the target stack if they haven't been targeted.
 * @param targetStack - The current stack of prioritized cells.
 * @param row - The row of the hit cell.
 * @param col - The column of the hit cell.
 * @param aiShots - Set of coordinates already targeted by the AI.
 * @returns An updated target stack with new cells added.
 */
export const addSurroundingCellsToStack = (
  targetStack: { row: number; col: number }[],
  row: number,
  col: number,
  aiShots: Set<string>,
): { row: number; col: number }[] => {
  const potentialTargets = [
    { row: row - 1, col },
    { row: row + 1, col },
    { row, col: col - 1 },
    { row, col: col + 1 },
  ];

  potentialTargets.forEach((cell) => {
    const key = `${cell.row}-${cell.col}`;
    if (
      cell.row >= 0 &&
      cell.row < BOARD_SIZE &&
      cell.col >= 0 &&
      cell.col < BOARD_SIZE &&
      !aiShots.has(key) &&
      !targetStack.some((t) => t.row === cell.row && t.col === cell.col)
    ) {
      targetStack.push(cell);
    }
  });

  return targetStack;
};
