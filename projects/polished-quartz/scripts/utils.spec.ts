import { beforeEach, describe, expect, it, vi } from "vitest";
import { announceSeconds } from "./utils";

describe("addition", () => {
  it.each([
    ["adds two numbers", 1, 1, 2],
    ["adds negative numbers", 1, -1, 0],
  ])("%s", async (...[, a, b, expected]) => expect(a + b).toEqual(expected));
});

describe("announceSeconds", () => {
  const mockRunCommandAsync = vi.fn();

  const world = {
    getDimension: () => ({ runCommandAsync: mockRunCommandAsync }),
    getPlayers: () => {
      let iter: any = {};
      iter[Symbol.iterator] = function* () {
        let start = 0;
        const end = 1;
        while (start < end) yield start++;
      };
      return iter;
    },
  };

  beforeEach(() => {
    mockRunCommandAsync.mockClear();
  });

  it.each([
    ["announces on the first interval", 100, 1],
    ["announces on the second interval", 200, 1],
    ["does nothing before the interval", 99, 0],
  ])("%s", async (...[, tickNum, callCount]) => {
    announceSeconds(tickNum, world);
    expect(mockRunCommandAsync).toHaveBeenCalledTimes(callCount);
  });
});
