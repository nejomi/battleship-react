import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Ship from './Ship';

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
