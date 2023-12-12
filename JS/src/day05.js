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
      const validMappings =  mappingTable.filter(({start, length}) => inRange(acc1, start, length))
      return validMappings.reduce((acc2, {transformer}) => transformer + acc2, acc1)
    }, seed)
  })
  // get the smallest location

  return Math.min(...x);
}

function inRange(seed, start, length) {
  return seed >= start && seed <= start + length -1
    
}

function readMapping(mapping) {
  const [_, ...rangesString] = mapping.split(/\r?\n/)
  const ranges = rangesString.map((rangeLine) => {
    return rangeLine.split(" ").map(Number);
  }) 
  const parsedMapping = ranges.map((range) =>  {
    return { 
      start: range[1],
      length: range[2],
      transformer: range[0] - range[1],
    }
  })
  return parsedMapping;
}

module.exports.part2 = (input) => {
  // get the seeds
  const [seedsLine, ...mappingStrings] = input.split(/\r?\n\r?\n/);
  const seedNumbers = seedsLine.split(": ")[1].split(" ").map(Number);
  const seedRanges = []
  for(let i = 0; i < seedNumbers.length; i+=2) {
    seedRanges.push({start: seedNumbers[i], length: seedNumbers[i+1]})
  } 

  // read all maps
  const mappingTables = mappingStrings.map((mapping) => readMapping(mapping))

  // check seed range vs mapping range
  mappingTables.forEach((mappingTable) => {
    mappingTable.forEach(() => {

    })
  })

  function chunkRange(mappedRange, mappingTable) {
    //check seed range against mapping table
    mappingTable.find((mapping) => {
      mapping.start < mappedRange.start && mapping.start + mapping.length -1 >= mappedRange.start + mappedRange.length - 1
    })
    
    //split into required no ranges
    //apply current mapping
    //for each required range call x with index
  }


  // apply transforms to seed ranges and split where needed

  
  return seedRanges
  // return processSeeds(seeds, mappingStrings);
};

// Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
// Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
// Seed 55, soil 57, fertilizer 57, water 53, light 46, temperature 82, humidity 82, location 86.
// Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35.
