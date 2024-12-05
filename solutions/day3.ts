import { readInput } from "../util.ts";

export function day3(filename = "3.txt") {
  const input = readInput(filename);

  return [part1(input), part2(input)];
}

function part1(input: string) {
  const match = input.matchAll(/mul\((\d+),(\d+)\)/g);

  let sum = 0;

  for (const m of match) {
    const [, a, b] = m;
    sum += Number(a) * Number(b);
  }

  return sum;
}

function part2(input: string) {
  const match = input.matchAll(/(mul\((\d+),(\d+)\))|(do\(\))|(don't\(\))/g);

  let enabled = true;
  let sum = 0;

  for (const m of match) {
    const [str, , a, b] = m;
    if (str.startsWith("don't")) {
      enabled = false;
    } else if (str.startsWith("do")) {
      enabled = true;
    } else if (enabled) {
      sum += Number(a) * Number(b);
    }
  }

  return sum;
}

if (import.meta.main) {
  console.log(day3());
}
