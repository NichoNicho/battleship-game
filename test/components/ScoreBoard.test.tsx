import { render, screen } from "@testing-library/react";
import ScoreBoard from "$components/ScoreBoard";
import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockShips = [
  { name: "Battleship", size: 4, hits: 2, sunk: false },
  { name: "Destroyer", size: 3, hits: 3, sunk: true },
];

describe("ScoreBoard", () => {
  it("renders correctly", () => {
    const { container } = render(<ScoreBoard ships={mockShips} />);
    expect(container).toMatchSnapshot();
  });

  it("displays ship information correctly", () => {
    render(<ScoreBoard ships={mockShips} />);

    // Locate rows by ship names
    const destroyerRow = screen.getByText("Destroyer").closest("tr");
    const battleshipRow = screen.getByText("Battleship").closest("tr");

    // Validate Destroyer row
    expect(destroyerRow).toBeInTheDocument();
    expect(screen.getByText("Destroyer")).toBeInTheDocument();
    expect(screen.getAllByText("3").length).toBeGreaterThanOrEqual(2); // Ensures both size and hits are present
    expect(screen.getByText("sunk")).toBeInTheDocument();

    // Validate Battleship row
    expect(battleshipRow).toBeInTheDocument();
    expect(screen.getByText("Battleship")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("afloat")).toBeInTheDocument();
  });
});
