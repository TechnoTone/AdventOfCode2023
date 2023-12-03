const { test } = require("@jest/globals");
const { part1, part2 } = require("./day02");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(8);
});

test.skip("Part 1", () => {
  const input = new Input(2).fromLines().get();
  expect(part1(input)).toBe(0);
});

test.skip("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(0);
});

test.skip("Part 2", () => {
  const input = new Input(2).fromLines().get();
  expect(part2(input)).toBe(0);
});
