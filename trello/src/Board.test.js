import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import {initializeColumns, initializeCards } from './helpers/Initialize'

it('renders and archives', () => {
  initializeColumns();
  initializeCards();
  const element = document.createElement('board');
  const board = ReactDOM.render(<Board />, element);
  board.archiveColumn('To do');
  console.log(board.state.columns);
});
