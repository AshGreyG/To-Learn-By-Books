import React, { 
  useState,
  useReducer
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
  let nextID: number = 3;

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

function TaskAppUsingReducer() {
  
}

function ManagingState() {
  return (
    <>
      <Form />
      <Menu />
      <TravelPlan />
    </>
  )
}

export default ManagingState;