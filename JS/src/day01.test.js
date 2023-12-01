const { test } = require("@jest/globals");
const { part1, part2, calibrationValue2 } = require("./day01");
const Input = require("./input");
const EXAMPLE_INPUT_1 = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
const EXAMPLE_INPUT_2 = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

test("calibrationValue", () => {
  expect(calibrationValue2("fiveight")).toBe(58);
});

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT_1)).toBe(142);
});

test("Part 1", () => {
  const input = new Input(1).fromLines().get();
  expect(part1(input)).toBe(54573);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT_2)).toBe(281);
});

test("Part 2", () => {
  const input = new Input(1).fromLines().get();
  expect(part2(input)).toBe(54623);
});
