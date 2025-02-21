import React from "react";

// If we use interface to limit the type of props in component function,
// and we need to let some properties to have default values, we must
// destructure the props into some properties. If we don't need the
// default values, just using 'prop' as parameter is also acceptable

interface HaveDefaultValuesPropType {
  category:
    | "Fruits"
    | "Vegetables"
    | "Milk";
  price: string;
  stocked: boolean;
  name: string;
  fresh?: boolean;
}

function HaveDefaultValues({
  category,
  price,
  stocked,
  name,
  fresh = true  // The default value is true
}: HaveDefaultValuesPropType) {
  return (
    <p>{name + " is " + (fresh ? "fresh" : "not so fresh")}</p>
  )
}

// Where to get your 'key'
// Different sources of data provide different sources of keys
//   + Data from a database: If your data is coming from a database,
//     you can use the database keys / IDs, which are unique by nature
//   + Locally generated data: If your data is generated and persisted
//     locally (e.g. notes in a note-taking app), using an incrementing
//     counter, like 'crypto.randomUUID()' or a package like 'uuid'
//     when creating items.

// + Keys must be unique among siblings. It's okay to use the same keys
//   for JSX nodes in different arrays.
// + Keys must not change or that defeats their purpose. Don't generate
//   them while rendering

interface Person {
  id: number;
  name: string;
  profession: 
    | "mathematician"
    | "chemist"
    | "physicist"
    | "astrophysicist";
  accomplishment: string;
  imageID: string;
}

function getImageURL(person: Person): string {
  return (
    "https://i.imgur.com" +
    person.imageID + 
    "s.jpg"
  )
}

function PeopleList() {
  const PEOPLE: Person[] = [{
    id: 0,
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
    accomplishment: 'spaceflight calculations',
    imageID: 'MK3eW3A'
  }, {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
    accomplishment: 'discovery of Arctic ozone hole',
    imageID: 'mynHUSa'
  }, {
    id: 2,
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
    accomplishment: 'electromagnetism theory',
    imageID: 'bE7W1ji'
  }, {
    id: 3,
    name: 'Percy Lavon Julian',
    profession: 'chemist',
    accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
    imageID: 'IOjWm71'
  }, {
    id: 4,
    name: 'Subrahmanyan Chandrasekhar',
    profession: 'astrophysicist',
    accomplishment: 'white dwarf star mass calculations',
    imageID: 'lrWQx8l'
  }];

  const chemists: Person[] = PEOPLE.filter(person => 
    person.profession === "chemist"
  );
  const everyoneElse: Person[] = PEOPLE.filter(person =>
    person.profession !== "chemist"
  );

  return (
    <article>
      <h1>Scientists</h1>
      <h2>Chemists</h2>
      <ul>
        {chemists.map(person =>
          <li key={person.id}>
            <img 
              src={getImageURL(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {" " + person.profession + " "}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
      <h2>Everyone Else</h2>
      <ul>
        {everyoneElse.map(person =>
          <li key={person.id}>
            <img 
              src={getImageURL(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {" " + person.profession + " "}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </article>
  );
}

// Some JavaScript functions are pure. Pure functions only perform a
// calculation and nothing more. By strictly only writing your components
// and nothing more. By strictly only writing your components as pure
// functions, you can avoid an entire class of baffling bugs.

// A pure function is a function with the following characteristics:
//   + It minds its own business. It does not change any objects or
//     variables that existed before it was called.
//   + Same inputs, same output. Given the same inputs, a pure function
//     should always return the same result.

// React's rendering process must always be pure. Components should only
// return their JSX, and not change any objects or variables that existed
// before rendering.

let guestNum: number = 0;

function BreakPureFunction() {
  guestNum = guestNum + 1;
  return <h2>Tea cup for guest #{guestNum}</h2>
}

// This component is reading and writing a 'guestNum' variable declared
// outside it. This means that calling this component multiple times
// will produce different 'JSX'.

// In React there are three kinds of inputs that you can read while rendering:
// props, state and context. You should always treat these inputs readonly.
// When you want to change something in response to user input, you should
// set state instead of writing to a variable. You should never change pre-
// existing variables or objects while your component is rendering.

// React offers a "Strict Mode" in which it calls each component's function twice
// during development. By calling the component function twice, Strict Mode
// helps find components that break these rules. You can wrap your root component
// into '<React.StrictMode>'. 

// Sometimes something has to change. These changes (updating the screen,
// starting an animation, changing the data) are called side effects.
// In React, side effects usually belong inside event handlers. Event handlers
// don't need to be pure.

// If you've exhausted all other options and can't find the right event handler
// for your side effect, you can still attach it to your return JSX with a
// 'useEffect' call in your component. This tells React to execute it later,
// after rendering, when side effects are allowed.

interface ClockPropType {
  time: Date;
}

function Clock({time}: ClockPropType) {
  let hours: number = time.getHours();
  let className: string;

  if (hours >= 0 && hours <= 6) {
    className = "night";
  } else {
    className = "day";
  }

  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
    </h1>
  )
}

function DescribingUI() {
  return (
    <>
      <HaveDefaultValues
        category="Fruits"
        price="$1"
        stocked={true}
        name="Apple"
      />
      <HaveDefaultValues
        category="Fruits"
        price="$1"
        stocked={true}
        name="Banana"
        fresh={false}
      />
      <PeopleList />
      <BreakPureFunction />
      <BreakPureFunction />
      <BreakPureFunction />
      <Clock time={new Date()}/>
    </>
  )
}

export default DescribingUI;