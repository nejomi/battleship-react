const Gameboard = (size) => {
  const status = {
    hits: 0,
    misses: 0,
  };

  const cell = {
    shipNumber: null,
    hit: 0,
    shipIndex: null,
  };

  let board = Array.from(Array(size), (_) => Array(size).fill(cell));
  let ships = [];

  const getBoard = () => board;

  const placeShip = (ship, x, y, rotate) => {
    ships.push(ship);
    const copyBoard = [...board];

    if (rotate) {
      for (let i = y, count = 0; i < ship.getLength() + 1; i++, count++) {
        let currCell = { ...copyBoard[i][y] };
        let shipIndexfromArray = ships.indexOf(ship);
        currCell.shipNumber = shipIndexfromArray;
        currCell.shipIndex = count;
        copyBoard[i][y] = currCell;
        console.log(count);
      }
    } else {
      for (let i = x, count = 0; i < ship.getLength() + 1; i++, count++) {
        let currCell = { ...copyBoard[x][i] };
        let shipIndexfromArray = ships.indexOf(ship);

        currCell.shipNumber = shipIndexfromArray;
        currCell.shipIndex = count;
        copyBoard[x][i] = currCell;
        console.log(count);
      }
    }

    board = copyBoard;
  };
  return {
    getBoard,
    placeShip,
  };
};

export default Gameboard;
