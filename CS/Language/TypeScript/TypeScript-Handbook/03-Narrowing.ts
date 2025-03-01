function padLeft(
  padding: number | string,
  input: string
): string {
  // return " ".repeat(padding) + input; // uncomment here
  //                   ^^^^^^^
  // Argument of type 'string | number' is not assignable to parameter
  // of type 'number'. Type 'string' is not assignable to type 'number'
  //
  // TypeScript is warning us that we're passing a value with type
  // 'number | string' to the 'repeat' function, which only accepts a
  // 'number'.

  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  } else {
    return padding + input;
  }
}

console.log(padLeft(12, "test_1"));
console.log(padLeft("test_2+", "test_1"));

// JavaScript supports a 'typeof' operator which can give very basic
// information about the type of values we have at runtime. TypeScript
// expects this to return a certain set of strings:
//
// + "string"
// + "number"
// + "bigint"
// + "boolean"
// + "symbol"
// + "undefined"
// + "object"
// + "function"
//
// Notice 'typeof null' actually returns "object"

function printAll(
  strs:
    | string
    | string[]
    | null
) {
  if (typeof strs === "object" /* && strs */) {
    // for (const s of strs) { console.log(s); }  // uncomment here
    //                 ^^^^
    // 'strs' is possibly 'null'

  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

printAll(["123", "234", "345"]);
printAll("abcde");
printAll(null);

// In JavaScript, constructs like 'if' first coerce their conditions
// to 'boolean's to make sense of them, and then choose their branches
// depending on whether the result if 'true' or 'false'. Values like
//
// + '0'
// + 'NaN'
// + '""'
// + '0n'
// + 'null'
// + 'undefined'
//
// all coerce to 'false', and other values get coerced to 'true'

// When we assign to any variable, TypeScript looks at the right
// side of the assignment and narrows the left side appropriately.

function testTwoTypes(): string | number {
  let x: string | number | boolean;
  x = Math.random() < 0.5;
  console.log(x);   // let x: boolean

  if (Math.random() < 0.5) {
    x = "hello world";
    console.log(x); // let x: string
  } else {
    x = 100;
    console.log(x); // let x: number
  }
  return x;         // let x: string | number
}

function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;                        // let values: undefined
  } else {
    return values.map((x) => x * factor); // let values: number[]
  }
}

// TypeScript also uses 'switch' statements and equality checks like
//
// + '==='
// + '!=='
// + '=='
// + '!='
//
// to **narrow** types.

function testEqualityNarrowing(
  x: string | number,
  y: string | boolean
): void {
  if (x === y) {
    x.toUpperCase();  // let x: string
    y.toLowerCase();  // let y: string

    // When we checked that 'x' and 'y' are both equal in the above example,
    // TypeScript knew their types also had to be equal. Since 'string' is
    // the only **common type** that both 'x' and 'y' could take on.
  } else {
    console.log(x); // let x: string | number
    console.log(y); // let y: string | boolean
  }
}

// JavaScript looser equality checks with '==' and '!=' also get narrowed 
// correctly. Checking something '== null' actually not only checks whether
// it is specifically the value 'null', it also checks whether it is
// potentially 'undefined'.

interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  if (container.value != null) {
    console.log(container.value);
    //                    ^^^^^
    // (property) Container.value: number

    container.value *= factor;
  }
}

// JavaScript has an operator for determining if an object or its
// prototype chain has a property with a name: the 'in' operator. 
// TypeScript takes this into account as a way to narrow down potential
// types.
//
// '"value" in x' where '"value"' is a string literal and 'x' is a union
// type. The "true" branch narrows 'x''s types which have either an
// optional or required property 'value', and the "false" branch narrows
// to types which have an optional or missing property 'value'

type Fish = {
  swim: () => void;
  name?: string;
};

type Bird = {
  fly: () => void;
  name?: string;
};

type Human = {
  swim?: () => void;
  fly?: () => void;
  name?: string;
}

function move1(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim(); // let animal: Fish
  } else {
    return animal.fly();  // let animal: Bird
  }
}

function move2(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal; // (parameter) animal: Fish | Human
  } else {
    animal; // (parameter) animal: Bird | Human
  }
}

// JavaScript has an operator for checking whether or not a value is an
// "instance" of another value. More specifically, in JavaScript
// 'x instanceof Foo' checks whether the **prototype** chain of 'x'
// contains 'Foo.prototype'. 

function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString()); // let x: Date
  } else {
    console.log(x.toUpperCase()); // let x: string
  }
}

function isFish(pet: Fish | Bird): pet is Fish {

  // To define a user-defined type guard, we simply need to define a function
  // whose type is a **type predicate**. 'pet is Fish' is out type predicate
  // in this example. A predicate takes the form
  //
  // parameterName is Type
  //
  // where 'parameterName' must be the name of a parameter from the current
  // function signature

  return (pet as Fish).swim !== undefined;
}

function getSmallPet(): Fish | Bird {
  let smallFish: Fish = {
    swim: function() { }
  };
  let smallBird: Bird = {
    fly: function() { }
  };
  
  if (Math.random() < 0.5) {
    return smallFish;
  } else {
    return smallBird;
  }
}

let pet: Fish | Bird = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// Any time 'isFish' is called with some variable, TypeScript
// will **narrow** that variable to that specific type if the
// original type is compatible.

const zoo: Array<Fish | Bird> = [];

for (let i = 1; i <= 30; ++i) {
  zoo.push(getSmallPet());
}

const underWater1: Fish[] = zoo.filter(isFish);
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
const underWater3: Fish[] = <Fish[]>(zoo.filter(isFish));
const underWater4: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "ray") return false;
  return isFish(pet);
});

interface Shape1 {
  kind:
    | "circle"
    | "square"
    | "ellipse";
  radius?: number;
  sideLength?: number;
  minorAxis?: number;
  majorAxis?: number;
}

function getArea1(shape: Shape1): number {
  switch(shape.kind) {

    // case "circle" : return Math.PI * shape.radius ** 2;  // uncomment here
    //                                  ^^^^^^^^^^^^
    // 'shape.radius' is possibly 'undefined'

    case "circle"  : return Math.PI * shape.radius! ** 2;
    case "square"  : return shape.sideLength! ** 2;
    case "ellipse" : return Math.PI * shape.majorAxis! * shape.minorAxis!;

    // But this doesn't feel ideal. We had to shout a bit at the type-checker
    // with those non-null assertions '!' to convince those properties are
    // not 'null' or 'undefined'
  }
}

// The problem with this encoding of 'Shape1' is that the type-checker
// doesn't have any way to know whether or not 'radius' or 'sideLength'
// are present based on the 'kind' property. We need to communicate what
// we know to the type-checker.

interface Circle2 {
  kind: "circle";
  radius: number;
}

interface Square2 {
  kind: "square";
  sideLength: number;
}

interface Ellipse2 {
  kind: "ellipse";
  majorAxis: number;
  minorAxis: number;
}

type Shape2 =
  | Circle2
  | Square2
  | Ellipse2;

function getArea2(shape: Shape2) {
  switch (shape.kind) {

    // When every type in a union contains a common property with literal
    // types , TypeScript considers that to be a **discriminated union**,
    // and can narrow out the members of the union.
    //
    // Here 'kind' was that common property, which is what's considered
    // a **discriminated** property of 'Shape2'.

    case "circle"  : return Math.PI * shape.radius ** 2;                  // let shape: Circle2
    case "square"  : return shape.sideLength ** 2;                        // let shape: Square2
    case "ellipse" : return Math.PI * shape.majorAxis * shape.minorAxis;  // let shape: Ellipse2
    default : 
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;

      // The 'never' type is assignable to every type, no type is
      // assignable to 'never', except 'never' itself. This means
      // we can use narrowing and rely on 'never' turning up to 
      // do exhaustive checking in a 'switch' statement.
      //
      // Using 'never' will not raise an error when every possible
      // case has been handled.
  }
}


