import React from 'react';
import './App.css';

import Game from './01-Tutorial-Tic-Tac-Toe.tsx';
import FilterableProductTable from './02-Thinking-in-React.tsx';
import DescribingUI from './03-Describing-the-UI.tsx';
import AddingInteractivity from './04-Adding-Interactivity.tsx';
import ManagingState from './05-Managing-State.tsx';
import EscapeHatches from './06-Escape-Hatches.tsx';

function App() { 
  return (
    <div className="react-doc">
      <Game />
      <hr />
      <FilterableProductTable />
      <hr />
      <DescribingUI />
      <hr />
      <AddingInteractivity />
      <hr />
      <ManagingState />
      <hr />
      <EscapeHatches />
    </div>
  );
}

export default App;
