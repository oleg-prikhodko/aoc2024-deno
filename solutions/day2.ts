import { readInput } from "../util.ts";

export function day2(filePath = "2.txt"): [number, number] {
  const linesOfNums = getLinesOfNums(filePath);
  const part1 = linesOfNums.filter(isSafe).length;
  const part2 =
    linesOfNums.filter((line) => isSafe(line) || couldBeSafe(line)).length;

  return [part1, part2];
}

function getLinesOfNums(filePath: string): number[][] {
  const contents = readInput(filePath);
  const lines = contents.split("\n");

  return lines.map((line) => line.split(" ").map(Number));
}

function isSafe(nums: number[]): boolean {
  if (nums.length < 2) throw new Error("array too small");
  if (nums[1] === nums[0]) return false;
  if (Math.abs(nums[1] - nums[0]) > 3) return false;

  const increasing = nums[1] > nums[0];

  for (let i = 2; i < nums.length; i++) {
    if (nums[i] > nums[i - 1] && !increasing) {
      return false;
    } else if (nums[i] < nums[i - 1] && increasing) {
      return false;
    } else if (nums[i] === nums[i - 1]) {
      return false;
    } else if (Math.abs(nums[i] - nums[i - 1]) > 3) {
      return false;
    }
  }

  return true;
}

function couldBeSafe(nums: number[]): boolean {
  const variants = [];
  for (let i = 0; i < nums.length; i++) {
    variants.push(nums.slice(0, i).concat(nums.slice(i + 1)));
  }

  return variants.some(isSafe);
}

if (import.meta.main) {
  console.log(day2());
}
