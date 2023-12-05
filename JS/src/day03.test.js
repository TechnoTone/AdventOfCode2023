const { test, describe, expect } = require("@jest/globals");
const { part1, part2, getSymbolCoordinates, getPartNumbers, getSurroundingCoordinates } = require("./day03");
const Input = require("./input");
const EXAMPLE_INPUT = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.58.',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..'
];

test('getSymbolCoordinates', () => {
  expect(getSymbolCoordinates(EXAMPLE_INPUT)).toEqual(new Set([1003, 3006, 4003, 5005, 8003, 8005]))
})

test('getPartNumbers', () => {
  const sut = getPartNumbers(EXAMPLE_INPUT);
  expect(sut[0]).toEqual({partNumber: 467, coordinate: 0, length: 3 });
  expect(sut[2]).toEqual({partNumber: 35, coordinate: 2002, length: 2 })
  expect(sut[9]).toEqual({partNumber: 598, coordinate: 9005, length: 3})
})

test('getSurroundingCoordinates', () => {
  const sut = getSurroundingCoordinates({partNumber: 35, coordinate: 2002, length: 2 });
  expect(sut).toContain([1001,1002,1003,1004,2001,2004,3001,3002,3003,3004]);
})

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(4361);
});

test.skip("Part 1", () => {
  const input = new Input(3).fromLines().get();
  expect(part1(input)).toBe(0);
});

test.skip("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(0);
});

test.skip("Part 2", () => {
  const input = new Input(3).fromLines().get();
  expect(part2(input)).toBe(0);
});
