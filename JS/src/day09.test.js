const { test } = require("@jest/globals");
const { part1, part2 } = require("./day09");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "0 3 6 9 12 15",
  "1 3 6 10 15 21",
  "10 13 16 21 30 45",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(114);
});

test("Part 1", () => {
  const input = new Input(9).fromLines().get();
  expect(part1(input)).toBe(1641934234);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(2);
});

test("Part 2", () => {
  const input = new Input(9).fromLines().get();
  expect(part2(input)).toBe(975);
});
