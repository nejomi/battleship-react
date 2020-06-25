import React from 'react';
import './App.css';
import Gameboard from './Gameboard';
import Ship from './Ship';

const g = Gameboard(10);
g.placeShip(Ship(5), 1, 1, true);
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
