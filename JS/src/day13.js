module.exports.part1 = (input) => {
  const patterns = parsePatterns(input);

  const reflections = patterns.map((pattern) => {
    return getScore(pattern)
  })

  return reflections.reduce((acc, reflection) => acc + reflection);
};

function getScore({ columns, rows }) {
  const horizontalReflection = findReflectionPoint(rows) * 100;
  const verticalReflection = findReflectionPoint(columns);
  return isNaN(horizontalReflection) ? verticalReflection : horizontalReflection;
}

function findReflectionPoint(lines) {
  const midPoint = (lines.length - 1) / 2
  const possibleCombinations = [];

  for (i = 0; i < midPoint; i++) {
    possibleCombinations.push([midPoint - i - 1, midPoint - i])
    possibleCombinations.push([midPoint + i, midPoint + i + 1])
  }

  const reflectionPoint =
    possibleCombinations.find(([lowIndex, highIndex]) => isReflectionPoint(lines, lowIndex, highIndex))

  return reflectionPoint?.[1]
}

function isReflectionPoint(lines, lowIndex, highIndex) {
  if (lines[lowIndex] === lines[highIndex]) {
    if (lowIndex === 0 || highIndex === lines.length - 1) {
      return true;
    }
    return isReflectionPoint(lines, lowIndex - 1, highIndex + 1)
  } else {
    return false
  }
}

function parsePatterns(input) {
  input.unshift('')
  return input.reduce((acc, row) => {
    if (row === "") {
      acc.push({ rows: [], columns: [] })
    } else {
      const { rows, columns } = acc.at(-1)
      rows.push(row)
      if (columns.length === 0) {
        columns.push(...row.split(""))
      } else {
        row.split("").forEach((element, index) => {
          columns[index] += element
        });
      }
    }
    return acc;
  }, [])
}

module.exports.part2 = (input) => {
  const patterns = parsePatterns(input);

  const reflections = patterns.map((pattern) => {
    const { columns, rows } = pattern;
    const original = getScore(pattern);

    for (columnIx = 0; columnIx < columns.length; columnIx++) {
      for (rowIx = 0; rowIx < rows.length; rowIx++) {
        const smudgedScore = getSmudgeScore(pattern, [columnIx, rowIx])
        if (smudgedScore !== original) return smudgedScore;
      }
    }
    throw new Error('No smudged score found')
  })

  return reflections.reduce((acc, reflection) => acc + reflection);
};

function getSmudgeScore({ columns, rows }, [smudgeColumn, smudgeRow]) {
  const horizontalReflection = findReflectionPointWithSmudge(rows, smudgeRow, smudgeColumn) * 100;
  const verticalReflection = findReflectionPointWithSmudge(columns, smudgeColumn, smudgeRow);

  return isNaN(horizontalReflection) ? verticalReflection : horizontalReflection;
}

function findReflectionPointWithSmudge(lines, smudgeLine, smudgeChar) {
  const midPoint = (lines.length - 1) / 2
  const possibleCombinations = [];

  for (i = 0; i < midPoint; i++) {
    possibleCombinations.push([midPoint - i - 1, midPoint - i])
    possibleCombinations.push([midPoint + i, midPoint + i + 1])
  }

  const reflectionPoint =
    possibleCombinations.find(([lowIndex, highIndex]) => isReflectionPointWithSmudge(lines, lowIndex, highIndex, smudgeLine, smudgeChar))

  return reflectionPoint?.[1]
}

// how we implement? need to adapt comparison to use extra vars
function isReflectionPointWithSmudge(lines, lowIndex, highIndex, smudgeLineIx, smudgeCharIx) {
  const low = smudgeLine(lines, lowIndex, smudgeLineIx, smudgeCharIx)
  const high = smudgeLine(lines, highIndex, smudgeLineIx, smudgeCharIx)

  if (low === high) {
    if (lowIndex === 0 || highIndex === lines.length - 1) {
      return true;
    }
    return isReflectionPointWithSmudge(lines, lowIndex - 1, highIndex + 1, smudgeLineIx, smudgeCharIx)
  } else {
    return false;
  }
}

function smudgeLine(lines, index, smudgeLine, smudgeCharIx) {
  const line = lines[index];
  if (index === smudgeLine) {
    const beforeSmudge = line.slice(0, smudgeCharIx);
    const smudgeChar = line.at(smudgeCharIx)
    const afterSmudge = line.slice(smudgeCharIx + 1)

    return beforeSmudge + smudgeCorrections[smudgeChar] + afterSmudge;
  } else {
    return line;
  }
}

const smudgeCorrections = {
  '.': '#',
  '#': '.'
}
