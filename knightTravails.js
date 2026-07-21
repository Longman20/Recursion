function knightMoves(start, end) {
  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  const isOnBoard = ([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7;

  const key = ([x, y]) => `${x},${y}`;

  const queue = [[start]];
  const visited = new Set([key(start)]);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    if (key(current) === key(end)) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((pos) => console.log(pos));
      return path;
    }

    for (const [dx, dy] of moves) {
      const next = [current[0] + dx, current[1] + dy];

      if (isOnBoard(next) && !visited.has(key(next))) {
        visited.add(key(next));
        queue.push([...path, next]);
      }
    }
  }
}

knightMoves([0, 0], [3, 3]);
