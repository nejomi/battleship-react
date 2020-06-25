import React from 'react';
import './App.css';
import Gameboard from './Gameboard';
import Ship from './Ship';

let g = Gameboard(10);
g.placeShip(Ship(2), 0, 0);
g.placeShip(Ship(4), 2, 3, true);
console.log(g.board);

function App() {
  const [message, setMessage] = React.useState('Eyaw world');
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
