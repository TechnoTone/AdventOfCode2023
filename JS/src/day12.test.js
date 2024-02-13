const { test } = require("@jest/globals");
const { part1, part2 } = require("./day12");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "???.### 1,1,3",
  ".??..??...?##. 1,1,3",
  "?#?#?#?#?#?#?#? 1,3,1,6",
  "????.#...#... 4,1,1",
  "????.######..#####. 1,6,5",
  "?###???????? 3,2,1",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(21);
});

test("Part 1", () => {
  const input = new Input(12).fromLines().get();
  expect(part1(input)).toBe(7732);
});

test("Part 1 Dan", () => {
  const input = new Input(12, true).fromLines().get();
  expect(part1(input)).toBe(7857);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(525152);
});

test("Part 2", () => {
  const input = new Input(12).fromLines().get();
  expect(part2(input)).toBe(4500070301581);
});

test("Part 2 Dan", () => {
  const input = new Input(12, true).fromLines().get();
  expect(part2(input)).toBe(28606137449920);
});
