module.exports.part1 = (input) => {
  return 0;
};

module.exports.getSymbolCoordinates = (schematic) => {
  const results = new Set();
  
  schematic.forEach((row, rowIndex) => { 
    const matches = [...row.matchAll(/[^\d\.]/g)]
    matches.forEach((match) => {
      results.add(match.index + rowIndex * 1000)
    })
  });

  return results;
}

module.exports.getPartNumbers = (schematic) => {
  const partInformation = [];
  schematic.forEach((row, rowIndex) => {
    const matches = [...row.matchAll(/\d+/g)]
    matches.forEach((match) => {
      partInformation.push({partNumber: +match[0], coordinate: match.index + rowIndex * 1000, length: match[0].length})
    })
  })
  return partInformation;
} 

module.exports.getSurroundingCoordinates = (partInformation) => {
  const surroundingCoordinate = []

  const {coordinate, length} = partInformation;

  const leftOf = coordinate -1; // no need to worry about edges because of genius system 
  const rightOf = coordinate + length;
  for(i=leftOf;i<=rightOf;i++) {
    surroundingCoordinate.push(i-1000, i+1000)
  }
  surroundingCoordinate.push(leftOf, rightOf)

  return surroundingCoordinate;
} 

module.exports.part2 = (input) => {
  return 0;
};
