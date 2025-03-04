import React, {
  useRef,
  useState
} from "react";

// When you want a component to "remember" some information, but you don't
// want that information to trigger new renders, you can use a *ref*

// Inside you component, call the 'useRef' hook and pass the initial value
// that you want to reference as the only argument. You can access the 
// current value of that ref through the 'ref.current' property

function Counter() {
  let ref = useRef<number>(0);  // ref: React.RefObject<number>

  function handleClick() {
    ref.current = ref.current + 1;
    alert("You clicked " + ref.current + " times!");
  }

  // This value is intentionally mutable, meaning you can both read and
  // write to it. It's like a secret pocket of your component the React
  // doesn't track. Unlike state, 'ref' is a plain JavaScript object 
  // with the 'current' property that you can read and modify. Note that
  // the component doesn't re-render with every increment. Like state,
  // refs are retained by React between re-renders. However, setting
  // state re-renders a component, changing a ref does not!

  return (
    <>
      <button onClick={handleClick}>
        Click me! (The ref value in alert function will be updated.)
      </button>
      <button>
        You clicked {ref.current} times. (The ref value in component will 
        not be updated.)
      </button>
    </>
  );

  // Typically, you will use a ref when your component needs to step
  // outside React and communicate with external APIs -- often a browser
  // API that won't impact the appearance of the component.
}

// To access a DOM node managed by React, first, import the 'useRef' hook
// then use it to declare a ref inside your component. Finally pass your
// ref as the 'ref' attribute to the JSX tag for which you want to get
// the DOM node

// The 'useRef' hook returns an object with a single property called current.
// Initially, 'ref.current' will be 'null'. When React creates a DOM node
// for this element, React will put a reference to this node into 'ref.current'.
// You can then access the DOM node from your event handlers and use the
// built-in browser APIs defined on it.

function AutoFocus() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}

// Hooks must only be called at the top-level of your component. You can't call
// 'useRef' in a loop, in a condition, or inside a 'map()' call.

// One possible way around this is to get a single ref to their parent element,
// and then use DOM manipulation methods like 'querySelectorAll' to find the
// individual child nodes from it.

// Another solution is to pass a function to the 'ref' attribute. This is called
// a 'ref' callback. React will call your ref callback with the DOM node when
// it's time to set the ref, and with 'null' when it's time to clear it. This
// lets you maintain your own array or a 'Map', and access any ref by its index
// or some kind of ID.

function CatFriends() {
  function setUpCatList(): string[] {
    const catList: string[] = [];
    for (let i: number = 0; i < 10; ++i) {
      catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
    }

    return catList;
  }

  const itemsRef = useRef<Map<string, HTMLLIElement> | null>(null);
  const [catList, setCatList] = useState<string[]>(setUpCatList());

  // In this example, 'itemsRef' doesn't hold a single DOM node.
  // Instead, it holds a Map from item ID to ad DOM node. The ref
  // callback

  function getMap(): Map<string, HTMLLIElement> {
    if (!itemsRef.current) {
      itemsRef.current = new Map<string, HTMLLIElement>();
    }
    return itemsRef.current;
  }

  function scrollToCat(cat: string) {
    const map: Map<string, HTMLLIElement> = getMap();
    const node: HTMLLIElement | undefined = map.get(cat);

    node?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Neo</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie</button>
        <button onClick={() => scrollToCat(catList[9])}>Bella</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              ref={(node) => {
                const map: Map<string, HTMLLIElement> = getMap();
                if (node) {
                  map.set(cat, node);
                }

                return () => {
                  map.delete(cat);
                };
              }}
            >
              <img src={cat} alt="This is a cute cat!" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function EscapeHatches() {
  return (
    <>
      <Counter />
      <AutoFocus />
      <CatFriends />
    </>
  );
}

export default EscapeHatches;