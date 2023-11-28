const { test, describe } = require("@jest/globals");
const { part1, part2 } = require("./day01");
const Input = require("./input");
const EXAMPLE_INPUT = [0];

describe("Day 1", () => {
  describe("Part 1", () => {
    test("Example", () => {
      expect(part1(EXAMPLE_INPUT)).toBe(1);
    });

    // test("Actual", () => {
    //   const input = new Input(1).fromLines().asIntArray();
    //   expect(part1(input)).toBe(1);
    // });
  });

  describe("Part 2", () => {
    // test("Example", () => {
    //   expect(part2(EXAMPLE_INPUT)).toBe(1);
    // });
    // test("Actual", () => {
    //   const input = new Input(1).fromLines().asIntArray();
    //   expect(part2(input)).toBe(1);
    // });
  });
});
