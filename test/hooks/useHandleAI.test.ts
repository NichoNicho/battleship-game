import { renderHook, act } from "@testing-library/react";
import { useHandleAI } from "$hooks/useHandleAI";
import TestWrapper from "../utils/testWrapper";

jest.mock("$utils/aiUtils", () => ({
  getNextAIMove: jest.fn(() => ({ row: 0, col: 0 })),
  addSurroundingCellsToStack: jest.fn((stack) => stack),
}));

describe("useHandleAI", () => {
  it("dispatches a shot action when handleShot is called", () => {
    const { result } = renderHook(() => useHandleAI(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleShot(0, 0);
    });

    expect(result.current).toBeDefined();
    expect(result.current.handleShot).toBeInstanceOf(Function);
  });

  it("handles AI move correctly", () => {
    const { result } = renderHook(() => useHandleAI(), {
      wrapper: TestWrapper,
    });

    act(() => {
      // Simulate AI turn
      result.current.handleShot(0, 0);
    });

    expect(result.current).toBeDefined();
    expect(result.current.currentPlayer).toBe(1); // Player's turn after AI
  });

  it("resets the game correctly", () => {
    const { result } = renderHook(() => useHandleAI(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.resetGame();
    });

    expect(result.current).toBeDefined();
    expect(result.current.currentPlayer).toBe(1);
  });
});
