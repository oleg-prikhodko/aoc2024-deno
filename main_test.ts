import { assertEquals } from "@std/assert";
import { day1 } from "./solutions/day1.ts";
import { day2 } from "./solutions/day2.ts";
import { day3 } from "./solutions/day3.ts";
import { day4 } from "./solutions/day4.ts";
import { day5 } from "./solutions/day5.ts";
import { day6 } from "./solutions/day6.ts";
import { day7 } from "./solutions/day7.ts";
import { day8 } from "./solutions/day8.ts";

Deno.test("day 1", () => {
  assertEquals(day1("1_test.txt"), [11, 31]);
});

Deno.test("day 2", () => {
  assertEquals(day2("2_test.txt"), [2, 4]);
});

Deno.test("day 3", () => {
  assertEquals(day3("3_test.txt"), [161, 48]);
});

Deno.test("day 4", () => {
  assertEquals(day4("4_test.txt"), [18, 9]);
});

Deno.test("day 5", () => {
  assertEquals(day5("5_test.txt"), [143, 123]);
});

Deno.test("day 6", () => {
  assertEquals(day6("6_test.txt"), 41);
});

Deno.test("day 7", () => {
  assertEquals(day7("7_test.txt"), [3749, 11387]);
});

Deno.test("day 8", () => {
  assertEquals(day8("8_test.txt"), [14, 34]);
});
