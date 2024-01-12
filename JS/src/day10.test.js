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
const EXAMPLE_INPUT_3 = [
  "FF7FSF7F7F7F7F7F---7",
  "L|LJ||||||||||||F--J",
  "FL-7LJLJ||||||LJL-77",
  "F--JF--7||LJLJ7F7FJ-",
  "L---JF-JLJ.||-FJLJJ7",
  "|F|F-JF---7F7-L7L|7|",
  "|FFJF7L7F-JF7|JL---7",
  "7-L-JL7||F7|L7F-7F7|",
  "L.L7LFJ|||||FJL7||LJ",
  "L7JLJL-JLJLJL--JLJ.L",
];

test("Part 1 Example 1", () => {
  expect(part1(EXAMPLE_INPUT_1)).toBe(8);
});

test("Part 1", () => {
  const input = new Input(10).fromLines().get();
  expect(part1(input)).toBe(7102);
});

test("Part 2 Example 2", () => {
  expect(part2(EXAMPLE_INPUT_2)).toBe(8);
});

test("Part 2 Example 3", () => {
  expect(part2(EXAMPLE_INPUT_3)).toBe(10);
});

test("Part 2", () => {
  const input = new Input(10).fromLines().get();
  expect(part2(input)).toBeGreaterThan(358);
  expect(part2(input)).toBeLessThan(1797);
});

//F7L-|-LL|F--7|L7FJS7FJLJJ||||L-7L---7F-7|F7L--JLJL-JLJ|FJ|F----JFF--7||7J.7L|-F|-LFJ|7L---7L7.LJLJLJF|||F--7LJFJL7||F7|F---7LJL--J|LJJ..L77J
//OOOOOOOO|F--7|L7FJ7FJLJI||||L-7L---7F-7|F7L--JLJL-JLJ|FJ|F----JOF--7||OOOOOOOOOOOFJ|OL---7L7OLJLJLJO|||F--7LJFJL7||F7|F---7LJL--J|IIIIIIIII
