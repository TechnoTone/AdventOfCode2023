module.exports.part1 = (input) => {
  return input.reduce((acc, line) => acc + calibrationValue(line), 0);
};

const calibrationValue = (line) => {
  const digits = line.match(/\d/g);
  return Number(digits[0] + digits[digits.length - 1]);
};

module.exports.part2 = (input) => {
  return input.reduce((acc, line) => acc + calibrationValueWithWords(line), 0);
};

const calibrationValueWithWords = (line) => {
  const digitMap = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
  };
  const matches = [
    ...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g),
  ].map((match) => match[1]);

  const digits = [matches[0], matches.at(-1)].map((d) => digitMap[d]);

  return Number(digits[0] + digits[digits.length - 1]);
};

module.exports.calibrationValue = calibrationValue;
module.exports.calibrationValueWithWords = calibrationValueWithWords;
