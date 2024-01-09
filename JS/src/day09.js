module.exports.part1 = (input) => {
  return input.reduce((acc, line) => acc + extrapolate(parseLine(line)), 0)
};

module.exports.part2 = (input) => {
  return input.reduce((acc, line) => acc + extrapolate(parseLine(line).reverse()), 0)

};


function parseLine(line) {
  return line.split(" ").map((n) => parseInt(n));
}

function extrapolate(numbers) {
  if (numbers.every((n) => n === 0)){
    return 0;
  }

  const intervals = getIntervals(numbers);
  const lastNumber = numbers.at(-1);
  return lastNumber + extrapolate(intervals);

}

function getIntervals(numbers) {
  return numbers.map((n, ix) => numbers[ix + 1] - n).slice(0, -1);
}
