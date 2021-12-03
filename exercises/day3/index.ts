import fs from "fs";
import path from "path";
import assert from "assert";

const TEST_1_RESULT = 198;
const TEST_2_RESULT = 230;

function parseInput(input: string) {
  return input.trim().split("\n");
}

function calculateBits(input: string[], useLessCommon?: true) {
  return input
    .reduce(
      (acc, row) => {
        return [...row].reduce((acc2, char, i) => {
          if (char === "0") {
            acc[i][0]++;
          } else {
            acc[i][1]++;
          }
          return acc2;
        }, acc);
      },
      [...input[0]].map(() => [0, 0])
    )
    .map(([zeros, ones]) => {
      let zerosToUse = zeros;
      let onesToUse = ones;
      if (useLessCommon) {
        onesToUse = zeros;
        zerosToUse = ones;
      }
      if (onesToUse > zerosToUse) return "1";
      return "0";
    })
    .join("");
}

function calculateBits2(input: string[], useLessCommon?: true) {
  let remainingLines = input;
  for (let index = 0; index < input[0].length; index++) {
    if (remainingLines.length === 1) break;
    let zeros = 0;
    let ones = 0;

    for (const lines of remainingLines) {
      const char = lines[index];
      if (char === "0") zeros++;
      else ones++;
    }

    let charToFilterBy = zeros > ones ? "0" : "1";
    if (useLessCommon) charToFilterBy = zeros > ones ? "1" : "0";

    remainingLines = remainingLines.filter(
      (line) => line[index] === charToFilterBy
    );
  }

  assert(remainingLines.length === 1);

  return remainingLines[0];
}

function solveOne(input: string[]) {
  return (
    parseInt(calculateBits(input), 2) * parseInt(calculateBits(input, true), 2)
  );
}

function solveTwo(input: string[]) {
  return (
    parseInt(calculateBits2(input), 2) *
    parseInt(calculateBits2(input, true), 2)
  );
}

function main() {
  const testInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "test-input.txt"), "utf8")
  );
  const realInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  );

  console.log("Test 1 is:", solveOne(testInput));
  assert(solveOne(testInput) === TEST_1_RESULT);
  console.log("Exercise 1 is:", solveOne(realInput));

  console.log("Test 2 is:", solveTwo(testInput));
  assert(solveTwo(testInput) === TEST_2_RESULT);
  console.log("Exercise 2 is:", solveTwo(realInput));
}

main();
