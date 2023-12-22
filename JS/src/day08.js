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
    while (currentLocation[2] !== "Z") {
      const destinationIndex = directions[steps % directions.length] === "L" ? 0 : 1;
      currentLocation = network.get(currentLocation)[destinationIndex]
      steps++;
    }
    return steps;
  }

  starts.forEach((startLocation) => {

    console.log(startLocation, traverseNetwork(startLocation))
  })

  return [network, starts];
};


