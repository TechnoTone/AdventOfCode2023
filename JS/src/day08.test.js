const { test } = require("@jest/globals");
const { part1, part2 } = require("./day08");
const Input = require("./input");
const EXAMPLE_INPUT_1 = [
  "RL",
  "",
  "AAA = (BBB, CCC)",
  "BBB = (DDD, EEE)",
  "CCC = (ZZZ, GGG)",
  "DDD = (DDD, DDD)",
  "EEE = (EEE, EEE)",
  "GGG = (GGG, GGG)",
  "ZZZ = (ZZZ, ZZZ)",
];
const EXAMPLE_INPUT_2 = [
  "LLR",
  "",
  "AAA = (BBB, BBB)",
  "BBB = (AAA, ZZZ)",
  "ZZZ = (ZZZ, ZZZ)",
];

test("Part 1 Example 1", () => {
  expect(part1(EXAMPLE_INPUT_1)).toBe(2);
});

test("Part 1 Example 2", () => {
  expect(part1(EXAMPLE_INPUT_2)).toBe(6);
});

test.skip("Part 1", () => {
  const input = new Input(8).fromLines().get();
  expect(part1(input)).toBe(0);
});

test.skip("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT_1)).toBe(0);
});

test.skip("Part 2", () => {
  const input = new Input(8).fromLines().get();
  expect(part2(input)).toBe(0);
});
