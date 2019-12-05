import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import {initializeCards, initializeColumns} from './helpers/Initialize'

// ========================================

initializeCards();
initializeColumns();
ReactDOM.render(<Board />, document.getElementById('root'));
