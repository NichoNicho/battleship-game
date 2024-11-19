import { render, screen, fireEvent } from "@testing-library/react";
import GameBoard from "$components/GameBoard";
import { Ship } from "$types/Ship";

const mockShips: Ship[] = [
  {
    name: "Battleship",
    size: 4,
    row: 0,
    col: 0,
    isHorizontal: true,
    hits: 0,
    sunk: false,
  },
  {
    name: "Destroyer",
    size: 3,
    row: 3,
    col: 2,
    isHorizontal: false,
    hits: 0,
    sunk: false,
  },
];

const shipColors = {
  Battleship: "blue",
  Destroyer: "green",
};

describe("GameBoard", () => {
  it("renders correctly", () => {
    const { container } = render(
      <GameBoard
        placedShips={mockShips}
        shipColors={shipColors}
        shots={new Set()}
        onFireShot={() => {}}
        isPlayerTurn={true}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("highlights hits correctly", () => {
    const shots = new Set(["0-0", "0-1"]);
    render(
      <GameBoard
        placedShips={mockShips}
        shipColors={shipColors}
        shots={shots}
        onFireShot={() => {}}
        isPlayerTurn={true}
      />,
    );

    const cell0 = screen
      .getByTestId("cell-0-0")
      .querySelector(".MuiPaper-root");
    const cell1 = screen
      .getByTestId("cell-0-1")
      .querySelector(".MuiPaper-root");

    expect(cell0).toHaveClass("MuiPaper-root");
    expect(cell1).toHaveClass("MuiPaper-root");

    expect(cell0).toHaveStyle("background-color: blue");
    expect(cell1).toHaveStyle("background-color: blue");
  });

  it("triggers the onFireShot callback on valid click", () => {
    const onFireShot = jest.fn();
    render(
      <GameBoard
        placedShips={mockShips}
        shipColors={shipColors}
        shots={new Set()}
        onFireShot={onFireShot}
        isPlayerTurn={true}
      />,
    );

    fireEvent.click(screen.getByTestId("cell-0-0"));
    expect(onFireShot).toHaveBeenCalledWith(0, 0);
  });

  it("prevents interaction when not player's turn", () => {
    const onFireShot = jest.fn();
    render(
      <GameBoard
        placedShips={mockShips}
        shipColors={shipColors}
        shots={new Set()}
        onFireShot={onFireShot}
        isPlayerTurn={false}
      />,
    );

    fireEvent.click(screen.getByTestId("cell-0-0"));
    expect(onFireShot).not.toHaveBeenCalled();
  });
});
