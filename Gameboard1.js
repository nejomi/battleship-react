const cell = {
  shipNumber: null,
  hit: 0,
  shipIndex: null,
};

const [status, setStatus] = React.useState({
  hits: [],
  misses: [],
});

const [message, setMessage] = React.useState('blaise');

let board = Array.from(Array(size), (_) => Array(size).fill(cell));
let ships = [];

const getBoard = () => board;

const placeShip = (ship, x, y, rotate) => {
  // add ship to the array of ships
  ships.push(ship);
  // copy the board
  const copyBoard = [...board];

  // if rotate parameter is set do this
  if (rotate) {
    for (let i = x, count = 0; i < ship.getLength() + 1; i++, count++) {
      // copy the coordinate's cell
      let currCell = { ...copyBoard[i][y] };

      // set the cell data
      currCell.shipNumber = ships.indexOf(ship);
      currCell.shipIndex = count;
      copyBoard[i][y] = currCell;
    }
  } // no rotate parameter set
  else {
    for (let i = y, count = 0; i < ship.getLength() + 1; i++, count++) {
      // copy the coordinate's cell
      let currCell = { ...copyBoard[x][i] };

      // set the cell data
      currCell.shipNumber = ships.indexOf(ship);
      currCell.shipIndex = count;
      copyBoard[x][i] = currCell;
    }
  }

  board = copyBoard;
};

const recieveAttack = (x, y) => {
  const copyBoard = [...board];
  if (copyBoard[x][y].shipNumber === null) {
    console.log('no ship');
    setStatus(status.misses.concat({ x, y }));
    return;
  } else if (copyBoard[x][y].hit === 1) {
    console.log('already hit');
    return;
  }

  const shipNumber = copyBoard[x][y].shipNumber;
  const shipIndex = copyBoard[x][y].shipIndex;

  copyBoard[x][y].hit = 1;
  ships[shipNumber].hit(shipIndex);
  setStatus(status.hits.concat({ x, y }));
};

// check if all ships are sunk
const checkShips = () => {
  return ships.every((ship) => ship.isSunk() === true);
};

// return {
//   getBoard,
//   placeShip,
//   recieveAttack,
//   checkShips,
// };
