import fs from "fs";
import path from "path";

function parseInput(input: string) {
  return input.split("\n");
}

function main() {
  const testInput = fs
    .readFileSync(path.resolve(__dirname, "test-input.txt"), "utf8")
    .trim();
  const realInput = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
    .trim();

  console.log("Test 1 is:");
  console.log("Exercise 1 is:");

  console.log("Test 2 is:");
  console.log("Exercise 2 is:");
}

main();
