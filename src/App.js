import React from 'react';
import './App.css';
import Ship from './Ship';
import Gameboard from './Gameboard';

function App() {
  const [message, setMessage] = React.useState('Eyaw world');
  const blaise = Ship('blaise');
  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage(blaise.name)}>Eyaw</button>
    </div>
  );
}

export default App;
