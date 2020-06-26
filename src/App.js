import React from 'react';
import './App.css';
import Gameboard from './Gameboard';
import Ship from './Ship';

const g = Gameboard(10);
g.placeShip(Ship(1), 1, 1);
g.placeShip(Ship(1), 1, 0, true);
g.recieveAttack(1, 1);
g.recieveAttack(1, 0);
console.log(g.checkShips());
console.log(g.getBoard());

function App() {
  const [message, setMessage] = React.useState('Eyaw world');
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
