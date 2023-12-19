module.exports.part1 = (input) => {

  // get the seeds
  const [seedsLine, ...mappingStrings] = input.split(/\r?\n\r?\n/);
  const seeds = seedsLine.split(": ")[1].split(" ").map(Number);

  return processSeeds(seeds, mappingStrings)
};

function processSeeds(seeds, mappingStrings) {
  // read all maps
  const mappingTables = mappingStrings.map((mapping) => readMapping(mapping))

  // pipe seeds through the maps
  const x = seeds.map((seed) => {
    return mappingTables.reduce((acc1, mappingTable) => {
      const validMappings = mappingTable.filter(({ start, end }) => inRange(acc1, start, end))
      return validMappings.reduce((acc2, { transformer }) => transformer + acc2, acc1)
    }, seed)
  })
  // get the smallest location

  return Math.min(...x);
}

function inRange(seed, start, end) {
  return seed >= start && seed <= end

}

function readMapping(mapping) {
  const [_, ...rangesString] = mapping.split(/\r?\n/)
  const ranges = rangesString.map((rangeLine) => {
    return rangeLine.split(" ").map(Number);
  })
  const parsedMapping = ranges.map((range) => {
    return {
      start: range[1],
      end: range[1] + range[2] - 1,
      transformer: range[0] - range[1],
    }
  })
  return parsedMapping.toSorted((a, b) => a.start - b.start);
}

module.exports.part2 = (input) => {
  // get the seeds
  const [seedsLine, ...mappingStrings] = input.split(/\r?\n\r?\n/);
  const seedNumbers = seedsLine.split(": ")[1].split(" ").map(Number);
  const seedRanges = []
  for (let i = 0; i < seedNumbers.length; i += 2) {
    seedRanges.push({ start: seedNumbers[i], end: seedNumbers[i] + seedNumbers[i + 1] - 1 })
  }

  // read all maps
  const mappingTables = mappingStrings.map((mapping) => readMapping(mapping))

  const singleSeed = seedRanges[0];

  // apply transforms to seed ranges and split where needed
  const allRanges = mappingTables.reduce((acc, mappingTable) => this.chunkRanges(acc, mappingTable), [singleSeed])

  const [result] = allRanges.map((range) => range.start).toSorted();

  return result
};

module.exports.applyTransforms = (chunks, mappingTable) => {
  return chunks.map((chunk) => {
    const intersectsWith = mappingTable.find((mapTransformation) =>
      this.getIntersection(chunk, mapTransformation) === this.INTERSECTION_TYPES.INSIDE
    )
    return intersectsWith ? { start: chunk.start + intersectsWith.transformer, end: chunk.end + intersectsWith.transformer } : chunk
  })
}

module.exports.chunkRanges = (ranges, mappingTable) => {
  const chunks = ranges.map((range) => this.chunkRange(range, mappingTable)).flat();
  const transformed = this.applyTransforms(chunks, mappingTable)
  console.log({ mappingTable, ranges, chunks, transformed })
  return transformed
}

module.exports.chunkRange = (mappedRange, mappingTable) => {
  //check seed range against mapping table
  const intersectsWith = mappingTable.find((mapTransformation) => {
    const intersection = this.getIntersection(mappedRange, mapTransformation);
    return intersection != this.INTERSECTION_TYPES.NONE && intersection != this.INTERSECTION_TYPES.INSIDE;
  })

  const chunks = []

  if (intersectsWith) {
    const intersection = this.getIntersection(mappedRange, intersectsWith);
    switch (intersection) {
      case this.INTERSECTION_TYPES.LEFT:
        chunks.push({ start: mappedRange.start, end: intersectsWith.start - 1 }, { start: intersectsWith.start, end: mappedRange.end })
        break
      case this.INTERSECTION_TYPES.RIGHT:
        chunks.push({ start: mappedRange.start, end: intersectsWith.end }, { start: intersectsWith.end + 1, end: mappedRange.end })
        break
      case this.INTERSECTION_TYPES.BOTH:
        chunks.push({ start: mappedRange.start, end: intersectsWith.start - 1 }, { start: intersectsWith.start, end: intersectsWith.end }, { start: intersectsWith.end + 1, end: mappedRange.end })
        break
    }

    return chunks.map((chunk) => this.chunkRange(chunk, mappingTable)).flat()
  } else {
    return [mappedRange];
  }

}

module.exports.rangeInMapTransformation = (range, mapTransformation) => {

}

module.exports.INTERSECTION_TYPES = {
  NONE: 'none', // range is entirely before or entirely after transformation range 
  INSIDE: 'inside', // range is entirely encompassed by transformation range
  LEFT: 'left', // range overlaps transformation range at the start
  RIGHT: 'right', // range overlaps in transformation range at the end
  BOTH: 'both', // range overlaps transformation range at the start and end
}

module.exports.getIntersection = (range, mapTransformation) => {
  if (range.start >= mapTransformation.start && range.end <= mapTransformation.end) {
    return this.INTERSECTION_TYPES.INSIDE;
  } else if (range.start < mapTransformation.start && range.end > mapTransformation.end) {
    return this.INTERSECTION_TYPES.BOTH
  } else if (range.start < mapTransformation.start && range.end >= mapTransformation.start) {
    return this.INTERSECTION_TYPES.LEFT;
  } else if (range.start <= mapTransformation.end && range.end > mapTransformation.end) {
    return this.INTERSECTION_TYPES.RIGHT;
  }
  return this.INTERSECTION_TYPES.NONE;
}

// Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
// Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
// Seed 55, soil 57, fertilizer 57, water 53, light 46, temperature 82, humidity 82, location 86.
// Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35.
