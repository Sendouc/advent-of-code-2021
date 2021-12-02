import fs from "fs";
import path from "path";
import assert from "assert";

const TEST_1_RESULT = -1;
const TEST_2_RESULT = -1;

function parseInput(input: string) {
  return input.trim().split("\n");
}

function main() {
  const testInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "test-input.txt"), "utf8")
  );
  const realInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  );

  console.log("Test 1 is:");
  // assert(-1 === TEST_1_RESULT);
  console.log("Exercise 1 is:");

  console.log("Test 2 is:");
  // assert(-1 === TEST_2_RESULT);
  console.log("Exercise 2 is:");
}

main();
