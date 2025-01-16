let testString: string = "This is test for 'string' type";
let testInteger: number = 12;
let testFloat: number = 12.3;
let testBoolean: boolean = true;

// + 'string' represents string values like "Hello World.".
// + 'number' is for numbers like '42'. JavaScript does not
//   have a special runtime value for integers, so there's
//   no equivalent to 'int' or 'float' - everything is
//   simply 'number'.
// + 'boolean' is for the two values 'true' and 'false'

// The type names 'String', 'Number' and 'Boolean' are legal, 
// but refer to some special built-in types that will rarely
// appear in out code. Always use 'string', 'number' and
// 'boolean'

let testNumberArray1: number[] = [1, 2, 3, 1.5];
let testNumberArray2: Array<number> = [2, 1, -3.4];

// Syntax 'T<U>' we call **generics**.

let testAny: any = { x: 0 };
testAny.foo();
testAny();
testAny.testAttribute = 100;
const testAssign: number = testAny;

// None of the following lines of code will throw compiler errors
// Using 'any' disables all further type checking

// When we don't specify a type, and TypeScript can't infer it from
// context, the compiler will typically default to 'any'. To avoid
// this, use the compiler flag 'noImplicitAny' to flag any implicit
// 'any' as an error.

function testFunction(): number {
  let testNumberForFunction: number = 123;
  return testNumberForFunction;
}

// Type annotations for functions is usually used for documentation
// purposes, to prevent accidental changes.

async function testAsyncFunction(): Promise<number> {
  return 123;
}

// To annotate the return type of a function which returns a promise,
// we should use the 'Promise' type.

const names: Array<string> = ["Huaier", "AshGrey", "Ray"];
names.forEach((name) => {

  // TypeScript can infer the type of 'name' is 'string',
  // and it can infer the type of this anonymous function:
  //
  // function(name: string): void
  //
  // This process if called **contextual typing** because the
  // context that the function occurred within informs what
  // type it should be.

  console.log(name.toUpperCase());
});

function pointCoord(point: { x: number, y: number; }) {
  console.log("The coordinate's x value is " + point.x);
  console.log("The coordinate's y value is " + point.y);
}

pointCoord({ x: 3, y: 5});

// We annotated the parameter with a type with two properties
// 'x' and 'y', which are both of type 'number'. We can use
// ';' or ',' to separate the properties.

function printName(name: {first: string, last: string }) {
  console.log(name.last.toUpperCase());

  if (name.last !== undefined) {
    console.log(name.last.toUpperCase());

    // OK, but complicated
  }

  console.log(name.last?.toUpperCase());

  // A safer alternative using modern JavaScript syntax
}

function printID(id: number | string) {
  console.log("Your ID is: " + id);
}

printID(2022012050);
printID("219280");

// A **union type** is a type formed from two or more other
// types, representing values that may be **any one** of
// those types. We refer to each of these types as the union's
// **members**. Such as
//
// number | string

function testTextOrNumberOrBoolean(
  textOrNumberOrBool:
    | string
    | number
    | boolean
) {
  console.log(textOrNumberOrBool);
}

function testPrintID(id: number | string) {
  // console.log(id.toUpperCase()); // uncomment here
  //                ^^^^^^^^^^^
  // Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.
  //
  // The solution is to narrow the union with 'typeof'

  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

// The name 'union' comes from type theory. Notice that given
// two sets with corresponding facts about each set, only the
// **intersection** of those facts applies to the **union** of
// the sets themselves.

type Point = {
  x: number;  // We can use ',' or ';'
  y: number;
};
type ID = number | string;
type TextOrNumberOrBool =
  | string
  | number
  | boolean;

// A **type alias** is exactly a name for any type

function anotherPointCoord(point: Point) {
  console.log("The coordinate's x value is " + point.x);
  console.log("The coordinate's y value is " + point.y);
}

anotherPointCoord({ x: 100, y: 200.0} );

interface InterfacePoint {
  x: number;
  y: number;
}

// An **interface declaration** is another way to name an object type

const testCanvas = document.getElementById("main-canvas") as HTMLCanvasElement;

// Sometimes we will have information about the type of a value
// that TypeScript can't know about. If we are using 'document.
// getElementByID', TypeScript only knows that this will return
// some kind of HTMLElement, but we might know that our page will
// always have an HTMLCanvasElement with a given ID.
//
// In this situation, we can use a **type assertion** to specify
// a more specific type:
//
// interface HTMLCanvasElement extends HTMLElement

const anotherCanvas = <HTMLCanvasElement>document.getElementById("main-canvas");

// const testImpossible = "AshGrey" as number; // uncomment here
//                        ^^^^^^^^^^^^^^^^^^^
// Conversion of type 'string' to type 'number' may be a mistake 
// because neither type sufficiently overlaps with the other. 
// If this was intentional, convert the expression to 'unknown' first
//
// It is impossible to convert string to number

const testTwoAssertions1 = "1234" as any as number;
const testTwoAssertions2 = "1234" as unknown as number;

// We can use two assertions, fist to 'any' or 'unknown', then to the
// desires type. TypeScript won't throw any compiler errors, and it
// will generate the JavaScript code like:
//
// "use strict";
// const testTwoAssertions = "1234";  // no type info

let testLiteral: "hello" = "hello";
// testLiteral = "now"; // uncomment here
// ^^^^^^^^^^
// Type '"now"' is not assignable to type '"hello"'
// 
// This is the literal type, and it can only have one value

function testLiteralFunction(
  text: string,
  alignment:
    | "left"
    | "right"
    | "center"
) {
  console.log(`${text} now is ${alignment}`);
}

testLiteralFunction("test", "center");
testLiteralFunction("1234", "left");
// testLiteralFunction("+---", "centre"); // uncomment here
//                             ^^^^^^^^
// Argument of type '"centre"' is not assignable to parameter of 
// type '"left | right | center"'.

// 'boolean' itself is actually just an alias for the union 'true | false'

declare function handleRequest(url: string, method: "GET" | "POST"): void;
const req1 = {
  url: "https://example.com",
  method: "GET"
};
// handleRequest(req.url, req.method); // uncomment here
//                        ^^^^^^^^^^
// Argument of type 'string' is not assignable to parameter of
// type '"GET" | "POST"'.

const req2 = {
  url: "https://example.com",
  method: "GET" as "GET"
};
handleRequest(req2.url, req2.method);

const req3 = {
  url: "https://example.com",
  method: "GET"
};
handleRequest(req3.url, req3.method as "GET");

const req4 = {
  url: "https://example.com",
  method: "GET"
} as const;

// The 'as const' suffix acts like const but for the type system, ensuring
// that all properties are assigned the literal type instead of a more
// general version like 'string' or 'number':
//
// const req4: {
//   readonly url: "https://example.com",
//   readonly method: "GET"
// }

handleRequest(req4.url, req4.method);

// JavaScript has two primitive values used to signal absent or uninitialized
// value: 'null' and 'undefined'. TypeScript has two corresponding types by
// the same names. With 'strictNullChecks' on, when a value is 'null' or 
// 'undefined', we will need to test for those values before using methods or
// properties on that value. Just like checking for 'undefined' before using
// an optional property.

function dangerous(input?: number | null) {
  console.log(input!.toFixed());

  // We can use '!.' syntax to remove 'null' and 'undefined' from a type 
  // without doing any explicit checking. Writing '!.' after any express-
  // ion is effectively a type assertion that the value isn't 'null' or
  // 'undefined'
}
dangerous(null);

const oneHundred: bigint = BigInt(100);
const anotherHundred: bigint = 100n;

const firstName: symbol = Symbol("name");
const secondName: symbol = Symbol("name");