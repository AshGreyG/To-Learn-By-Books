import React, { useState } from "react";

// Event handlers will also catch events from any children your
// component might have. We say that an event "bubbles" or "propagates"
// up the tree: it starts with where the event happened, and then
// goes up the tree.

function PropagationToolbar() {
  return (
    <div 
      className="toolbar"
      onClick={() => {
        alert("You clicked on the toolbar!");
      }}
    >
      <button onClick={() => alert("Playing!")}>
        Play Movie
      </button>
      <button onClick={() => alert("Upload!")}>
        Upload Image
      </button>
    </div>
  );
}

// Event handlers receive an event object as their only argument. By 
// convention, it's usually called 'e', which stands for 'event". You
// can use this object to read information about the event.

// That event object also lets you stop the propagation. If you want to
// prevent an event from reaching parent components, you need to call
// 'e.stopPropagation()':

function NoPropagationToolbar() {
  return (
    <div 
      className="toolbar"
      onClick={() => {
        alert("You clicked on the toolbar!");
      }}
    >
      <button onClick={(e) => {
        e.stopPropagation();
        alert("We have stopped the propagation, and play the movie now!");
      }}>
        Play Movie
      </button>
      <button onClick={(e) => {
        e.stopPropagation();
        alert("We have stopped the propagation, and upload an image now!");
      }}>
        Upload Image
      </button>
    </div>
  );
}

// Each event propagates in three phases:
//   1. It travels down. calling all 'onClickCapture' handlers.
//   2. It runs the clicked element's 'onClick' handler.
//   3. It travels upwards, calling all 'onClick' handlers.

// In rare cases, you might need to catch all events on child elements,
// even if they stopped propagation. For example, maybe you want to
// log every click to analytics. regardless of the propagation logic.
// You can do this by adding 'Capture' at the end of the event name

function CapturePropagationToolbar() {
  return (
    <div 
      className="toolbar"
      onClickCapture={() => {
        alert("Dealing with the click on children components...");
      }}
    >
      <button onClick={(e) => {
        e.stopPropagation();
        alert("Huh? Please play the movie!");
      }}>
        Play Movie
      </button>
      <button onClick={(e) => {
        e.stopPropagation();
        alert("Huh? Please upload the image!");
      }}>
        Upload Image
      </button>
    </div>
  );
}

// Some browser events have default behavior associated with them. For
// example, a '<form>' submit event, which happens when a button inside of
// it is clicked, will reload the whole page by default. You can call
// 'e.preventDefault()' on the event object to stop this from happening

function DefaultForm() {
  return (
    <form onSubmit={() => alert("Now it's submitting... Please wait.")}>
      <input type="text" />
      <button>Send</button>
    </form>
  );
}

function PreventDefaultForm() {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      alert("Now the default submitting is prevented...");
    }}>
      <input type="text" />
      <button>Send</button>
    </form>
  );
}

// Event handlers are the best place for side effects. Unlike rendering
// functions, event handlers don't need to be pure, so it's a great place
// to change something. Like changing an input's value in response to
// typing, or chang a list in response to a button press.

// In React, 'useState', as well as any other function starting with 'use',
// is called a 'Hook'. 'Hook's are special functions that are only available
// while React is rendering.

// React holds an array of state pairs for every component. It also maintains
// the current pair index.

// React only changes the DOM nodes if there's a difference between renders.

function CounterSetMultipleTimes1() {
  const [counter, setCounter] = useState<number>(0);

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={() => {
        setCounter(counter + 1);
        alert(counter);                          // maybe 3
        setCounter(counter + 1);
        alert(counter);                          // still 3
        setCounter(counter + 1);
        setTimeout(() => alert(counter), 3000);  // still 3
      }}>
        +3
      </button>
    </>
  );
}

// Setting state only changes it for the next render. During the first render
// 'counter' was '0'. This is why, in that render's 'onClick' handler, the value
// of 'counter' is still '0' even after 'setNumber(counter + 1)' was called;

// It is an uncommon use case, but if you would like to update the same state
// variable multiple times before the next render, instead of passing the next
// state value like 'setNumber(counter + 1)', you can pass a function that
// calculates the next state based on the previous one in the queue, like
// 'setNumber(n => n + 1)'.

function CounterSetMultipleTimes2() {
  const [counter, setCounter] = useState<number>(0);

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={() => {
        for (let i: number = 0; i <= 2; ++i) {
          setCounter(n => n + 1);
          alert(counter);
        }

        // Although the value of 'counter' doesn't change before re-rendering,
        // but 'n => n + 1', which is called an "updater function" actually
        // lets React queues this function to be processed after all the other 
        // code in the event handler has rum. During the next render, React goes
        // through the queue and gives you the final updated state.
      }}>
        +3
      </button>
    </>
  );
}

function CounterSetMultipleTimes3() {
  const [counter, setCounter] = useState<number>(0);

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={() => {
        setCounter(counter + 5);
        setCounter(n => n + 1);

        // | queued update    | n          | returns   |
        // | "replace with 5" | 0 (unused) | 5         |
        // | n => n + 1       | 5          | 5 + 1 = 6 |
      }}>
        Increase the number
      </button>
    </>
  );
}

function UnableMovingDot() {
  interface Position {
    x: number;
    y: number;
  }

  const [position, setPosition] = useState<Position>({x: 0, y: 0});

  return (
    <div 
      onPointerMove={(e) => {
        position.x = e.clientX;
        position.y = e.clientY;

        // This code modifies the object assigned to 'position' from the
        // previous render. But without using the state setting function,
        // React has no idea that object has changed.
      }}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        border: "solid 3pt"
      }}
    >
      <div 
        style={{
          position: "absolute",
          backgroundColor: "red",
          borderRadius: "50%",
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20
        }}
      />
    </div>
  );
}

function AbleMovingDot() {
  interface Position {
    x: number;
    y: number;
  }
  
  const [position, setPosition] = useState<Position>({x: 0, y: 0});

  return (
    <div 
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });

        // The '...' spread syntax is "shallow copy", it only copies
        // things one level deep. This makes it fast, but it also
        // means that if you want to update a nested property, you'll
        // have to use it more than once.
      }}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        border: "solid 3pt"
      }}
    >
      <div 
        style={{
          position: "absolute",
          backgroundColor: "red",
          borderRadius: "50%",
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20
        }}
      />
    </div>
  );
}

function AddingInteractivity() {
  return (
    <>
      <PropagationToolbar />
      <NoPropagationToolbar />
      <CapturePropagationToolbar />

      <DefaultForm />
      <PreventDefaultForm />

      <CounterSetMultipleTimes1 />
      <CounterSetMultipleTimes2 />
      <CounterSetMultipleTimes3 />

      <UnableMovingDot />
      <AbleMovingDot />
    </>
  );
}

export default AddingInteractivity;