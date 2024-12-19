const ROUND_ROCK = "O";
const SQUARE_ROCK = "#";
const EMPTY = ".";

const NORTH = "N";
const EAST = "E";
const SOUTH = "S";
const WEST = "W";

module.exports.part1 = (input) => {
  const parsed = parse(input);
  tilt(NORTH, parsed);
  return parsed.score();
};

module.exports.part2 = (input) => {
  const TARGET_CYCLE_COUNT = 1000000000;

  const parsed = parse(input);

  const scores = [];
  scores.push(parsed.score());

  while (scores.length < 1000) {
    cycle(parsed);
    scores.push(parsed.score());

    for (let cycle_length = 10; cycle_length < 25; cycle_length++) {
      const last = scores.slice(-cycle_length);
      const prev = scores.slice(-(2 * cycle_length), -cycle_length);
      if (last.join(",") === prev.join(",")) {
        const cyclePosition = scores.length - 1;
        const cycleOffset = cyclePosition % cycle_length;
        const targetOffset = TARGET_CYCLE_COUNT % cycle_length;
        return scores[
          cyclePosition - cycle_length - cycleOffset + targetOffset
        ];
      }
    }
  }
};

const parse = (input) => {
  const width = input[0].length;
  const height = input.length;

  const grid = input.map((line) => line.split(""));

  const read = (x, y) =>
    x < 0 || x >= width || y < 0 || y >= height ? SQUARE_ROCK : grid[y][x];
  const write = (x, y, value) => (grid[y][x] = value);
  const move = (x, y, direction) => {
    switch (direction) {
      case NORTH:
        return [x, y - 1];
      case EAST:
        return [x + 1, y];
      case SOUTH:
        return [x, y + 1];
      case WEST:
        return [x - 1, y];
    }
  };

  const tryMoveRock = (x, y, direction) => {
    if (read(x, y) === ROUND_ROCK) {
      let [nextX, nextY] = [x, y];
      let [moveToX, moveToY] = [x, y];

      while (nextX === moveToX && nextY === moveToY) {
        [nextX, nextY] = move(nextX, nextY, direction);
        if (read(nextX, nextY) === EMPTY) {
          [moveToX, moveToY] = [nextX, nextY];
        }
      }

      if (read(moveToX, moveToY) === EMPTY) {
        write(x, y, EMPTY);
        write(moveToX, moveToY, ROUND_ROCK);
        return true;
      }
    }
  };

  const score = () => {
    return grid.reduce(
      (acc, row, ix) =>
        acc +
        row.filter((cell) => cell === ROUND_ROCK).length * (grid.length - ix),
      0
    );
  };

  return { grid, width, height, tryMoveRock, score };
};

const tilt = (direction, { width, height, tryMoveRock }) => {
  switch (direction) {
    case NORTH:
      for (let y = 1; y < height; y++) {
        for (let x = 0; x < width; x++) {
          tryMoveRock(x, y, direction);
        }
      }
      break;
    case EAST:
      for (let x = width - 2; x >= 0; x--) {
        for (let y = 0; y < height; y++) {
          tryMoveRock(x, y, direction);
        }
      }
      break;
    case SOUTH:
      for (let y = height - 2; y >= 0; y--) {
        for (let x = 0; x < width; x++) {
          tryMoveRock(x, y, direction);
        }
      }
      break;
    case WEST:
      for (let x = 1; x < width; x++) {
        for (let y = 0; y < height; y++) {
          tryMoveRock(x, y, direction);
        }
      }
      break;
  }
};

const cycle = (parsed) => {
  tilt(NORTH, parsed);
  tilt(WEST, parsed);
  tilt(SOUTH, parsed);
  tilt(EAST, parsed);
};
