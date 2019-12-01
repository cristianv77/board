import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";
import Board from './index'

it('renders', () => {
  const testRoot = document.createElement('div');
  testRoot.setAttribute('id','testRoot');
  act(() => {
  ReactDOM.render(
    <Board />,
    document.getElementById('testRoot')
  );
  ReactDOM.unmountComponentAtNode(testRoot);
  })
});