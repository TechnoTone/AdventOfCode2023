const { test, expect } = require("@jest/globals");
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

const EXAMPLE_INPUT_3 = [
  "LR",
  "",
  "11A = (11B, XXX)",
  "11B = (XXX, 11Z)",
  "11Z = (11B, XXX)",
  "22A = (22B, XXX)",
  "22B = (22C, 22C)",
  "22C = (22Z, 22Z)",
  "22Z = (22B, 22B)",
  "XXX = (XXX, XXX)",
]

test("Part 1 Example 1", () => {
  expect(part1(EXAMPLE_INPUT_1)).toBe(2);
});

test("Part 1 Example 2", () => {
  expect(part1(EXAMPLE_INPUT_2)).toBe(6);
});

test("Part 1", () => {
  const input = new Input(8).fromLines().get();
  expect(part1(input)).toBe(17287);
});

test("Part 1 dan", () => {
  const input = new Input(8, true).fromLines().get();
  expect(part1(input)).toBe(20221);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT_3)).toBe(6);
});

test("Part 2", () => {
  const input = new Input(8).fromLines().get();
  expect(part2(input)).toBe(18625484023687);
});

test("Part 2 dan", () => {
  const input = new Input(8, true).fromLines().get();
  expect(part2(input)).toBe(14616363770447);
});
