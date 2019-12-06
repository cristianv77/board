import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import {initializeColumns, initializeCards } from './helpers/Initialize'

it('renders', () => {
  initializeColumns();
  initializeCards();
  const board = document.createElement('board');
  ReactDOM.render(<Board />, board);
});
