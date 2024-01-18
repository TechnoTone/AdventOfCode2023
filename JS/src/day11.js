module.exports.part1 = (input) => {
  const { galaxyCoordinates, rowExpansions, columnExpansions } = getGalaxiesAndExpansions(input);

  const pairedGalaxies = getAllPairs(galaxyCoordinates);

  const galaxyDistances = pairedGalaxies.map((pair) => {
    return getExpansion(pair, rowExpansions, columnExpansions) + calculateDistance(pair)
  })

  return galaxyDistances.reduce((acc, distance) => acc + distance);
};

module.exports.part2 = (input) => {
  const { galaxyCoordinates, rowExpansions, columnExpansions } = getGalaxiesAndExpansions(input);

  const pairedGalaxies = getAllPairs(galaxyCoordinates);

  const galaxyDistances = pairedGalaxies.map((pair) => {
    return getExpansion(pair, rowExpansions, columnExpansions, 1000000) + calculateDistance(pair)
  })

  return galaxyDistances.reduce((acc, distance) => acc + distance);
};

function getGalaxiesAndExpansions(input) {
  // find and map galaxies coordinates
  const { galaxyCoordinates, rowExpansions } = input.reduce((acc, row, yIndex) => {
    const coordinates = [...row.matchAll(/#/g)].map((match) => [match.index, yIndex])
    if (coordinates.length === 0) {
      acc.rowExpansions.push(yIndex)
    } else {
      acc.galaxyCoordinates.push(...coordinates)
    }
    return acc
  }, {
    galaxyCoordinates: [],
    rowExpansions: []
  });

  // find columns to expand
  const columnExpansions = input[0].split("").reduce((acc, _, columnIndex) => {
    if (galaxyCoordinates.every(([x]) => x !== columnIndex)) {
      acc.push(columnIndex)
    }
    return acc
  }, []);

  return { galaxyCoordinates, rowExpansions, columnExpansions }
}

function getExpansion([[ax, ay], [bx, by]], rowExpansions, columnExpansions, factor = 2) {
  return columnExpansions.filter((column) => inRange(column, [ax, bx])).length * (factor - 1)
    + rowExpansions.filter((row) => inRange(row, [ay, by])).length * (factor - 1);
};

function inRange(expansion, [a, b]) {
  return (expansion > Math.min(a, b) && expansion < Math.max(a, b))
}

function calculateDistance([[ax, ay], [bx, by]]) {
  return Math.abs(ax - bx) + Math.abs(ay - by);
};

function getAllPairs(list) {
  return list.reduce((acc, item, index) => {
    for (let i = index + 1; i < list.length; i++) {
      acc.push([item, list[i]]);
    }
    return acc
  }, []);
};
