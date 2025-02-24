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

// Consider a nested object structure like this:

function NestedObject() {
  interface Person {
    name: string;
    artwork: {
      title: string;
      city: string;
      image: string;
    }
  }

  const [person, setPerson] = useState<Person>({
    name: "Niki de Saint Phalle",
    artwork: {
      title: "Blue Nana",
      city: "Hamburg",
      image: "https://i.imgur.com/Sd1AgUOm.jpg"
    }
  });

  // In React, you treat state as immutable! In order to change 'city', you
  // would first need to produce the new 'artwork' object and then produce
  // the new person object which points at the new 'artwork'

  const nextArtwork: typeof person.artwork = { ...person.artwork, city: "New Delhi" };
  const nextPerson: Person = { ...person, artwork: nextArtwork };
  setPerson(nextPerson);

  // or we can write it as:

  setPerson({
    ...person,
    artwork: {
      ...person.artwork,
      city: "New Delhi"
    }
  });

  // 'nesting' is an inaccurate way to think about how objects behave. When the code
  // executes, there is no such thing as a "nested" object. You are really looking at
  // two different objects

  let object1: typeof person.artwork = {
    title: "Blue Nana",
    city: "Hamburg",
    image: "https://i.imgur.com/Sa1AguOm.jpg"
  };

  let object2: Person = {
    name: " Niki de Saint Pahlle",
    artwork: object1
  };

  let object3: Person = {
    name: "Copycat",
    artwork: object1
  };

  // If you were to mutate 'object3.artwork.city', it would affect both 'object2.artwork.city'
  // and 'object1.city'. This is because they are the same object, they are separate objects
  // pointing at each other with properties.
}

// Arrays are mutable in JavaScript, but you should treat them as immutable when you 
// store them in state.

// 1. Adding to an array
//    'push()' will mutate an array, which you don't want. Instead, create a
//    new array which contains the existing items and a new item at the end.
//    There are multiple ways to do this, but the easiest one is to use the
//    '...' array spread syntax.

function ArrayAdding() {
  interface Artist {
    name: string;
    id: number;
    age: number;
  }

  const [artists, setArtists] = useState<Artist[]>([]);
  let nextID: number = 0;

  setArtists([
    ...artists,
    {
      name: "AshGrey",
      id: nextID++,
      age: 21
    }
  ]);
}

// 2. Removing from an array
//    The easiest way to remove an item from an array is to filter it out.
//    In other words, you will produce a new array that will not contain
//    that item. To do this, use the 'filter' method.

function ArrayRemoving() {
  interface Artist {
    name: string;
    id: number;
    age: number;
  }

  let initialArtists: Artist[] = [
    { name: "Marta Colvin Andrade",  id: 0, age: 21 },
    { name: "Lamidi Olonade Fakeye", id: 1, age: 32 },
    { name: "Louise Nevelson",       id: 2, age: 34 }
  ];

  const [artists, setArtists] = useState<Artist[]>(initialArtists);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map((artist) => {
          return (
            <li key={artist.id}>
              {artist.name}{" "}
              <button onClick={() => {
                setArtists(
                  artists.filter(a => a.id !== artist.id)
                );
              }}>
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </>
  );
}

// 3. Transforming an array
//    If you want to change some or all items of the array, you can use
//    map() to create a new array.

function ArrayTransforming() {
  interface Shape {
    id: number;
    type: 
      | "circle"
      | "square";
    x: number;
    y: number;
  }

  let initialShapes: Shape[] = [
    { id: 0, type: "circle", x: 50,  y: 100 },
    { id: 1, type: "square", x: 150, y: 100 },
    { id: 2, type: "circle", x: 250, y: 100 }
  ];
  const [shapes, setShapes] = useState<Shape[]>(initialShapes);

  function handleClick() {
    const nextShapes: Shape[] = shapes.map((shape) => {
      if (shape.type === "square") {
        return shape;
      } else {
        return {
          ...shape,
          y: shape.y + 50
        };
      }
    });

    setShapes(nextShapes);
  }

  return (
    <div className="container">
      <button onClick={handleClick}>
        Move circles down!
      </button>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          style={{
            background: "purple",
            position: "absolute",
            left: shape.x,
            top: shape.y,
            borderRadius: shape.type === "circle" ? "50%" : "",
            width: 20,
            height: 20
          }}
        />
      ))}
    </div>
  );
}

// 4. Replacing items in an array
//    It is particularly common to want to replace one or more items in an array.
//    Assignments like array 'arr[0] = "bird"' are mutating the original array, so
//    instead you'll want to use 'map' for this as well.

function ArrayReplacing() {
  let initialCounters: number[] = [0, 0, 0];
  const [counters, setCounters] = useState<number[]>(initialCounters);

  function handleIncrementClick(index: number) {
    const nextCounters: number[] = counters.map((c, i) => i === index ? c + 1 : c);
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => handleIncrementClick(i)}>
            +1
          </button>
        </li>
      ))}
    </ul>
  );
}

// 4. Inserting into an array
//    Sometimes you may want to inset an item at a particular position that's
//    neither at the beginning nor at the end. To do this, you can use the '...'
//    array spread syntax together with the 'slice()' method.

function ArrayInserting() {
  interface Artist {
    id: number;
    name: string;
    age: number;
  }
  let nextID: number = 3;
  let initialArtists: Artist[] = [
    { name: "Marta Colvin Andrade",  id: 0, age: 21 },
    { name: "Lamidi Olonade Fakeye", id: 1, age: 32 },
    { name: "Louise Nevelson",       id: 2, age: 34 }
  ];

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(18);
  const [artists, setArtists] = useState<Artist[]>(initialArtists);

  function handleClick() {
    const insertAt: number = 1;
    const nextArtists: Artist[] = [
      ...artists.slice(0, insertAt),            // Items before the insertion point
      { id: nextID++, name: name, age: age },   // New item
      ...artists.slice(insertAt)                // Items after the insertion point
    ];
    setArtists(nextArtists);
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input 
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="age"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
      />
      <button onClick={handleClick}>
        Insert
      </button>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
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

      <ArrayRemoving />
      <ArrayTransforming />
      <ArrayReplacing />
      <ArrayInserting />
    </>
  );
}

export default AddingInteractivity;