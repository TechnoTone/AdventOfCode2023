module.exports.part1 = (input) => {
  const patterns = parsePatterns(input);
  const reflections = patterns.map((pattern) => {
    return getScores(pattern)[0]
  })

  return reflections.reduce((acc, reflection) => acc + reflection, 0);
};

function getScores({ columns, rows }, allowSmudge = false) {
  const horizontalReflections = findReflectionPoints(rows, allowSmudge);
  const verticalReflections = findReflectionPoints(columns, allowSmudge);

  const scoredHorizontals = horizontalReflections.map((reflection) => reflection * 100)

  return [verticalReflections, scoredHorizontals].flat();
}

function findReflectionPoints(lines, allowSmudge) {
  const reflectionPoints = [];
  for (i = 0; i < lines.length - 1; i++) {
    if (isReflectionPoint(lines, i, i + 1, allowSmudge)) {
      reflectionPoints.push(i + 1);
    }
  }
  return reflectionPoints;
}

function isReflectionPoint(lines, lowIndex, highIndex, allowSmudge) {
  if (lines[lowIndex] === lines[highIndex]) {
    if (lowIndex === 0 || highIndex === lines.length - 1) {
      return true;
    }
    return isReflectionPoint(lines, lowIndex - 1, highIndex + 1, allowSmudge)
  } else {
    if (allowSmudge) {
      if (smudgeCount(lines[lowIndex], lines[highIndex]) === 1) {
        if (lowIndex === 0 || highIndex === lines.length - 1) {
          return true;
        }
        return isReflectionPoint(lines, lowIndex - 1, highIndex + 1, false)
      }
    }
    return false
  }
}

function smudgeCount(lineA, lineB) {
  if (lineA.length === 0)
    return 0;
  if (lineA[0] === lineB[0]) {
    return smudgeCount(lineA.slice(1), lineB.slice(1))
  } else {
    return smudgeCount(lineA.slice(1), lineB.slice(1)) + 1
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
  console.log(input)
  const patterns = parsePatterns(input);
  console.log(patterns.length)
  const reflections = patterns.map((pattern) => {
    const original = getScores(pattern)[0];
    const newAndOriginal = getScores(pattern, true);
    return newAndOriginal;
  })

  return reflections;
};
