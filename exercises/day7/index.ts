import fs from "fs";
import path from "path";
import assert from "assert";

const TEST_1_RESULT = 37;
const TEST_2_RESULT = 168;

function parseInput(input: string) {
  return input.trim().split(",").map(Number);
}

function solve(crabs: number[], part2?: boolean): number {
  const leftMostCrab = Math.min(...crabs);
  const rightMostCrab = Math.max(...crabs);

  const crabMap: Record<number, number> = {};
  for (let pos = leftMostCrab; pos <= rightMostCrab; pos++) {
    crabMap[pos] = 0;
  }
  for (const crab of crabs) {
    crabMap[crab]++;
  }

  const fuelRequired: Record<number, number> = {};
  let usingFuel = 0;
  for (let pos = 0; pos <= rightMostCrab; pos++) {
    fuelRequired[pos] = usingFuel;
    usingFuel += pos + 1;
  }

  let leastFuelUsed = Infinity;
  for (let pos = leftMostCrab; pos <= rightMostCrab; pos++) {
    let fuelUsed = 0;
    for (const crab of crabs) {
      const difference = Math.abs(crab - pos);
      if (part2) {
        fuelUsed += fuelRequired[difference];
      } else {
        fuelUsed += difference;
      }
    }

    if (leastFuelUsed > fuelUsed) leastFuelUsed = fuelUsed;
  }

  return leastFuelUsed;
}

function main() {
  const testInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "test-input.txt"), "utf8")
  );
  const realInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  );

  console.log("Test 1 is:", solve(testInput));
  assert(solve(testInput) === TEST_1_RESULT);
  console.log("Exercise 1 is:", solve(realInput));

  console.log("Test 2 is:", solve(testInput, true));
  assert(solve(testInput, true) === TEST_2_RESULT);
  console.log("Exercise 2 is:", solve(realInput, true));
}

main();
