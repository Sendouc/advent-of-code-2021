import fs from "fs";
import path from "path";
import assert from "assert";

const TEST_1_RESULT = 150;
const TEST_2_RESULT = 900;

function parseInput(input: string) {
  return input.trim().split("\n");
}

function calculateMovements(input: string[]): number {
  const [x, y] = input.reduce(
    (acc: [number, number], cur) => {
      const [direction, value] = cur.split(" ");
      const valueAsNumber = Number(value);

      switch (direction) {
        case "forward":
          acc[0] = acc[0] + valueAsNumber;
          break;
        case "down":
          acc[1] = acc[1] + valueAsNumber;
          break;
        case "up":
          acc[1] = acc[1] - valueAsNumber;
          break;
        default:
          throw Error("unknown direction");
      }

      return acc;
    },
    [0, 0]
  );

  return x * y;
}

function calculateMovementsWithAim(input: string[]): number {
  const { x, y } = input.reduce(
    (acc, cur) => {
      const [direction, value] = cur.split(" ");
      const valueAsNumber = Number(value);

      switch (direction) {
        case "forward":
          acc.x = acc.x + valueAsNumber;
          acc.y = acc.y + valueAsNumber * acc.aim;
          break;
        case "down":
          acc.aim = acc.aim + valueAsNumber;
          break;
        case "up":
          acc.aim = acc.aim - valueAsNumber;
          break;
        default:
          throw Error("unknown direction");
      }

      return acc;
    },
    { aim: 0, x: 0, y: 0 }
  );

  return x * y;
}

function main() {
  const testInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "test-input.txt"), "utf8")
  );
  const realInput = parseInput(
    fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  );

  console.log("Test 1 is:", calculateMovements(testInput));
  assert(calculateMovements(testInput) === TEST_1_RESULT);
  console.log("Exercise 1 is:", calculateMovements(realInput));

  console.log("Test 2 is:", calculateMovementsWithAim(testInput));
  assert(calculateMovementsWithAim(testInput) === TEST_2_RESULT);
  console.log("Exercise 2 is:", calculateMovementsWithAim(realInput));
}

main();
