import * as path from "@std/path";

export function readInput(filename: string, dir = "input") {
  return Deno.readTextFileSync(
    path.join(import.meta.dirname!, dir, filename),
  );
}
