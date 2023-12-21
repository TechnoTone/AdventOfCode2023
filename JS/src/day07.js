module.exports.part1 = (input) => {
  const hands = parseHands(input);
  hands.sort(compareHands);

  return hands.reduce(
    (total, hand, index) => total + hand.bid * (index + 1),
    0
  );
};

module.exports.part2 = (input) => {
  const hands = parseHands(input, true);
  hands.sort(compareHands);

  return hands.reduce(
    (total, hand, index) => total + hand.bid * (index + 1),
    0
  );
};

function parseHands(input, jokers = false) {
  return input.map((line) => {
    const [cardsStr, bidStr] = line.split(" ");
    const score = getHandScore(cardsStr, jokers);
    return {
      hand: cardsStr,
      bid: Number(bidStr),
      handScore: score,
      cards: getCards(cardsStr, jokers),
    };
  });
}

function getHandScore(hand, jokers) {
  const counts = getCardCounts(hand, jokers);
  if (counts[0] === 5) return 7;
  if (counts[0] === 4) return 6;
  if (counts[0] === 3 && counts[1] === 2) return 5;
  if (counts[0] === 3) return 4;
  if (counts[0] === 2 && counts[1] === 2) return 3;
  if (counts[0] === 2) return 2;
  if (counts[0] === 1) return 1;
  return 0;
}

function getCardCounts(hand, jokers) {
  const cardCounts = {};
  hand.split("").forEach((card) => {
    cardCounts[card] = cardCounts[card] ? cardCounts[card] + 1 : 1;
  });
  if (jokers) {
    const jokerCount = cardCounts.J || 0;
    if (jokerCount) {
      delete cardCounts.J;
      const counts = Object.values(cardCounts).sort((a, b) => b - a);
      counts[0] += jokerCount;
      return counts;
    }
  }
  const counts = Object.values(cardCounts).sort((a, b) => b - a);
  return counts;
}

function getCards(hand, jokers) {
  const scores = {
    A: 14,
    K: 13,
    Q: 12,
    J: jokers ? 1 : 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
  };
  return hand.split("").map((card) => scores[card]);
}

function compareHands(a, b) {
  const handComparison = a.handScore - b.handScore;
  if (handComparison !== 0) return handComparison;
  for (let i = 0; i < 5; i++) {
    const cardComparison = a.cards[i] - b.cards[i];
    if (cardComparison !== 0) return cardComparison;
  }
}
