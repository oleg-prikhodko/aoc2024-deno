import { readInput } from "../util.ts";

type Position = { r: number; c: number };
type PointMap = Record<string, Position[]>;

export function day8(filename = "8.txt") {
  const grid = readInput(filename).split("\n");
  const points = getBasePoints(grid);

  const part1 = getExtraPointsCount(grid, points);
  const part2 = getExtraPointsCount(grid, points, true);

  return [part1, part2];
}

function getBasePoints(grid: string[]): PointMap {
  const points: PointMap = {};

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const char = grid[r][c];
      if (char === ".") {
        continue;
      }
      if (!points[char]) points[char] = [];
      points[char].push({ r, c });
    }
  }

  return points;
}

function getExtraPointsCount(grid: string[], points: PointMap, part2 = false) {
  const extraPoints = new Set<string>();

  for (const char in points) {
    for (let i = 0; i < points[char].length - 1; i++) {
      for (let j = i + 1; j < points[char].length; j++) {
        const a = points[char][i];
        const b = points[char][j];

        const top = a.r < b.r ? a : b;
        const bottom = a.r > b.r ? a : b;

        if (part2) {
          extraPoints.add([top.r, top.c].join());
          extraPoints.add([bottom.r, bottom.c].join());
        }

        const dr = bottom.r - top.r;
        const dc = bottom.c - top.c;

        let above: Position = { r: top.r - dr, c: top.c - dc };
        let below: Position = { r: bottom.r + dr, c: bottom.c + dc };

        // while above
        while (
          above.r >= 0 && above.r < grid.length && above.c >= 0 &&
          above.c < grid[0].length
        ) {
          extraPoints.add([above.r, above.c].join());
          if (!part2) break;
          above = { r: above.r - dr, c: above.c - dc };
        }

        // while below
        while (
          below.r >= 0 && below.r < grid.length && below.c >= 0 &&
          below.c < grid[0].length
        ) {
          extraPoints.add([below.r, below.c].join());
          if (!part2) break;
          below = { r: below.r + dr, c: below.c + dc };
        }
      }
    }
  }

  return extraPoints.size;
}

if (import.meta.main) {
  console.log(day8());
}
