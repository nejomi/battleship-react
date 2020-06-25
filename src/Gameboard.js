const Gameboard = (size) => {
  const status = {
    hits: 0,
    misses: 0,
  };

  const cell = {
    ship: null,
    hit: 0,
  };

  let board = Array.from(Array(size), (_) => Array(size).fill(cell));
  let ships = [];

  const placeShip = (ship, x, y, rotate) => {
    ships.push(ship);
    const copyBoard = [...board];

    if (rotate) {
      for (let i = x; i < x + ship.getLength(); i++) {
        const shipIndex = ships.indexOf(ship);
        let cell = { ...copyBoard[i][y] };
        cell.ship = shipIndex;
        copyBoard[i][y] = cell;
      }
      board = copyBoard;
      return;
    }

    for (let i = y; i < y + ship.getLength(); i++) {
      const shipIndex = ships.indexOf(ship);
      let cell = { ...copyBoard[x][i] };
      cell.ship = shipIndex;
      copyBoard[x][i] = cell;
    }

    board = copyBoard;
  };

  const recieveAttack = (x, y) => {};

  return {
    board,
    placeShip,
  };
};

export default Gameboard;
