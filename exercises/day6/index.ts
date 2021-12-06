import fs from "fs";
import path from "path";
import assert from "assert";

const TEST_1_RESULT = 5934;
const TEST_2_RESULT = 26984457539;

function parseInput(input: string) {
  return input.trim().split(",").map(Number);
}

function solveNaive(fishesArg: number[], days: number = 80): number {
  let fishes = [...fishesArg];

  for (let i = 0; i < days; i++) {
    let newFishes: number[] = [];
    fishes = fishes
      .map((fish) => {
        if (fish === 0) {
          newFishes.push(8);
          return 6;
        } else {
          return --fish;
        }
      })
      .concat(newFishes);
  }

  return fishes.length;
}

function solve(fishesArg: number[], days: number = 80): number {
  let fishes: Record<number, number> = fishesArg.reduce(
    (acc: Record<number, number>, cur) => {
      acc[cur]++;

      return acc;
    },
    { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
  );

  for (let i = 0; i < days; i++) {
    let newFishes: Record<number, number> = {};
    for (let day = 8; day >= 0; day--) {
      const fishCount = fishes[day];
      if (day === 0) {
        newFishes[8] = fishCount;
        newFishes[6] = newFishes[6] + fishCount;
      } else {
        newFishes[day - 1] = fishCount;
      }
    }

    fishes = newFishes;
  }

  return Object.values(fishes).reduce((acc, cur) => acc + cur);
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

  console.log("Test 2 is:", solve(testInput, 256));
  assert(solve(testInput, 256) === TEST_2_RESULT);
  console.log("Exercise 2 is:", solve(realInput, 256));
}

main();
