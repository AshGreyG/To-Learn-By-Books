import React from 'react';
import './App.css';

import Game from './01-Tutorial-Tic-Tac-Toe.tsx';
import FilterableProductTable from './02-Thinking-in-React.tsx';
import DescribingUI from './03-Describing-the-UI.tsx';

function App() {
  return (
    <div className="react-doc">
      <Game />
      <hr />
      <FilterableProductTable />
      <hr />
      <DescribingUI />
    </div>
  );
}

export default App;
