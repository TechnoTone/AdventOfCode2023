const { test, describe, expect } = require("@jest/globals");
const { part1, part2, getIntersection, INTERSECTION_TYPES, rangeInMapTransformation } = require("./day05");
const Input = require("./input");
const EXAMPLE_INPUT = 
`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(35);
});

test("Part 1", () => {
  const input = new Input(5).get();
  expect(part1(input)).toBe(650599855);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(46);
});

test("Part 2", () => {
  const input = new Input(5).get();
  expect(part2(input)).toBe(0);
});

describe("getIntersection", () => {
  const mapTransformation = {start: 10, end: 20, transformer: 10}
  test("returns NONE when there is no intersection", () => {
    const rangeBefore = {start: 2, end: 4};
    const rangeAfter = { start: 50, end: 51};
    expect(getIntersection(rangeBefore, mapTransformation)).toBe(INTERSECTION_TYPES.NONE);
    expect(getIntersection(rangeAfter, mapTransformation)).toBe(INTERSECTION_TYPES.NONE);
  })

  test("returns INSIDE when the range is within the mapTransform range", () => {
    const range = {start: 11, end: 19};
    expect(getIntersection(range, mapTransformation)).toBe(INTERSECTION_TYPES.INSIDE)
  })

  test("returns BOTH when the range overlaps the start and the end of the mapTransform range", () => {
    const range = {start: 5, end: 25};
    expect(getIntersection(range, mapTransformation)).toBe(INTERSECTION_TYPES.BOTH)
  })

  test("returns LEFT when the range overlaps the start  the mapTransform range", () => {
    const range = {start: 5, end: 15};
    expect(getIntersection(range, mapTransformation)).toBe(INTERSECTION_TYPES.LEFT)
  })

  test("returns RIGHT when the range overlaps the end of the mapTransform range", () => {
    const range = {start: 15, end: 25};
    expect(getIntersection(range, mapTransformation)).toBe(INTERSECTION_TYPES.RIGHT)
  })

})
