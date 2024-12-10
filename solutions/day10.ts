import { readInput } from "../util.ts";

export function day10(grid: number[][]) {
  let score = 0;
  let rating = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 0) {
        const [totalPaths, pointsReached] = find(grid, r, c);
        score += pointsReached.size;
        rating += totalPaths;
      }
    }
  }

  return [score, rating];
}

function find(
  grid: number[][],
  r: number,
  c: number,
  found = new Set<string>(),
): [number, Set<string>] {
  if (grid[r][c] === 9) {
    found.add([r, c].join());
    return [1, found];
  }

  const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let total = 0;

  for (const [dr, dc] of moves) {
    const nextR = r + dr;
    const nextC = c + dc;
    if (grid[nextR]?.[nextC] === grid[r][c] + 1) {
      const [subtotal] = find(grid, nextR, nextC, found);
      total += subtotal;
    }
  }

  return [total, found];
}

if (import.meta.main) {
  const grid = readInput("10.txt").split("\n").map((line) =>
    line.split("").map(Number)
  );
  console.log(day10(grid));
}
