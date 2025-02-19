import React, { useState } from "react";

interface SquarePropType {
  value: string | null ;
  onSquareClick: () => void;
}

function Square(prop: SquarePropType) {

  // We can use a parameter to get the value transferred from outside.
  // In TypeScript we can define a 'PropType' to limit the parameter
  // type.

  // const [value, setValue] = useState<string | null>(null);

  // React provides a special function called 'useState' that you can
  // call from your component to let it remember things. When we didn't
  // click the button, the value is set to 'null'. 'value' stores the
  // value and 'setValue' is a function that can be used to change the
  // value. The 'null' passed to 'useState' is used as the initial
  // value for this state variable.

  // Each Square has its own state, the 'value' stored in each Square
  // is completely independent of the others. When you call a 'set'
  // function in a component, React automatically updates the child
  // components inside too.

  // function handleClick() {
    // console.log(`Clicked ${prop.value}`);

    // setValue("X");

    // Declare a function to handle clicking the Square button.
  // }

  // The code in function 'Square' creates a *component*. In React,
  // a component is a piece of reusable code that represents a part
  // of a use interface.

  // return <button className="square">X</button>

  // The return value of React is a JSX (JavaScript XML) element.
  // React components need to return a single JSX element and not
  // multiple adjacent JSX element. We can use *Fragments* ('<>'
  // and '</>') to wrap multiple adjacent JSX element:

  // return (
  //   <>
  //     <button className="square"></button>
  //     <button className="square"></button>
  //   </>
  // )

  return (
    <button 
      className="square"
      onClick={prop.onSquareClick}
    >
      {prop.value}
    </button>
  )
}

// To check for a winner in a tic-tac-toe game, the 'Board' would need
// to somehow know the state of each of the 9 'Square' components. We
// might guess that the 'Board' needs to 'ask' each 'Square' for that
// 'Square''s state. But this code becomes difficult to understand.
// Instead, the best approach is to store the game's state in the parent
// 'Board' component instead of in each 'Square'. 'Board' component can
// tell each 'Square' what to display 

interface BoardPropType {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
}

// Change the 'Board' component to take three props:
//   + 'xIsNext'
//   + 'squares'
//   + 'onPlay'
// The 'onPlay' is a function that 'Board' can call with the updated
// squares array when a player makes a move.

function Board(prop: BoardPropType) {

  function calculateWinner(squares: (string | null)[]): string | null {
    const LINES: (number[])[] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i: number = 0; i < LINES.length; ++i) {
      const [a, b, c] = LINES[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner: string | null = calculateWinner(prop.squares);
  let status: string;

  if (winner === null) {
    if (prop.squares.indexOf(null) !== -1) {
      status = "Next player: " + (prop.xIsNext ? "X" : "O");
    } else {
      status = "Draw!";
    }
  } else {
    status = "Winner: " + winner;
  }

  function handleClick(i: number): void {
    if (prop.squares[i] !== null ||    // The button clicked is not empty
        calculateWinner(prop.squares)  // There is no winner currently
    ) {
      return;
    }

    const nextSquares: (string | null)[] = prop.squares.slice();

    // nextSquares[0] = "X";
    // setSquares(nextSquares);

    // The 'handleClick' function creates a copy of the 'squares' array
    // with the JavaScript 'slice()' Array method. Then, 'handleClick'
    // updates the 'nextSquares' array to add 'X' to the first square.

    // Now we can add an argument 'i' to the 'handleClick' function that
    // takes the index of the square to update.

    if (prop.xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // setXIsNext(!xIsNext);
    
    // It will flipped to determine which player goes next and the game's
    // state will be saved.

    // setSquares(nextSquares);

    prop.onPlay(nextSquares);
  }

  // return (
  //   <>
  //     <div className="status">{status}</div>
  //     <div className="board-row">
  //       {/* <Square value={squares[0]} onSquareClick={handleClick(0)}/> */}
  //       {/* handleClick(0) is the execution of this function, and its   */}
  //       {/* return type is 'void'                                       */}

  //       {/* The 'handleClick(0)' call will be a part of rendering the   */}
  //       {/* board component. Because 'handleClick(0)' alters the state  */}
  //       {/* of the board component by calling 'setSquares', your entire */}
  //       {/* board component will be re-render again. But this runs      */}
  //       {/* 'handleClick(0)' again, leading to an infinite loop.        */}

  //       <Square value={prop.squares[0]} onSquareClick={() => handleClick(0)} />
  //       <Square value={prop.squares[1]} onSquareClick={() => handleClick(1)} />
  //       <Square value={prop.squares[2]} onSquareClick={() => handleClick(2)} />

  //       {/* Notice the new '() =>' syntax. Here '() => handleClick(0)   */}
  //       {/* is an *arrow function*, which is a shorter way to define    */}
  //       {/* functions. When the square is clicked, the code after the   */}
  //       {/* '=>' will run, calling 'handleClick(0)'                     */}

  //     </div>
  //     <div className="board-row">
  //       <Square value={prop.squares[3]} onSquareClick={() => handleClick(3)}/>
  //       <Square value={prop.squares[4]} onSquareClick={() => handleClick(4)}/>
  //       <Square value={prop.squares[5]} onSquareClick={() => handleClick(5)}/>
  //     </div>
  //     <div className="board-row">
  //       <Square value={prop.squares[6]} onSquareClick={() => handleClick(6)}/>
  //       <Square value={prop.squares[7]} onSquareClick={() => handleClick(7)}/>
  //       <Square value={prop.squares[8]} onSquareClick={() => handleClick(8)}/>
  //     </div>
  //   </>
  // )

  const boardElement: React.JSX.Element[] = [0, 3, 6].map((boardRowIndex) => {
    return (
      <div className="board row">
        {
          [boardRowIndex, boardRowIndex + 1, boardRowIndex + 2].map((buttonIndex) => {
            return (
              <Square 
                value={prop.squares[buttonIndex]}
                onSquareClick={() => handleClick(buttonIndex)}
              />
            )
          })
        }
      </div>
    );
  });

  // 2. Rewrite 'Board' to use two loops to make the squares instead of
  //    hardcoding them.

  return (
    <>
      <div className="status">{status}</div>
      {boardElement}
    </>
  )
}

function Game() {

  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const currentSquares: (string | null)[] = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory: (string | null)[][] = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves: React.JSX.Element[] = history.map((_, move) => {
    let description: string;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        {
          move === currentMove ? (
            <p>{description}</p>
          ) : (
            <button onClick={() => jumpTo(move)}>{description}</button>
          )
          // 1. For the current move only, show "You are at move #..."
          //    instead of a button.
        }
      </li>
    );

    // Each child in a list should have a unique "key" prop. When you render
    // a list, React stores some information about each rendered list item.
    // When you update a list, React needs to determine what has changed. You
    // need to specify a 'key' property for each list item to differentiate
    // each list item from its siblings.

    // If the current list has a key that didn't exist before , React creates
    // a component. If the current list is missing a key that existed in the
    // previous list, React destroys the previous component.

    // Keys tell React about the identity of each component, which allows
    // React to maintain state between re-renders. 'key' is a special and
    // reserved property in React. Even though 'key' may look like it is
    // passed as props, React automatically uses 'key' to decide which
    // components to update. There's no way for a component to ask what
    // 'key' its parent specified.

    // If no key is specified, React will report an error and use the array
    // index as a key by default. Using the array index as a key is problematic
    // when trying to re-order a list's items or inserting / removing list
    // items. Explicitly passing 'key={i}' silences the error but has the same
    // problems as array indices.
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game;

// 'export' makes this function accessible outside of this file 
// 'default' tells other files using your code that it's the main
// function in your file.