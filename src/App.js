import React from 'react';
import './App.css';
import Gameboard from './Gameboard/Gameboard';
import cloneDeep from 'lodash/cloneDeep';

const Ship = (length) => {
  // an array with length 'length' filled with '0'
  let hitStatus = Array.from(Array(length), () => 0);
  let sunkStatus = false;

  const getLength = () => length;
  const getStatus = () => hitStatus;
  // 'hit' a part of the ship, then check if all parts are hit
  const hit = (num) => {
    // cannot hit the same spot
    if (hitStatus[num] === 1) {
      return 'already damaged';
    }

    hitStatus[num] = 1;

    // check if ship is completely hit
    if (hitStatus.every(Boolean)) {
      sunkStatus = true;
    }
  };

  const isSunk = () => {
    return sunkStatus ? true : false;
  };
  return { getLength, getStatus, hit, isSunk };
};

// ____________________________________________________ //

const createBoard = (length) => {
  const board = [];
  for (let i = 0; i < length; i++) {
    board.push([]);
    for (let j = 0; j < length; j++) {
      board[i].push({
        id: `${i}${j}`,
        shipNumber: null,
        hit: 0,
        shipIndex: null,
      });
    }
  }

  const get = () => board;

  const placeShip = (ship, x, y, index, rotate) => {
    // if rotate parameter is set do this
    if (rotate) {
      for (let i = x, count = 0; i < x + ship.getLength(); i++, count++) {
        // cell reference
        let cell = board[i][y];

        // set the cell data
        cell.shipNumber = index;
        cell.shipIndex = count;
      }
    } // no rotate parameter set
    else {
      for (let i = y, count = 0; i < y + ship.getLength(); i++, count++) {
        // cell reference
        let cell = board[x][i];

        // set the cell data
        cell.shipNumber = index;
        cell.shipIndex = count;
      }
    }
  };

  const recieveAttack = (x, y) => {
    if (board[x][y].hit !== 1) {
      board[x][y].hit = 1;
      return true;
    }
    return false;
  };
  return {
    get,
    placeShip,
    recieveAttack,
  };
};

const shipPieces = [5, 4, 3, 3, 2];
// ____________________________________________________ //

class App extends React.Component {
  static initialState = {
    player: {
      board: createBoard(10),
      stats: { hits: [], misses: [] },
      ships: [],
    },
    computer: {
      board: createBoard(10),
      stats: { hits: [], misses: [] },
      ships: [],
    },
    status: {
      start: false,
      currentIndex: 0,
    },
  };
  constructor(props) {
    super(props);
    this.state = App.initialState;
    this.newAttack = this.newAttack.bind(this);
    this.newShip = this.newShip.bind(this);
    this.updateCurrent = this.updateCurrent.bind(this);
    this.startGame = this.startGame.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.reset = this.reset.bind(this);
  }

  newAttack(x, y, number, index, user) {
    // clone the ships array
    let ships = cloneDeep(this.state[user].ships);

    // append to stats and handle ship hits
    if (number === null) {
      this.state[user].stats.misses.push({ x, y });

      // tell the board that the cell has been attacked
      this.state[user].board.recieveAttack(x, y);
    } else {
      ships[number].hit(index);
      this.state[user].stats.hits.push({ x, y });

      // tell the board that the cell has been attacked
      if (this.state[user].board.recieveAttack(x, y) === true) {
        this.checkWin(user);
      }
    }

    // setState of ships for a rerender
    let player = { ...this.state[user] };
    player.ships = ships;
    this.setState({ [user]: player });
  }

  // communicate with board API
  newShip(length, x, y, rotate, user = 'player') {
    let ship = Ship(length);
    let player = this.state[user];
    let board = player.board.get();

    // check if the chosen coords are empty
    if (rotate) {
      for (let i = x; i < x + ship.getLength(); i++) {
        if (!board[i] || board[i][y].shipNumber !== null) {
          if (user === 'player') {
            alert('Please try again! Ship cant be placed here');
          }

          return false;
        }
      }
    } else {
      for (let i = y; i < y + ship.getLength(); i++) {
        // if the cell does not exist or a ship already exists
        if (!board[x][i] || board[x][i].shipNumber !== null) {
          // handle error
          if (user === 'player') {
            alert('Please try again! Ship cant be placed here');
          }
          return false;
        }
      }
    }

    player.ships.push(ship);
    const index = player.ships.indexOf(ship);
    player.board.placeShip(ship, x, y, index, rotate);

    this.setState({ [user]: { ...player } });

    return true;
  }

  checkWin(user) {
    let isEveryShipSunk = this.state[user].ships.every(
      (ship) => ship.isSunk() === true
    );

    if (isEveryShipSunk) {
      if (user === 'computer') {
        user = 'Player 1!';
      } else {
        user = 'Computer!';
      }
      alert('Winner: ' + user);
      this.reset();
    } else {
      console.log('No winner yet');
    }
  }

  reset() {
    // let initState = App.initialState;
    // initState.player.board = createBoard(10);
    // initState.computer.board = createBoard(10);
    // this.setState({ ...initState });
    // this.setComputerShips();
  }
  startGame() {
    let status = { ...this.state.status };
    status.start = true;
    this.setState({ status: status });
  }

  updateCurrent() {
    let status = { ...this.state.status };
    status.currentIndex++;
    this.setState({ status: status });
  }

  // get random coords
  randomCoords(length, rotate) {
    let min = Math.ceil(0);
    let max = Math.floor(9);
    let x;
    let y;

    if (rotate) {
      x = Math.floor(Math.random() * (max - length - min + 2)) + min;
      y = Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      x = Math.floor(Math.random() * (max - min + 1)) + min;
      y = Math.floor(Math.random() * (max - length - min + 2)) + min;
    }
    return [x, y];
  }

  // random ships for computer Gameboard
  UNSAFE_componentWillMount() {
    this.setComputerShips();
  }

  setComputerShips() {
    // ship pieces that are valid
    const ships = shipPieces; // [5,4,3,2,2]
    let rotate;
    let coords;
    let success;

    // for every ship, find it a valid place in the gameboard
    ships.forEach((i) => {
      success = false;
      do {
        rotate = Math.random() >= 0.5;
        coords = this.randomCoords(i, rotate);
        success = this.newShip(i, coords[0], coords[1], rotate, 'computer');
      } while (success !== true);
    });
  }

  render() {
    // instead of a long variable name
    let playerBoard = this.state.player.board;
    let computerBoard = this.state.computer.board;
    return (
      <div>
        <h1>Battleship</h1>
        <div className="gameboards">
          <Gameboard
            player="player"
            board={playerBoard.get()}
            attack={this.newAttack}
            ships={shipPieces}
            place={this.newShip}
            startStatus={this.state.status.start}
            start={this.startGame}
            current={this.state.status.currentIndex}
            updateCurrent={this.updateCurrent}
            randomCoordinate={this.randomCoords}
          />
          <Gameboard
            player="computer"
            board={computerBoard.get()}
            attack={this.newAttack}
            startStatus={this.state.status.start}
            start={this.startGame}
            current={this.state.status.currentIndex}
            randomCoordinate={this.randomCoords}
          />
        </div>
        {/* <button onClick={this.reset}>reset</button> */}
      </div>
    );
  }
}

export default App;
