import {
  initializeBoard,
  placeShipOnBoard,
  canPlaceShip,
} from "$utils/boardUtils";

describe("boardUtils", () => {
  const BOARD_SIZE = 10;

  it("initializeBoard creates an empty board of the correct size", () => {
    const board = initializeBoard(BOARD_SIZE);
    expect(board).toHaveLength(BOARD_SIZE);
    expect(board[0]).toHaveLength(BOARD_SIZE);
    expect(
      board.every((row) => row.every((cell) => !cell.hasShip && !cell.hit)),
    ).toBe(true);
  });

  it("placeShipOnBoard correctly places a horizontal ship", () => {
    const board = initializeBoard(BOARD_SIZE);
    const updatedBoard = placeShipOnBoard(board, 0, 0, 3, true);

    expect(updatedBoard[0][0].hasShip).toBe(true);
    expect(updatedBoard[0][1].hasShip).toBe(true);
    expect(updatedBoard[0][2].hasShip).toBe(true);
    expect(updatedBoard[0][3].hasShip).toBe(false);
  });

  it("placeShipOnBoard correctly places a vertical ship", () => {
    const board = initializeBoard(BOARD_SIZE);
    const updatedBoard = placeShipOnBoard(board, 0, 0, 3, false);

    expect(updatedBoard[0][0].hasShip).toBe(true);
    expect(updatedBoard[1][0].hasShip).toBe(true);
    expect(updatedBoard[2][0].hasShip).toBe(true);
    expect(updatedBoard[3][0].hasShip).toBe(false);
  });

  it("canPlaceShip validates ship placement correctly", () => {
    const board = initializeBoard(BOARD_SIZE);
    expect(canPlaceShip(board, 0, 0, 3, true)).toBe(true);
    expect(canPlaceShip(board, 0, 8, 3, true)).toBe(false);
    expect(canPlaceShip(board, 0, 0, 3, false)).toBe(true);
    expect(canPlaceShip(board, 8, 0, 3, false)).toBe(false);
  });

  it("canPlaceShip detects collision with existing ships", () => {
    let board = initializeBoard(BOARD_SIZE);
    board = placeShipOnBoard(board, 0, 0, 3, true);

    expect(canPlaceShip(board, 0, 0, 3, true)).toBe(false);
    expect(canPlaceShip(board, 0, 0, 3, false)).toBe(false);
  });
});
