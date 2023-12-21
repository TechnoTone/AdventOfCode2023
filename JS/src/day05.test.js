const { test, describe, expect } = require("@jest/globals");
const {
  part1,
  part2,
  getIntersection,
  INTERSECTION_TYPES,
  chunkRange,
  applyTransforms,
} = require("./day05");
const Input = require("./input");
const EXAMPLE_INPUT = `seeds: 79 14 55 13

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

test("Part 1 dan", () => {
  const input = new Input(5, true).get();
  expect(part1(input)).toBe(462648396);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(46);
});

test("Part 2", () => {
  const input = new Input(5).get();
  expect(part2(input)).toBe(1240035);
});

test("Part 2 dan", () => {
  const input = new Input(5, true).get();
  expect(part2(input)).toBe(2520479);
});

describe("getIntersection", () => {
  const mapTransformation = { start: 10, end: 20, transformer: 10 };
  test("returns NONE when there is no intersection", () => {
    const rangeBefore = { start: 2, end: 4 };
    const rangeAfter = { start: 50, end: 51 };
    expect(getIntersection(rangeBefore, mapTransformation)).toBe(
      INTERSECTION_TYPES.NONE
    );
    expect(getIntersection(rangeAfter, mapTransformation)).toBe(
      INTERSECTION_TYPES.NONE
    );
  });

  test("returns INSIDE when the range is within the mapTransform range", () => {
    const range = { start: 11, end: 19 };
    expect(getIntersection(range, mapTransformation)).toBe(
      INTERSECTION_TYPES.INSIDE
    );
  });

  test("returns BOTH when the range overlaps the start and the end of the mapTransform range", () => {
    const range = { start: 5, end: 25 };
    expect(getIntersection(range, mapTransformation)).toBe(
      INTERSECTION_TYPES.BOTH
    );
  });

  test("returns LEFT when the range overlaps the start  the mapTransform range", () => {
    const range = { start: 5, end: 15 };
    expect(getIntersection(range, mapTransformation)).toBe(
      INTERSECTION_TYPES.LEFT
    );
  });

  test("returns RIGHT when the range overlaps the end of the mapTransform range", () => {
    const range = { start: 15, end: 25 };
    expect(getIntersection(range, mapTransformation)).toBe(
      INTERSECTION_TYPES.RIGHT
    );
  });
});

const mappingTable = [
  {
    start: 5,
    end: 10,
    transformer: 5,
  },
  {
    start: 11,
    end: 20,
    transformer: 9,
  },
  {
    start: 25,
    end: 30,
    transformer: -12,
  },
];

describe("chunkRange", () => {
  test("remains in one chunk if no ranges in the mapping table intersect", () => {
    const range = { start: 100, end: 200 };
    expect(chunkRange(range, mappingTable)).toStrictEqual([range]);
  });

  test("remains the same if it is INSIDE one of the mappings", () => {
    const range = { start: 6, end: 9 };
    expect(chunkRange(range, mappingTable)).toStrictEqual([range]);
  });

  test("splits the range in 2 where there as a LEFT overlap", () => {
    const range = { start: 2, end: 7 };
    expect(chunkRange(range, mappingTable)).toStrictEqual([
      { start: 2, end: 4 },
      { start: 5, end: 7 },
    ]);
  });
  test("splits the range in 2 where there as a RIGHT overlap", () => {
    const range = { start: 27, end: 37 };
    expect(chunkRange(range, mappingTable)).toStrictEqual([
      { start: 27, end: 30 },
      { start: 31, end: 37 },
    ]);
  });

  test("splits the range in to 3 when there are BOTH LEFT AND RIGHT overlaps on a single mapTransformation", () => {
    const range = { start: 22, end: 33 };
    expect(chunkRange(range, mappingTable)).toStrictEqual([
      { start: 22, end: 24 },
      { start: 25, end: 30 },
      { start: 31, end: 33 },
    ]);
  });

  test("splits the range in 2 when the range spans 2 adjacent mapTransformations", () => {
    const range = { start: 6, end: 19 };
    expect(chunkRange(range, mappingTable)).toStrictEqual([
      { start: 6, end: 10 },
      { start: 11, end: 19 },
    ]);
  });

  test("splits the range in 3 when the range spans 2 mapTransformations with a gap", () => {
    const range = { start: 15, end: 27 };
    expect(chunkRange(range, mappingTable)).toStrictEqual([
      { start: 15, end: 20 },
      { start: 21, end: 24 },
      { start: 25, end: 27 },
    ]);
  });

  test("splits the range in to 6 chunks when the the range spans across 3 ranges where 2 are adjacent and one of those is close to another", () => {
    const range = { start: 2, end: 35 };
    expect(chunkRange(range, mappingTable)).toStrictEqual([
      { start: 2, end: 4 },
      { start: 5, end: 10 },
      { start: 11, end: 20 },
      { start: 21, end: 24 },
      { start: 25, end: 30 },
      { start: 31, end: 35 },
    ]);
  });
});

test("applyTransforms", () => {
  const chunks = [
    { start: 2, end: 4 },
    { start: 5, end: 10 },
    { start: 11, end: 20 },
    { start: 21, end: 24 },
    { start: 25, end: 30 },
    { start: 31, end: 35 },
  ];
  expect(applyTransforms(chunks, mappingTable)).toStrictEqual([
    { start: 2, end: 4 },
    { start: 10, end: 15 },
    { start: 20, end: 29 },
    { start: 21, end: 24 },
    { start: 13, end: 18 },
    { start: 31, end: 35 },
  ]);
});
