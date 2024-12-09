import { readInput } from "../util.ts";

type Data = { idx: number; len: number; start: number };
type Space = { len: number; start: number };

function day9(filename = "9.txt") {
  const { res, data, spaces } = prepare(readInput(filename));

  return [checksum(part1(res)), checksum(part2(res, data, spaces))];
}

function prepare(str: string) {
  let res: string[] = [];
  let idx = 0;

  const data: Data[] = [];
  const spaces: Space[] = [];

  for (let i = 0; i < str.length; i++) {
    const len = +str[i];
    if ((i + 1) % 2 === 0) {
      spaces.push({ len, start: res.length });
      res = res.concat(Array(len).fill("."));
    } else {
      data.push({ idx, len, start: res.length });
      res = res.concat(Array(len).fill(idx));
      idx++;
    }
  }

  return { res, data, spaces };
}

function part1(arr: readonly string[]) {
  const res = arr.slice();
  let i = 0;
  let j = res.length - 1;

  while (i < j) {
    if (res[i] !== ".") {
      i++;
      continue;
    }
    if (res[j] === ".") {
      j--;
      continue;
    }
    res[i] = res[j];
    res[j] = ".";
  }

  return res;
}

function part2(arr: readonly string[], data: Data[], spaces: Space[]) {
  const res = arr.slice();

  for (const d of data.reverse()) {
    for (const s of spaces) {
      if (s.len >= d.len && s.start < d.start) {
        let count = 0;
        let i = s.start;
        let j = d.start;

        while (count < d.len) {
          res[i] = res[j];
          res[j] = ".";
          i++;
          j++;
          count++;
        }

        s.len -= d.len;
        s.start += d.len;
        break;
      }
    }
  }

  return res;
}

function checksum(arr: string[]) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (/\d/.test(arr[i])) {
      sum += i * Number(arr[i]);
    }
  }

  return sum;
}

if (import.meta.main) {
  console.log(day9());
}
