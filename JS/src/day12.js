module.exports.part1 = (input) => {
  const memo = new Map();
  return input.reduce((acc, row) => count(parseRow(row), memo) + acc, 0);
};

module.exports.part2 = (input) => {
  const memo = new Map();
  return input.reduce((acc, row) => count(parseRow(row, true), memo) + acc, 0);
};

function parseRow(row, timesFive = false) {
  const [springs, groups] = row.split(" ");
  const numberGroups = groups.split(",").map(Number);

  if (timesFive) {
    return [
      springs.padEnd(springs.length * 5 + 4, "?" + springs),
      Array(5).fill(numberGroups).flat(),
    ];
  }
  return [springs, numberGroups];
}

function count([springs, groups], memo) {
  const key = springs + " " + groups.join(",");
  if (memo.has(key)) {
    return memo.get(key);
  }

  if (groups.length === 0) {
    const result = springs.includes("#") ? 0 : 1;
    memo.set(key, result);
    return result;
  }

  if (springs.length < sum(groups) + groups.length - 1) {
    memo.set(key, 0);
    return 0;
  }

  let total = 0;

  if (springs[0] !== "#") {
    total += count([springs.slice(1), groups], memo);
  }

  if (
    !springs.slice(0, groups[0]).includes(".") &&
    springs[groups[0]] !== "#"
  ) {
    total += count([springs.slice(groups[0] + 1), groups.slice(1)], memo);
  }

  memo.set(key, total);

  return total;
}

function sum(arr) {
  return arr.reduce((acc, n) => acc + n);
}
