import React from 'react';
import './App.css';

import Game from './01-tutorial-tic-tac-toe.tsx';
import FilterableProductTable from './02-thinking-in-react.tsx';

function App() {
  return (
    <div className="react-doc">
      <Game />
      <hr />
      <FilterableProductTable />
    </div>
  );
}

export default App;
