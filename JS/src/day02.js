module.exports.part1 = (input) => {
  return input.reduce((acc, game) => {
    const gameId = Number(game.split(": ")[0].split(" ")[1]);
    return isGamePossible(game) ? acc + gameId : acc;
  }, 0);
};

const isGamePossible = (game) => {
  const LIMITS = {
    red: 12,
    green: 13,
    blue: 14,
  };

  //Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  const [, rounds] = game.split(": ");
  return rounds.split("; ").every((round) => {
    return round.split(", ").every((cube) => {
      const count = Number(cube.split(" ")[0]);
      const color = cube.split(" ")[1];
      return count <= LIMITS[color];
    });
  });
};

module.exports.isGamePossible = isGamePossible;

module.exports.part2 = (input) => {
  return input.reduce((acc, game) => {
    return acc + power(minReqCubes(game));
  }, 0);
};

const power = (cubes) => {
  return cubes.red * cubes.green * cubes.blue;
};

const minReqCubes = (game) => {
  const maxCubes = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const [, rounds] = game.split(": ");
  return rounds.split("; ").reduce((acc, round) => {
    return round.split(", ").reduce((acc, cube) => {
      const count = Number(cube.split(" ")[0]);
      const color = cube.split(" ")[1];
      return {
        ...acc,
        [color]: Math.max(acc[color], count),
      };
    }, acc);
  }, maxCubes);
};

module.exports.minReqCubes = minReqCubes;
