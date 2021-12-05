import fs from "fs";
import path from "path";
import assert from "assert";

const TEST_1_RESULT = 5;
const TEST_2_RESULT = 12;

function parseInput(input: string) {
  const lines = input.trim().split("\n");
  return lines.map((line) =>
    line.split(" -> ").map((coordinate) => coordinate.split(",").map(Number))
  );
}

function filterDiagonal(coordinates: number[][][]): number[][][] {
  return coordinates.filter((row) => {
    const [x1, y1] = row[0];
    const [x2, y2] = row[1];

    return x1 === x2 || y1 === y2;
  });
}

function solve(coordinates: number[][][]): number {
  const highest = Math.max(...coordinates.flat(3)) + 1;
  const overlaps = new Array(highest)
    .fill(null)
    .map(() => new Array(highest).fill(null).map(() => 0));

  for (const row of coordinates) {
    const [x1, y1] = row[0];
    const [x2, y2] = row[1];

    if (x1 === x2) {
      const [y1n, y2n] = y1 > y2 ? [y2, y1] : [y1, y2];
      for (let y = y1n; y <= y2n; y++) {
        overlaps[x1][y]++;
      }
    } else if (y1 === y2) {
      const [x1n, x2n] = x1 > x2 ? [x2, x1] : [x1, x2];
      for (let x = x1n; x <= x2n; x++) {
        overlaps[x][y1]++;
      }
    } else {
      let x = x1;
      let y = y1;
      do {
        do {
          overlaps[x][y]++;

          if (x < x2) x++;
          else x--;

          if (y < y2) y++;
          else y--;
        } while (y !== y2);
        assert(x === x2);
      } while (x !== x2);

      overlaps[x2][y2]++;
    }
  }

  return overlaps.flat().reduce((acc, cur) => (cur >= 2 ? ++acc : acc), 0);
}

function main() {
  const testInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "test-input.txt"), "utf8")
  );
  const realInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  );

  console.log("Test 1 is:", solve(filterDiagonal(testInput)));
  assert(solve(filterDiagonal(testInput)) === TEST_1_RESULT);
  console.log("Exercise 1 is:", solve(filterDiagonal(realInput)));

  console.log("Test 2 is:", solve(testInput));
  assert(solve(testInput) === TEST_2_RESULT);
  console.log("Exercise 2 is:", solve(realInput));
}

main();
