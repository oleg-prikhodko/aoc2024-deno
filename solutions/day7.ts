import { readInput } from "../util.ts";

export function day7(filename = "7.txt") {
  const cases = read(filename);
  let part1 = 0;
  let part2 = 0;

  for (const { nums, target } of cases) {
    if (calc(nums, target)) {
      part1 += target;
    }
    if (calc(nums, target, true)) {
      part2 += target;
    }
  }

  return [part1, part2];
}

function read(filename: string) {
  const lines = readInput(filename).split("\n");
  const cases: { target: number; nums: number[] }[] = [];

  for (const line of lines) {
    const [, target, numStr] = /^(\d+): (.+)$/.exec(line)!;
    cases.push({ target: Number(target), nums: numStr.split(" ").map(Number) });
  }

  return cases;
}

function calc(nums: number[], target: number, concatMode = false): boolean {
  const [a, b, ...rest] = nums;
  const sum = a + b;
  const mul = a * b;
  const con = Number(a.toString() + b.toString());

  if (
    (sum === target || mul === target || (concatMode && con === target)) &&
    (rest.length === 0)
  ) {
    return true;
  } else if (rest.length === 0 || a > target) {
    return false;
  }

  return calc([sum, ...rest], target, concatMode) ||
    calc([mul, ...rest], target, concatMode) ||
    (concatMode && calc([con, ...rest], target, concatMode));
}

if (import.meta.main) {
  console.log(day7());
}
