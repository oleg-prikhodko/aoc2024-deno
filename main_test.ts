import { assertEquals } from "@std/assert";
import { day1 } from "./solutions/day1.ts";
import { day2 } from "./solutions/day2.ts";
import { day3 } from "./solutions/day3.ts";
import { day4 } from "./solutions/day4.ts";
import { day5 } from "./solutions/day5.ts";

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
