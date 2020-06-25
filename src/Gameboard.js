const Gameboard = (size) => {
  const status = {
    hit: 0,
    miss: 0,
  };

  let board = Array.from(Array(size), (_) => Array(size).fill(null));
  let ships = [];

  const placeShip = (ship, x, y, rotate) => {
    ships.push(ship);

    if (rotate) {
      for (let i = x; i < x + ship.getLength(); i++) {
        board[i][y] = ships.indexOf(ship);
      }
      return;
    }

    for (let i = y; i < y + ship.getLength(); i++) {
      board[x][i] = ships.indexOf(ship);
    }
  };

  return {
    board,
    placeShip,
  };
};

export default Gameboard;
