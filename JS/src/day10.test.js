const { test } = require("@jest/globals");
const { part1, part2 } = require("./day10");
const Input = require("./input");
const EXAMPLE_INPUT_1 = ["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."];
const EXAMPLE_INPUT_2 = [
  ".F----7F7F7F7F-7....",
  ".|F--7||||||||FJ....",
  ".||.FJ||||||||L7....",
  "FJL7L7LJLJ||LJ.L-7..",
  "L--J.L7...LJS7F-7L7.",
  "....F-J..F7FJ|L7L7L7",
  "....L7.F7||L7|.L7L7|",
  ".....|FJLJ|FJ|F7|.LJ",
  "....FJL-7.||.||||...",
  "....L---J.LJ.LJLJ...",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT_1)).toBe(8);
});

test("Part 1", () => {
  const input = new Input(10).fromLines().get();
  expect(part1(input)).toBe(7102);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT_2)).toBe(8);
});

test.skip("Part 2", () => {
  const input = new Input(10).fromLines().get();
  expect(part2(input)).toBe(0);
});
