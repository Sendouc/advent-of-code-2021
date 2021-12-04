import fs from "fs";
import path from "path";
import assert from "assert";

const TEST_1_RESULT = 4512;
const TEST_2_RESULT = 1924;

function parseInput(input: string) {
  const lines = input.trim().split("\n\n");

  const numbersDrawn = lines[0].trim().split(",").map(Number);
  const grids = lines
    .slice(1)
    .map((stringGrid) =>
      stringGrid
        .split("\n")
        .map((stringRow) => stringRow.trim().split(/\s+/).map(Number))
    );

  return { numbersDrawn, grids };
}

function result(
  grid: number[][],
  selected: boolean[][],
  lastNumberDrawn: number
) {
  let sumOfUnselected = 0;
  for (const [rowI, row] of grid.entries()) {
    for (const [columnI, elem] of row.entries()) {
      if (!selected[rowI][columnI]) {
        sumOfUnselected += elem;
      }
    }
  }

  return sumOfUnselected * lastNumberDrawn;
}

function solve(numbersDrawn: number[], grids: number[][][], winsLast?: true) {
  const numbersRemaining = [...numbersDrawn];
  const numbersSelected = grids.map((grid) =>
    grid.map((row) => row.map(() => false))
  );
  const gridsWon = grids.map(() => false);

  while (numbersRemaining.length) {
    const numberThisRound = numbersRemaining.shift()!;
    for (let gridI = 0; gridI < grids.length; gridI++) {
      for (let rowI = 0; rowI < grids[0].length; rowI++) {
        for (let elemI = 0; elemI < grids[0][0].length; elemI++) {
          const elem = grids[gridI][rowI][elemI];
          if (elem === numberThisRound) {
            numbersSelected[gridI][rowI][elemI] = true;
          }
        }
      }
    }

    for (const [gridI, grid] of numbersSelected.entries()) {
      const gameOver =
        grid.some((row) => row.every(Boolean)) ||
        new Array(grid.length)
          .fill(null)
          .map((_, i) => i)
          .some((columnI) => grid.every((row) => row[columnI]));

      if (gameOver) {
        if (winsLast) {
          gridsWon[gridI] = true;
          if (gridsWon.every(Boolean)) {
            return result(grids[gridI], grid, numberThisRound);
          }
        } else {
          return result(grids[gridI], grid, numberThisRound);
        }
      }
    }
  }

  throw Error("not found");
}

function main() {
  const testInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "test-input.txt"), "utf8")
  );
  const realInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  );

  console.log("Test 1 is:", solve(testInput.numbersDrawn, testInput.grids));
  assert(solve(testInput.numbersDrawn, testInput.grids) === TEST_1_RESULT);
  console.log("Exercise 1 is:", solve(realInput.numbersDrawn, realInput.grids));

  console.log(
    "Test 2 is:",
    solve(testInput.numbersDrawn, testInput.grids, true)
  );
  assert(
    solve(testInput.numbersDrawn, testInput.grids, true) === TEST_2_RESULT
  );
  console.log(
    "Exercise 2 is:",
    solve(realInput.numbersDrawn, realInput.grids, true)
  );
}

main();
