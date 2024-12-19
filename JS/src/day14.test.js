const { test } = require("@jest/globals");
const { part1, part2 } = require("./day14");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "O....#....",
  "O.OO#....#",
  ".....##...",
  "OO.#O....O",
  ".O.....O#.",
  "O.#..O.#.#",
  "..O..#O..O",
  ".......O..",
  "#....###..",
  "#OO..#....",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(136);
});

test("Part 1", () => {
  const input = new Input(14).fromLines().get();
  expect(part1(input)).toBe(108144);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(64);
});

test("Part 2", () => {
  const input = new Input(14).fromLines().get();
  expect(part2(input)).toBe(108404);
});
