import { renderHook, act } from "@testing-library/react";
import { useGameLogic } from "$hooks/useGameLogic";
import TestWrapper from "../utils/testWrapper";

describe("useGameLogic", () => {
  it("dispatches shot action when handleShot is called", () => {
    const { result } = renderHook(() => useGameLogic(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.fireShot(0, 0);
    });

    expect(result.current).toBeDefined();
    expect(result.current.fireShot).toBeInstanceOf(Function);
    expect(result.current.player1Shots).toContain("0-0");
  });

  it("dispatches reset action when resetGame is called", () => {
    const { result } = renderHook(() => useGameLogic(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.resetGame();
    });

    expect(result.current).toBeDefined();
    expect(result.current.player1Shots.length).toBe(0);
    expect(result.current.player2Shots.length).toBe(0);
  });

  it("returns the correct initial state from the Redux store", () => {
    const { result } = renderHook(() => useGameLogic(), {
      wrapper: TestWrapper,
    });

    expect(result.current.player1Shots).toEqual([]);
    expect(result.current.player2Shots).toEqual([]);
    expect(result.current.currentPlayer).toBe(1);
    expect(result.current.winner).toBeNull();
  });
});
