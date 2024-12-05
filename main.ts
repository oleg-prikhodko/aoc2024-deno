import { day1 } from "./solutions/day1.ts";
import { day2 } from "./solutions/day2.ts";
import { day3 } from "./solutions/day3.ts";
import { day4 } from "./solutions/day4.ts";
import { day5 } from "./solutions/day5.ts";

function run(fn: () => unknown, idx: number) {
  console.log(`Day ${idx}:`, fn());
}

if (import.meta.main) {
  const solutions = [
    day1,
    day2,
    day3,
    day4,
    day5,
  ];

  for (const [idx, fn] of solutions.entries()) {
    run(fn, idx + 1);
  }
}
