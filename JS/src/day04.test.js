const { test } = require("@jest/globals");
const { part1, part2, getCardScore } = require("./day04");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
];

test("getCardScore", () => {
  expect(
    getCardScore("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53")
  ).toEqual(8);
});

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(13);
});

test("Part 1", () => {
  const input = new Input(4).fromLines().get();
  expect(part1(input)).toBe(25174);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(30);
});

test("Part 2", () => {
  const input = new Input(4).fromLines().get();
  expect(part2(input)).toBe(6420979);
});
