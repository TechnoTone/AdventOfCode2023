module.exports.part1 = (input) => {
  const [directions, _, ...nodes] = input;

  const network = nodes.reduce((acc, node) => {
    const location = node.slice(0, 3)
    const destinationLeft = node.slice(7, 10)
    const destinationRight = node.slice(12, 15)

    return acc.set(location, [destinationLeft, destinationRight])
  }, new Map());

  let currentLocation = "AAA";
  let steps = 0;
  while (currentLocation !== "ZZZ") {
    const destinationIndex = directions[steps % directions.length] === "L" ? 0 : 1;
    currentLocation = network.get(currentLocation)[destinationIndex]
    steps++;
  }

  return steps;
};

module.exports.part2 = (input) => {
  const [directions, _, ...nodes] = input;

  const [network, starts] = nodes.reduce(([network, starts], node) => {
    const location = node.slice(0, 3)
    const destinationLeft = node.slice(7, 10)
    const destinationRight = node.slice(12, 15)

    if (location[2] === "A") {
      starts.add(location)
    }

    return [network.set(location, [destinationLeft, destinationRight]), starts]
  }, [new Map(), new Set()]);


  function traverseNetwork(currentLocation) {
    let steps = 0
    while (true) {
      if (currentLocation[2] === "Z") {
        return steps
      }
      const destinationIndex = directions[steps % directions.length] === "L" ? 0 : 1;
      currentLocation = network.get(currentLocation)[destinationIndex]
      steps++;
    }
  }

  const stepCounts = [...starts].map(traverseNetwork);
  const rootOfLongestRoute = Math.floor(Math.sqrt(Math.max(...stepCounts)));
  const primes = generateListOfPrimes(rootOfLongestRoute);

  const highestPrimePowers = stepCounts.reduce((acc, numberOfSteps) => {
    const primeFactorsAndPowers = findPrimeFactors(numberOfSteps, primes);
    primeFactorsAndPowers.forEach((power, prime) => {
      if (!acc.has(prime) || power > acc.get(prime)) {
        acc.set(prime, power)
      }
    })
    return acc;
  }, new Map())

  return [...highestPrimePowers].reduce((acc, [prime, power]) => acc * Math.pow(prime, power), 1)
};

function generateListOfPrimes(maximum) {
  let primes = Array(maximum + 1).fill(true);
  primes[0] = primes[1] = false;

  for (let i = 2; i <= Math.sqrt(maximum); i++) {
    if (primes[i]) {
      for (let j = i * i; j <= maximum; j += i) {
        primes[j] = false;
      }
    }
  }

  return primes.reduce((acc, isPrime, index) => {
    if (isPrime) acc.push(index);
    return acc;
  }, []);
};

function findPrimeFactors(number, primes) {
  let primeFactors = new Map();

  let primeIndex = 0
  while (primeIndex < primes.length && number > 1) {
    const currentPrime = primes[primeIndex];
    while (number % currentPrime === 0) {
      if (primeFactors.has(currentPrime)) {
        primeFactors.set(currentPrime, primeFactors.get(currentPrime) + 1)
      } else {
        primeFactors.set(currentPrime, 1)
      }
      number = number / currentPrime
    }
    primeIndex++
  }
  if (number > 1) {
    primeFactors.set(number, 1)
  }

  return primeFactors
}

