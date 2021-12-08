// @ts-nocheck

import fs from "fs";
import path from "path";
import assert from "assert";

const TEST_1_RESULT = 26;
const TEST_2_RESULT = 61229;

function parseInput(input: string) {
  return input
    .trim()
    .split("\n")
    .map((row) => row.trim().split(" | "));
}

const uniqueAmountOfCharsToNumber = new Map([
  [2, 1],
  [4, 4],
  [3, 7],
  [7, 8],
]);

function solve(input: string[][]): number {
  let result = 0;
  for (const row of input) {
    const [, numbers] = row;

    for (const digit of numbers.split(" ")) {
      const charCount = digit.length;
      if (uniqueAmountOfCharsToNumber.has(charCount)) {
        result++;
      }
    }
  }

  return result;
}

// 0 1 2 3 4 5 6
// a b c d e f g

// 0 = !!se mikä on 7 ja 8 mutta ei muissa
// 1 =
// 2 =
// 3 =
// 4 = vaan 8
// 5 =
// 6 = vaan 8

const numberToLineIndexes = new Map([
  [0, [0, 1, 2, 4, 5, 6]],
  [1, [2, 5]],
  [2, [0, 2, 3, 4, 6]],
  [3, [0, 2, 3, 5, 6]],
  [4, [1, 2, 3, 5]],
  [5, [0, 1, 3, 5, 6]],
  [6, [0, 1, 3, 4, 5, 6]],
  [7, [0, 2, 5]],
  [8, [0, 1, 2, 3, 4, 5, 6]],
  [9, [0, 1, 2, 3, 5, 6]],
]);

const easyDigits = {
  1: ["c", "f"],
  4: ["b", "c", "d", "f"],
  7: ["a", "c", "f"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
};

function solve2(input: string[][]): number {
  let result = 0;

  for (const row of input) {
    const stringToDigit: Record<string, number> = {};
    const digitToString: Record<number, string> = {};
    const [allNumbers, targetNumbers] = row;

    for (const digit of allNumbers.split(" ")) {
      const charCount = digit.length;
      if (uniqueAmountOfCharsToNumber.has(charCount)) {
        uniqueAmountOfCharsToNumber.get(charCount);
        stringToDigit[digit] = uniqueAmountOfCharsToNumber.get(charCount)!;
        digitToString[uniqueAmountOfCharsToNumber.get(charCount)!] = digit;
      }
    }

    // out of 0,6,9 the one which doesn't have both letters of 1 (c,f) is 6
    for (const digit of allNumbers.split(" ")) {
      const charCount = digit.length;
      const oneLetters = digitToString[1].split("");
      if (charCount === 6) {
        if (!oneLetters.every((letter) => digit.includes(letter))) {
          stringToDigit[digit] = 6;
          digitToString[6] = digit;
        }
      }
    }

    const allLetters = ["a", "b", "c", "d", "e", "f", "g"];

    // 6: [0, 9],
    // 5: [2, 3, 5],
    // the one which doesn't have missing digit of 6 is 5
    for (const digit of allNumbers.split(" ")) {
      const missingDigit = allLetters.filter(
        (letter) => !digitToString[6].includes(letter)
      )[0];
      if (digit.length === 5) {
        if (!digit.includes(missingDigit)) {
          stringToDigit[digit] = 5;
          digitToString[5] = digit;
        }
      }
    }

    // 6: [0, 9],
    // 5: [2, 3],
    // the one which doesn't have both of 1 is 2 and the other is 3
    for (const digit of allNumbers.split(" ")) {
      if (Object.keys(stringToDigit).includes(digit)) continue;
      const charCount = digit.length;
      const oneLetters = digitToString[1].split("");
      if (charCount === 5) {
        if (!oneLetters.every((letter) => digit.includes(letter))) {
          stringToDigit[digit] = 2;
          digitToString[2] = digit;
        } else {
          stringToDigit[digit] = 3;
          digitToString[3] = digit;
        }
      }
    }

    // 6: [0, 9],
    // the one which doesn't have all letters of 4 is 0 and the other is 9
    for (const digit of allNumbers.split(" ")) {
      if (Object.keys(stringToDigit).includes(digit)) continue;
      const charCount = digit.length;
      const oneLetters = digitToString[4].split("");
      if (charCount === 6) {
        if (!oneLetters.every((letter) => digit.includes(letter))) {
          stringToDigit[digit] = 0;
          digitToString[0] = digit;
        } else {
          stringToDigit[digit] = 9;
          digitToString[9] = digit;
        }
      }
    }

    // resolve target
    let numberino = "";
    for (const str of targetNumbers.split(" ")) {
      const normalized = String(Array.from(str).sort());
      for (const [digit, value] of Object.entries(stringToDigit)) {
        const normalized2 = String(Array.from(digit).sort());
        if (normalized === normalized2) {
          numberino += value;
          break;
        }
      }
    }

    result += Number(numberino);
  }

  return result;
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

  console.log("Test 2 is:", solve2(testInput));
  assert(solve2(testInput) === TEST_2_RESULT);
  console.log("Exercise 2 is:", solve2(realInput));
}

main();
