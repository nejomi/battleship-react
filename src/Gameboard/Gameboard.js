import React from 'react';
import styles from './Gameboard.module.css';

const Gameboard = (props) => {
  let gameStart = props.startStatus;
  let place = props.current;

  function computerAttack(enemy) {
    const [randX, randY] = props.randomCoordinate(1);
    const id = 'player' + randX + randY;
    document.querySelector('#' + id).click();
  }

  const onCellClick = (id, number, index, hit) => {
    // if game hasnt started yet and computer board is clicked
    if (props.player === 'computer' && gameStart === false) {
      alert('Place your ships first!');
      return;
    }

    // if game has started and player board is clicked
    // if (gameStart && props.player === 'player') {
    //   return;
    // }

    let rotate = false;

    // get rotate information if rotate is selected
    if (!gameStart) {
      let checkBox = document.querySelector('#rotate');
      if (checkBox.checked === true) {
        rotate = true;
      }
    }

    // since id is the coordinates, split it in x and y values
    id.split('');
    let x = +id[0];
    let y = +id[1];

    // if game is in progress a click is an attack
    if (gameStart === true) {
      // if this is a computer attack and there is already a hit, do it again
      if (props.player === 'player') {
        if (hit === 1) {
          computerAttack();
        }
      }
      props.attack(x, y, number, index, props.player);

      // if the cell hasn't been hit before
      if (hit === 0 && props.player === 'computer') {
        computerAttack();
      }
    } else {
      // game is not in progress so click is place ship
      let success = props.place(props.ships[place], x, y, rotate);
      console.log(success);
      // if the ship is placed sucessfully
      if (success === true) {
        props.updateCurrent();
        // if game should start
        if (place + 1 === props.ships.length && gameStart === false) {
          props.start();
        }
      }
    }
  };

  const board = props.board.map((row) => {
    // handles the classes
    return row.map((cell) => {
      // classes array
      let classes = [];
      classes.push(styles.cell);
      // if there is a ship in this cell
      if (props.player === 'player' && gameStart) {
        classes.push(styles.readonly);
      }
      if (cell.shipNumber !== null) {
        if (props.player === 'player') {
          classes.push(styles.ship);
        }
        // if the ship is hit
        if (cell.hit === 1) {
          classes.push(styles.hit);
        }
      } else {
        //no ship but theres a hit
        if (cell.hit === 1) {
          classes.push(styles.ocean);
        }
      }
      return (
        <div
          className={classes.join(' ')}
          key={cell.id}
          id={props.player + cell.id}
          onClick={() =>
            onCellClick(cell.id, cell.shipNumber, cell.shipIndex, cell.hit)
          }></div>
      );
    });
  });

  // ship placing settings
  let settings;
  if (!gameStart) {
    if (props.player === 'player') {
      let ships = [...props.ships];
      // show settings if gameboard is player and if ships are not completely emptied out
      settings = (
        <div className={styles.settings}>
          <div>Ship Queue: {ships.splice(place)}</div>
          <div>Current Ship Length: {props.ships[place]}</div>
          <div className={styles.rotate}>
            Rotate:{' '}
            <input id="rotate" type="checkbox" name="rotate" value="true" />
          </div>
        </div>
      );
    }
  }

  return (
    <div className={styles.Gameboard}>
      <div>{props.player + ' board'}</div>
      <div className={styles.board}>{board}</div>
      {settings}
    </div>
  );
};

export default Gameboard;
