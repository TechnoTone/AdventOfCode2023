const { test } = require("@jest/globals");
const { part1, part2 } = require("./day11");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "...#......",
  ".......#..",
  "#.........",
  "..........",
  "......#...",
  ".#........",
  ".........#",
  "..........",
  ".......#..",
  "#...#.....",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(374);
});

test.skip("Part 1", () => {
  const input = new Input(11).fromLines().get();
  expect(part1(input)).toBe(0);
});

test.skip("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(0);
});

test.skip("Part 2", () => {
  const input = new Input(11).fromLines().get();
  expect(part2(input)).toBe(0);
});
