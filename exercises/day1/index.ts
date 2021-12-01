import fs from "fs";
import path from "path";

function countIncreases(counts: number[]) {
  let result = 0;
  let previous = Infinity;
  for (const count of counts) {
    if (previous < count) result++;
    previous = count;
  }

  return result;
}

function countSlidingWindowIncreases(counts: number[]) {
  const averageCounts = counts
    .map((count, index) => {
      const nextCount = counts?.[index + 1];
      const nextNextCount = counts?.[index + 2];

      if (!nextCount || !nextNextCount) return null;

      return count + nextCount + nextNextCount;
    })
    .filter((elem) => typeof elem === "number")
    // @ts-expect-error
    .map((value) => value / 3);

  return countIncreases(averageCounts);
}

function parseInput(input: string) {
  return input.split("\n").map((line) => Number(line));
}

function main() {
  const testInput = fs
    .readFileSync(path.resolve(__dirname, "test-input.txt"), "utf8")
    .trim();
  const realInput = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
    .trim();

  console.log("Test 1 is:", countIncreases(parseInput(testInput)));
  console.log("Exercise 1 is:", countIncreases(parseInput(realInput)));

  console.log("Test 2 is:", countSlidingWindowIncreases(parseInput(testInput)));
  console.log(
    "Exercise 2 is:",
    countSlidingWindowIncreases(parseInput(realInput))
  );
}

main();
