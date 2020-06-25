import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Ship from './Ship';
import Gameboard from './Gameboard';

test('Ship factory returns an object correctly', () => {
  const destroyer = Ship(4);
  expect(destroyer.getLength()).toEqual(4);
});

test('Ship isSunk and hit methods works correctly', () => {
  const infiltrator = Ship(6);
  const length = infiltrator.getLength();
  for (let i = 0; i < length; i++) {
    infiltrator.hit(i);
  }
  expect(infiltrator.isSunk()).toBe(true);
});

test('Ship cannot be hit on the same spot', () => {
  const voyager = Ship(2);
  voyager.hit(0);
  expect(voyager.hit(0)).toBe('already damaged');
});

test('Ship gets placed correctly', () => {
  const g = Gameboard(10);
  g.placeShip(Ship(1), 1, 1);
  const board = g.getBoard();
  expect(board[1][1].shipNumber).not.toBe(null);
});

test('Ship rotation as second input works', () => {
  const g = Gameboard(10);
  g.placeShip(Ship(1), 9, 9);

  const expected = [1, 1];
  g.placeShip(Ship(2), 1, 1, true);
  const board = g.getBoard();

  let arr = [board[1][1].shipNumber, board[1][2].shipNumber];
  expect(arr).toEqual(expect.arrayContaining(expected));
});
