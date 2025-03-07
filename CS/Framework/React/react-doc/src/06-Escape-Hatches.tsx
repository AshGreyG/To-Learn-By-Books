import React, {
  useEffect,
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

// Challenge 1 Play and pause the video

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  function handleClick() {
    if (videoRef && !isPlaying) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else if (videoRef && isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }

  // Because we need the button component to show the current status of
  // HTMLVideoElement, but using a ref can't do that, so we need an extra
  // state.

  return (
    <>
      <button onClick={handleClick}>
        { isPlaying ? "Pause" : "Play" }
      </button>
      <video 
        width="250"
        ref={videoRef}
      >
        <source 
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  )
}

// Some components need to synchronize with external systems. For
// example, you might want to control a non-React component based
// on the React state, set up a server connection, or send an analytics
// log when a component appears on the screen. *Effects* let you run
// some code after rendering so that you can synchronize your component
// with some system outside of React.

// Effects let you specify side effects that are caused by rendering itself,
// rather than by a particular event. Sending a message in the chat is an
// event because it is directly caused by the user clicking a specific
// button. However, setting up a server connection is an Effect because it
// should happen no matter which interaction caused the component to appear.
// Effects run at the end of a commit after the screen updates.

// 1. Declare an Effect:

function VideoPlayerUsingEffect() {
  useEffect(() => {
    // Code here will run after *every* render
  }, []);

  // Every time your component renders, React will update the screen and then
  // run the code inside 'useEffect'. In other words, 'useEffect' delays a
  // piece of code from running until that render is reflected on the screen.

  // You can tell React to skip unnecessarily re-running the Effect by 
  // specifying an array of dependencies as the second argument to the
  // 'useEffect' call

  // Your dependency array is []. This tells React to only run this code when
  // the component *mounts* (appears on the screen for the first time)

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (isPlaying) {
      console.log("Calling video.pause()");
      videoRef.current?.pause();
    } else {
      console.log("Calling video.play()");
      videoRef.current?.play();
    }
  }, [isPlaying, videoRef]);

  // 2. Deal with the dependencies

  // The dependency array can contain multiple dependencies. React will only
  // skip re-running the Effect if all of the dependencies you specify have
  // exactly the same values as they had during the previous render.

  // 'videoRef' object has a stable identity: React guarantees you'll always
  // get the same object from the same 'useRef' call on every render. It never
  // changes, so it will never by itself cause the Effect to re-run. Therefore,
  // it does not matter whether you include it or not.

  return (
    <>
      <input 
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        { isPlaying ? "Pause" : "Play" }
      </button>
      <video 
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        ref={videoRef}
      />
    </>
  );
}

interface Connection {
  connect: () => void;
  disconnect: () => void;
}

function createConnection(): Connection {
  return {
    connect() {
      alert("✅ Connecting...");
    },
    disconnect() {
      alert("❌ Disconnected.");
    }
  };
}

function ChatRoom() {
  useEffect(() => {
    const connection: Connection = createConnection();
    connection.connect();

    // 3. Add cleanup function

    // The first connection was never destroyed! As the user navigates
    // across the app, the connections would keep pilling up. To fix
    // connect twice error, return a *cleanup function* from this Effect

    return () => {
      connection.disconnect();
    };

    // Then we would see
    // ✅ Connecting...
    // ❌ Disconnected.
    // ✅ Connecting...
    //
    // Remounting components only happens in development to help you find
    // Effects that need cleanup.
  }, []);
  return <h1>Welcome to the chat room!</h1>
}

function EscapeHatches() {
  return (
    <>
      <Counter />
      <AutoFocus />
      <CatFriends />
      <VideoPlayer />
      <VideoPlayerUsingEffect />
      <ChatRoom />
    </>
  );
}

export default EscapeHatches;