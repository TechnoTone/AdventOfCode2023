module.exports.part1 = (input) => {
  const symbolCoordinates = this.getSymbolCoordinates(input);
  const partNumbers = this.getPartNumbers(input)
  return partNumbers.reduce((acc, partInformation) => {
    const surroundingCoordinates = this.getSurroundingCoordinates(partInformation);
    if (surroundingCoordinates.some((surroundingCoordinate) => symbolCoordinates.has(surroundingCoordinate))) {
      return partInformation.partNumber + acc;
    }
    return acc;
  }, 0)
};

module.exports.part2 = (input) => {
  const gearCoordinates = this.getSymbolCoordinates(input, true)
  const partNumbers = this.getPartNumbers(input);
  const partsByGear = partNumbers.reduce((acc, partInformation) => {
    const surroundingCoordinates = this.getSurroundingCoordinates(partInformation);
    surroundingCoordinates.forEach((surroundingCoordinate) => { 
      if (gearCoordinates.has(surroundingCoordinate)) {
        const currentValue = acc[surroundingCoordinate] || []  
        currentValue.push(partInformation.partNumber)
        acc[surroundingCoordinate] = currentValue;
      }
    })
    return acc;
  }, {});

  return Object.entries(partsByGear).reduce((acc, [_gearCoord, partNumbers]) => {
    if(partNumbers.length === 2) {
      return acc + partNumbers[0] * partNumbers[1]
    }
    return acc;
  }, 0)
}


module.exports.getSymbolCoordinates = (schematic, onlyGears) => {
  const results = new Set();
  
  schematic.forEach((row, rowIndex) => {
    const matcher = onlyGears ? /\*/g : /[^\d\.]/g 
    const matches = [...row.matchAll(matcher)]
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
