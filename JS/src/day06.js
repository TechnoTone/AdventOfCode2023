module.exports.part1 = (input) => {
  const times = input[0].match(/\d+/g).map(Number);
  const distances = input[1].match(/\d+/g).map(Number);

  return times.reduce((acc, t, i) => acc * possibleWins(t, distances[i]), 1);
  // ( -b - sqrt( b^2 - 4ac ) ) / 2a
  // ( -b + sqrt( b^2 - 4ac ) ) / 2a
};

function possibleWins(t, d) {
  const a = 1;
  const b = -t;
  const c = d;
  const root = Math.sqrt(b * b - 4 * a * c);
  const x1 = (-b - root) / (2 * a);
  const x2 = (-b + root) / (2 * a);
  const lowest = Math.trunc(x1) === x1 ? x1 + 1 : Math.ceil(x1);
  const highest = Math.trunc(x2) === x2 ? x2 - 1 : Math.floor(x2);
  return highest - lowest + 1;
}

module.exports.part2 = (input) => {
  const time = Number(input[0].split(":")[1].replaceAll(" ", ""));
  const distance = Number(input[1].split(":")[1].replaceAll(" ", ""));

  return possibleWins(time, distance);
};
