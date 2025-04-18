import React, { 
  useState,
  useReducer,
  createContext,
  useContext,
  ActionDispatch,
} from "react";

function Form() {
  type Status =
    | "typing"
    | "submitting"
    | "success";
  const [answer, setAnswer] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<Status>("typing");

  if (status === "success") {
    return <h1>That's right!</h1>;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
  }

  function submitForm(answer: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let shouldError: boolean = answer.toLocaleLowerCase() !== "lima";
        if (shouldError) {
          reject(new Error("Good guess but a wrong anser, try again!"));
        } else {
          resolve(1);
        }
      }, 1500);
    });
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable
        water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === "submitting"
        }>
          Submit
        </button>
        {error !== null && 
          <p className="error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

// Don't mirror props in state, a common example of redundant state is
// code like this:

interface RedundantStatePropType {
  messageColor: string;
}

function RedundantState({ messageColor }: RedundantStatePropType) {
  const [color, setColor] = useState<string>(messageColor);

  // Here, a 'color' state variable iis initialized to the 'messageColor'
  // prop. The problem is that if the parent component passes a different
  // value of 'messageColor' later, for example, "red" instead of "blue",
  // the 'color' state variable would not be updated! The state is only
  // initialized during the first render.

  // So instead, use the 'messageColor' prop directly in your code.
}

interface Item {
  title: string;
  id: number;
}

function Menu() {
  const initialItems: Item[] = [
    { title: "pretzels",        id: 0 },
    { title: "crispy seaweed",  id: 1 },
    { title: "granola bar",     id: 2 }
  ]
  const [items, setItems] = useState<Item[]>(initialItems);
  const [selectedID, setSelectedID] = useState<number>(0);

  const selectedItem: Item | undefined = items.find((item) =>
    item.id === selectedID
  );

  function handleItemChange(
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setItems(items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index}>
              <input
                value={item.title}
                onChange={(e) => handleItemChange(item.id, e)}
              />
              {" "}
              <button onClick={() => {setSelectedID(item.id)}}>
                Choose
              </button>
            </li>
          );
        })}
      </ul>
      <p>You picked {selectedItem?.title}. </p>
    </>
  );
}

// If the state is too nested to update easily, considering making it "flat".j
// Here is one way you can restructure this data. Instead of a tree-like structure
// where each 'place' has an array of its child places, you can have each place
// hold an array of its child place IDs. Then store a mapping from each place ID
// to the corresponding place.

interface Place {
  id: number;
  title: string;
  childIDs: number[]
}

interface PlaceTreePropType {
  id: number;
  placesByID: Place[];
}

function PlaceTree({ id, placesByID }: PlaceTreePropType) {
  const place: Place = placesByID[id];
  const childIDs: number[] = place.childIDs;

  return (
    <li>
      {place.title}
      {childIDs.length > 0 && (
        <ol>
          {childIDs.map((childID) => (
            <PlaceTree 
              key={childID}
              id={childID}
              placesByID={placesByID}
            />
          ))}
        </ol>
      )}
    </li>
  );

  // This 'PlaceTree' component is to use recurse to generate the
  // tree component.
}

function TravelPlan() {
  const initialTravelPlan: Place[] = [{
    id: 0,
    title: "(Root)",
    childIDs: [1, 2]
  }, {
    id: 1,
    title: "Asia",
    childIDs: [3, 4]
  }, {
    id: 2,
    title: "Africa",
    childIDs: [5]
  }, {
    id: 3,
    title: "China",
    childIDs: []
  }, {
    id: 4,
    title: "Japan",
    childIDs: []
  }, {
    id: 5,
    title: "South Africa",
    childIDs: []
  }];

  const [plan, setPlan] = useState<Place[]>(initialTravelPlan);
  const root: Place = plan[0];
  const plantIDs: number[] = root.childIDs;

  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {plantIDs.map((id) => (
          <PlaceTree 
            key={id}
            id={id}
            placesByID={plan}
          />
        ))}
      </ol>
    </>
  );
}

// Components with many state updates spread across many event handlers can get
// overwhelming. For these cases, you can consolidate all the state update logic
// outside your component in a single function, called a *reducer*

// As your components grow in complexity, it can get harder to see at a glance
// all the different ways in which a component's state gets updated. For example,
// the 'TaskApp' component below holds an array of 'tasks' in state and uses
// three different event handlers to add, remove, and edit tasks.

interface Task {
  id: number;
  text: string;
  done: boolean;
}

function TaskAppUsingState() {
  const initialTasks: Task[] = [
    { id: 0, text: "Visit Kafka Museum",  done: true  },
    { id: 1, text: "Watch a puppet show", done: false },
    { id: 2, text: "Lennon Wall pic",     done: false }
  ];
  let nextID: number = 2;

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function handleAddTask(text: string) {
    setTasks([
      ...tasks,
      {
        id: nextID++,
        text: text,
        done: false
      }
    ]);
  }

  function handleChangeTask(task: Task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskID: number) {
    setTasks(tasks.filter((t) => t.id !== taskID));
  }
}

// We can migrate from 'useState' to 'useReducer' in three steps:
//   1. *Move* from setting state to dispatching actions.
//   2. *Write* a reducer function
//   3. *Use* the reducer from your component

// 1. Move from setting state to dispatching actions:

// + 'handleAddTask(text)' is called when the user presses "Add"
// + 'handleChangeTask(task)' is called when the user toggles a task or
//   presses "Save"
// + 'handleDeleteTask(taskID)' is called when the user presses "Delete"

type Reducer =
  | { type: "added";   id: number; text: string; }
  | { type: "changed"; task: Task; }
  | { type: "deleted"; id: number; }

function tasksReducer(tasks: Task[], action: Reducer): Task[] {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
  }

  // Reducer actually is named after the 'reduce()' operation that you can
  // perform on arrays.

  const arr: number[] = [1, 2, 3, 4, 5];
  const sum: number = arr.reduce(
    (result, num) => result + num
  );

  // The function you pass to 'reduce' is known as a reducer. It takes the
  // result so far and the current item, then it returns the next result.
  // React reducers are an example of the same idea: they take the state
  // so far and the action, and return the next state.
}

function TaskAppUsingReducer() {
  const initialTasks: Task[] = [
    { id: 0, text: "Visit Kafka Museum", done: true },
    { id: 1, text: "Watch a puppet show", done: false },
    { id: 2, text: "Lennon Wall pic", done: false }
  ];
  let nextID: number = 2;
  const [tasks, dispatch] = useReducer<Task[], [action: Reducer]>(tasksReducer, initialTasks);

  // The 'useReducer' hook is similar to 'useState', you must pass it an
  // initial state and it returns a stateful value and a way to set state
  // (and in this case, the 'dispatch' function.

  function handleAddTask(text: string) {
    dispatch({
      type: "added",
      id: nextID++,
      text: text
    });
  }

  function handleChangeTask(task: Task) {
    dispatch({
      type: "changed",
      task: task
    });
  }

  function handleDeleteTask(taskID: number) {
    dispatch({
      type: "deleted",
      id: taskID
    });
  }
}

// 'useReducer' can help cut down on the code if many event handlers
// modify state in a similar way. When updating states get more complex,
// they can bloat your component's code and make it difficult to scan.
// In this case, 'useReducer' lets you cleanly separate the how of update
// logic from the what happened of event handlers.

// Reducers must be pure. Similar to state updater functions, reducers run
// during rendering. Actions are queued until the next render. This means
// that reducers must be pure -- same inputs always result in the same output.
// They should not send requests, schedule timeouts, or perform any side effects.
// They should update objects and arrays state without mutations.

// Usually, you will pass information from a parent component to a child component
// via props. But passing props can become verbose and inconvenient if you have
// to pass them through many components in the middle, or if many components in your
// app need the same information. 'Context' lets the parent component make
// some information available to any component in the tree below it, no matter
// how deep, without passing it explicitly through props

const LevelContext = createContext<number>(0);

interface HeadingPropType {
  children: React.ReactNode | undefined;
}

function Heading({ children }: HeadingPropType) {
  const level: number = useContext<number>(LevelContext);

  // 'useContext' tells React that the 'Heading' component wants to read
  // the 'LevelContext'. That would require some way for a child to ask
  // for data from somewhere above in the tree.

  // 1. Create a context, you can call it 'LevelContext', since it's for 
  //    the heading level.
  // 2. Use that context from the component that needs the data. 'Heading'
  //    will use 'LevelContext'
  // 3. Provide that context from the component that specifies the data.
  //    'Section' will provide 'LevelContext'

  return (
    <>
      {
        level === 1 
          ? ( <h1>{children}</h1> ) 
          : level === 2 
          ? ( <h2>{children}</h2> ) 
          : level === 3 
          ? ( <h3>{children}</h3> ) 
          : ( <p> {children}</p> )
      }
    </>
  );
}

interface SectionPropType {
  children: React.ReactNode | undefined;
}

function Section({ children }: SectionPropType) {
  const level: number = useContext<number>(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );

  // Wrap them with a context provider to provide the 'LevelContext' to them.
  // If any component inside this '<Section>' asks for 'LevelContext', give
  // them this 'level'. The component will use the value of the nearest
  // '<LevelContext>' in the UI tree above it.

  // 'Section' now also reads the context from its parent tree, both 'Heading'
  // and 'Section' read the 'LevelContext' to figure out how deep they are.
  // And the 'Section' wraps its children into the 'LevelContext' to specify that
  // anything inside of it as a deeper level.
}

// Use cases for context
// 1. Theming: If your app lets the user change its appearance like dark mode,
//    you can put a context provider at the top of you app, and use that context
//    in components that need to adjust their visual look
// 2. Current account: Many components might need to know the currently logged in
//    user. Putting it in context makes it convenient to read it anywhere in the
//    tree. Some apps also let you operate multiple accounts at the same time. In
//    those cases, it can be convenient to wrap a part of the UI into a nested
//    provider with a different current account value.

function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
        </Section>
      </Section>
    </Section>
  );
}

// When you have tens or hundreds of components in the middle, passing down all
// state and functions can be quite frustrating! As an alterative to passing them
// through props, you might want to put both the 'tasks' state and the 'dispatch'
// function into context.

function tasksContextReducer(tasks: Task[], action: Reducer): Task[] {
  switch (action.type) {
    case "added": {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
  }
}

const TasksContext = createContext<Task[]>([]);
const TasksDispatchContext = createContext<ActionDispatch<[action: Reducer]>>(() => {});

const initialTasks: Task[] = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false }
];
let nextID: number = 2;

function AddTask() {
  const [text, setText] = useState<string>("");
  const dispatch 
    = useContext<React.ActionDispatch<[action: Reducer]>>(TasksDispatchContext);

  return (
    <>
      <input 
        type="text" 
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => {
        setText("");
        dispatch({
          type: "added",
          id: nextID++,
          text: text
        });
      }}>
        Add
      </button>
    </>
  );
}

interface TaskComponentPropType {
  task: Task;
}

function TaskComponent({ task }: TaskComponentPropType) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch
    = useContext<React.ActionDispatch<[action: Reducer]>>(TasksDispatchContext);
  let taskContent: React.ReactNode | undefined = undefined;

  if (isEditing) {
    taskContent = (
      <>
        <input 
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                text: e.target.value
              }
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }

  return (
    <label>
      <input 
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: "changed",
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: "deleted",
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}

function TaskList() {
  const tasks = useContext<Task[]>(TasksContext);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskComponent task={task} />
        </li>
      ))}
    </ul>
  )
}

function TaskAppUsingContextReducer() {

  const [tasks, dispatch]
    = useReducer<Task[], [action: Reducer]>(tasksContextReducer, initialTasks);

  // The 'TaskAppUsingContextReducer' doesn't need pass any event handlers to the
  // 'Task' component either. Each component reads the context that it needs.
  
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function ManagingState() {
  return (
    <>
      <Form />
      <Menu />
      <TravelPlan />
      <Page />
      <TaskAppUsingContextReducer />
    </>
  );
}

export default ManagingState;