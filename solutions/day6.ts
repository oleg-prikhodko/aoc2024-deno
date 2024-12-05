import { readInput } from "../util.ts";

export function day6(filename = "6.txt") {
  const grid = readInput(filename).split("\n");
  const start = findStart(grid);
  return traverse(grid, ...start);
}

function findStart(grid: string[]) {
  const guardSymbols = ["^", "v", ">", "<"];

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (guardSymbols.includes(grid[r][c])) {
        const [dirR, dirC] = getDirection(grid[r][c]);
        return [r, c, dirR, dirC];
      }
    }
  }

  throw new Error("No start position");
}

function getDirection(symbol: string) {
  switch (symbol) {
    case ">":
      return [0, 1];
    case "<":
      return [0, -1];
    case "^":
      return [-1, 0];
    case "v":
      return [1, 0];
    default:
      throw new Error("Invalid symbol");
  }
}

function traverse(grid: string[], r = 0, c = 0, dr = 0, dc = 0) {
  const locations = new Set<string>();

  while (r >= 0 && r < grid.length && c >= 0 && c < grid[r].length) {
    locations.add([r, c].join());
    if (grid[r + dr]?.[c + dc] === "#") {
      [dr, dc] = turnRight(dr, dc);
    }
    r += dr;
    c += dc;
  }

  return locations.size;
}

function turnRight(dirR: number, dirC: number) {
  switch ([dirR, dirC].join()) {
    case "-1,0":
      return [0, 1];
    case "1,0":
      return [0, -1];
    case "0,-1":
      return [-1, 0];
    case "0,1":
      return [1, 0];
    default:
      throw new Error("Invalid direction");
  }
}

if (import.meta.main) {
  console.log(day6());
}
