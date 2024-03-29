const { test } = require("@jest/globals");
const { part1, part2 } = require("./day13");
const Input = require("./input");
const EXAMPLE_INPUT =
  ["#.##..##.",
    "..#.##.#.",
    "##......#",
    "##......#",
    "..#.##.#.",
    "..##..##.",
    "#.#.##.#.",
    "",
    "#...##..#",
    "#....#..#",
    "..##..###",
    "#####.##.",
    "#####.##.",
    "..##..###",
    "#....#..#",
  ];


test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(405);
});

test("Part 1", () => {
  const input = new Input(13).fromLines().get();
  expect(part1(input)).toBe(28651);
});

test("Part 1 Dan", () => {
  const input = new Input(13, true).fromLines().get();
  expect(part1(input)).toBe(30518);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(400);
});

test("Part 2", () => {
  const input = new Input(13).fromLines().get();
  expect(part2(input)).toBe(25450);
});

test("Part 2 Dan", () => {
  const input = new Input(13, true).fromLines().get();
  expect(part2(input)).toBe(36735);
});
