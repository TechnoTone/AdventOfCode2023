module.exports.part1 = (input) => {
  return input.reduce(
    (acc, cardString) => acc + this.getCardScore(cardString),
    0
  );
};

module.exports.part2 = (input) => {
  const multipliers = input.map((_) => 1);
  input.forEach((cardString, ix) => {
    const winningNumberCount = getWinningNumberCount(cardString);
    // console.log({ ix, cardScore: winningNumberCount });
    for (let i = ix + 1; i < ix + 1 + winningNumberCount; i++) {
      if (i < multipliers.length) {
        multipliers[i] += multipliers[ix];
      }
    }
  });
  return multipliers.reduce((acc, n) => acc + n);
};

module.exports.getCardScore = (cardString) => {
  const winningNumberCount = getWinningNumberCount(cardString);
  return winningNumberCount === 0 ? 0 : Math.pow(2, winningNumberCount - 1);
};

const getWinningNumberCount = (cardString) => {
  const cardSections = cardString.split(":")[1].trim().split("|");
  const [winningNumbers, cardNumbers] = cardSections.map((section) =>
    [...section.match(/\d+/g)].map(Number)
  );
  const winningSet = new Set(winningNumbers);
  const winningNumberCount = cardNumbers.filter((num) =>
    winningSet.has(num)
  ).length;
  return winningNumberCount;
};
