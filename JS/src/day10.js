const { ignoreErrors } = require("./utils");

const DIRECTION = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

module.exports.part1 = (input) => {
  return getPipeCoordinates(input).length / 2;
};

module.exports.part2 = (input) => {
  const pipeCoordinates = getPipeCoordinates(input);
  const cleanMap = new Array(input.length)
    .fill()
    .map(() => new Array(input[0].length).fill("."));
  pipeCoordinates.forEach(([x, y]) => (cleanMap[y][x] = input[y][x]));

  replaceStartPipeWithPipeCharacter(cleanMap, pipeCoordinates);

  return countInsideCoordinates(cleanMap);
};

const directionTransforms = {
  [DIRECTION.DOWN]: {
    "|": DIRECTION.DOWN,
    L: DIRECTION.RIGHT,
    J: DIRECTION.LEFT,
  },
  [DIRECTION.UP]: {
    "|": DIRECTION.UP,
    F: DIRECTION.RIGHT,
    7: DIRECTION.LEFT,
  },
  [DIRECTION.LEFT]: {
    "-": DIRECTION.LEFT,
    F: DIRECTION.DOWN,
    L: DIRECTION.UP,
  },
  [DIRECTION.RIGHT]: {
    "-": DIRECTION.RIGHT,
    7: DIRECTION.DOWN,
    J: DIRECTION.UP,
  },
};

const coordinateTransforms = {
  [DIRECTION.DOWN]: ([x, y]) => [x, y + 1],
  [DIRECTION.UP]: ([x, y]) => [x, y - 1],
  [DIRECTION.LEFT]: ([x, y]) => [x - 1, y],
  [DIRECTION.RIGHT]: ([x, y]) => [x + 1, y],
};

function getStartCoordinates(input) {
  const startY = input.findIndex((row) => row.includes("S"));
  return [input[startY].indexOf("S"), startY];
}

function getPipeCoordinates(input) {
  const getPipeAt = ignoreErrors((x, y) => input[y][x]);
  let [x, y] = getStartCoordinates(input);

  let previousDirection = null;
  const coordinates = [];

  //handle start
  coordinates.push([x, y]);
  if ("|F7".includes(getPipeAt(x, y - 1))) {
    previousDirection = DIRECTION.UP;
    y--;
  } else if ("|JL".includes(getPipeAt(x, y + 1))) {
    previousDirection = DIRECTION.DOWN;
    y++;
  } else if ("-FL".includes(getPipeAt(x - 1, y))) {
    previousDirection = DIRECTION.LEFT;
    x--;
  } else if ("-J7".includes(getPipeAt(x + 1, y))) {
    previousDirection = DIRECTION.RIGHT;
    x++;
  }

  let currentPipe = getPipeAt(x, y);
  while (currentPipe !== "S") {
    coordinates.push([x, y]);
    const newDirection = directionTransforms[previousDirection][currentPipe];

    if (!!newDirection) {
      previousDirection = newDirection;
      [x, y] = coordinateTransforms[previousDirection]([x, y]);
      currentPipe = getPipeAt(x, y);
    } else {
      throw new Error(`Unknown pipe ${pipe} at (${x}, ${y})`);
    }
  }
  return coordinates;
}

function countInsideCoordinates(input) {
  const total = input.reduce((acc, row) => {
    let isInside = false;
    let lastCorner = null;
    for (let x = 0; x < row.length; x++) {
      switch (row[x]) {
        case "|":
          isInside = !isInside;
          break;
        case "F":
          lastCorner = "F";
          break;
        case "L":
          lastCorner = "L";
          break;
        case "7":
          isInside = lastCorner === "L" ? !isInside : isInside;
          lastCorner = null;
          break;
        case "J":
          isInside = lastCorner === "F" ? !isInside : isInside;
          lastCorner = null;
          break;
        case ".":
          if (isInside) {
            acc++;
          }
          break;
      }
    }
    return acc;
  }, 0);

  return total;
}

function replaceStartPipeWithPipeCharacter(pipeMap, pipeCoordinates) {
  const [x, y] = pipeCoordinates[0];

  const direction = ([x2, y2]) => {
    if (x2 < x) return DIRECTION.LEFT;
    if (x2 > x) return DIRECTION.RIGHT;
    if (y2 < y) return DIRECTION.UP;
    if (y2 > y) return DIRECTION.DOWN;
  };

  const nextPipe = direction(pipeCoordinates[1]);
  const lastPipe = direction(pipeCoordinates.at(-1));
  const pipeJoint = [nextPipe, lastPipe].sort().join("-");

  const replacement = {
    "down-left": "7",
    "down-right": "F",
    "down-up": "|",
    "left-right": "-",
    "left-up": "J",
    "right-up": "L",
  }[pipeJoint];

  pipeMap[y][x] = replacement;
}
