const { test } = require("@jest/globals");
const { part1, part2 } = require("./day07");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "32T3K 765",
  "T55J5 684",
  "KK677 28",
  "KTJJT 220",
  "QQQJA 483",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(6440);
});

test("Part 1", () => {
  const input = new Input(7).fromLines().get();
  expect(part1(input)).toBe(253954294);
});

test("Part 1 dan", () => {
  const input = new Input(7, true).fromLines().get();
  expect(part1(input)).toBe(252656917);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(5905);
});

test("Part 2", () => {
  const input = new Input(7).fromLines().get();
  expect(part2(input)).toBe(254837398);
});

test.skip("Part 2 dan", () => {
  const input = new Input(7, true).fromLines().get();
  expect(part2(input)).toBe(0);
});
