module.exports.part1 = (input) => {
  return input.reduce((acc, line) => acc + calibrationValue1(line), 0);
};

const calibrationValue1 = (line) => {
  const digits = line.match(/\d/g);
  return Number(digits[0] + digits[digits.length - 1]);
};

module.exports.part2 = (input) => {
  return input.reduce((acc, line) => acc + calibrationValue2(line), 0);
};

const calibrationValue2 = (line) => {
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
  };
  const digits = line
    .match(/(\d|one|two|three|four|five|six|seven|eight|nine)/g)
    .map((word) => (word.length == 1 ? word : digitMap[word]));

  const answer = Number(digits[0] + digits[digits.length - 1]);

  console.log({ line, digits, answer });

  return answer;
};

module.exports.calibrationValue2 = calibrationValue2;
