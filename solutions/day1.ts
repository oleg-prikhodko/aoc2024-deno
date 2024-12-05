import { readInput } from "../util.ts";

export function day1(filename = "1.txt") {
  const contents = readInput(filename);
  const lines = contents.split("\n");

  const listA: number[] = [];
  const listB: number[] = [];

  for (const line of lines) {
    const [, a, b] = /(\d+) {3}(\d+)/.exec(line)!;
    listA.push(+a);
    listB.push(+b);
  }

  // ------- part 1 -------

  listA.sort((a, b) => a - b);
  listB.sort((a, b) => a - b);

  const distances: number[] = [];

  for (let i = 0; i < listA.length; i++) {
    distances.push(Math.abs(listA[i] - listB[i]));
  }

  const totalDistance = distances.reduce((acc, curr) => acc + curr);

  // ------- part 2 -------

  const counter: Record<string, number> = {};
  for (const el of listB) {
    counter[el] = (counter[el] || 0) + 1;
  }

  let score = 0;
  for (const el of listA) {
    score += (counter[el] ?? 0) * el;
  }

  return [totalDistance, score];
}

if (import.meta.main) {
  console.log(day1());
}
