import { readInput } from "../util.ts";

type Direction = [number, number];

export function day4(filename = "4.txt") {
  const input = readInput(filename).split("\n");

  return [part1(input), part2(input)];
}

function part1(input: string[]) {
  const diffs: Direction[] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];
  let count = 0;

  for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
      if (input[r][c] === "X") {
        for (const diff of diffs) {
          const found = !!find(input, "MAS", diff, r, c);
          count += found ? 1 : 0;
        }
      }
    }
  }

  return count;
}

function part2(input: string[]) {
  const diffs: Direction[] = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ];
  const locations = new Set<string>();
  let count = 0;

  for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
      if (input[r][c] === "M") {
        for (const diff of diffs) {
          const res = find(input, "AS", diff, r, c);
          if (!res) {
            continue;
          }
          if (locations.has(res)) {
            count++;
          }
          locations.add(res);
        }
      }
    }
  }

  return count;
}

function find(
  input: string[],
  str: string,
  diff: Direction,
  r = 0,
  c = 0,
): string | null {
  const nextR = r + diff[0];
  const nextC = c + diff[1];
  const current = input[nextR]?.[nextC];
  const target = str[0];
  if (!current || target !== current) {
    return null;
  }

  // return "A" position for part 2
  if (str.length === 1) {
    return [r, c].join();
  }

  return find(input, str.slice(1), diff, nextR, nextC);
}

if (import.meta.main) {
  console.log(day4());
}
