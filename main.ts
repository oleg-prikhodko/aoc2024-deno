import { day1 } from "./solutions/day1.ts";
import { day2 } from "./solutions/day2.ts";
import { day3 } from "./solutions/day3.ts";
import { day4 } from "./solutions/day4.ts";
import { day5 } from "./solutions/day5.ts";
import { day6 } from "./solutions/day6.ts";
import { day7 } from "./solutions/day7.ts";
import { day8 } from "./solutions/day8.ts";

function run(fn: () => unknown, idx: number) {
  console.log(`Day ${idx}:`, fn());
}

// FYI: put text inputs (like "1.txt", "2.txt", etc.) into "input" dir first
if (import.meta.main) {
  const solutions = [
    day1,
    day2,
    day3,
    day4,
    day5,
    day6,
    day7,
    day8,
  ];

  for (const [idx, fn] of solutions.entries()) {
    run(fn, idx + 1);
  }
}
