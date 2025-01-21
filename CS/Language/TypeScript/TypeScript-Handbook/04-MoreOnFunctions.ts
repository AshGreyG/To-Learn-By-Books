function testFunctionType1(fn: (a: string) => void) {
  fn("Hello World");
}

function printToConsole(s: string): void {
  console.log(s);
}

testFunctionType1(printToConsole);

// This is the simplest way to describe a function with a **function
// type expression**. These types are syntactically similar to arrow
// functions.

// The syntax '(a: string) => void' means "a function with one parameter,
// named 'a', of type 'string', that doesn't have a return value". Just
// like with function declarations, if a parameter type isn't specified
// it's implicitly 'any'.

// Note that the parameter name is **required**. The function type
//
// (string) => void
//
// means "a function with a parameter named 'string' of type 'any'"

type GreetFunction = (a: string) => void;

function testFunctionType2(fn: GreetFunction) {
  fn("Hello World");
}

testFunctionType2(printToConsole);

// In JavaScript, functions can have properties in addition to being
// callable. However, the function type expression syntax doesn't
// allow for declaring properties, If we want to describe something
// callable with properties, we can write a **call signature** in an
// object type:

type DescriptionFunction = {
  description: string;
  (someArg: number): boolean;
}

function testDescriptionFunction(fn: DescriptionFunction) {
  console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default description";
testDescriptionFunction(myFunc);

// Note that the syntax is slightly different compared to a function
// type expression - use ':' between the parameter list and the
// return type rather than '=>'

// JavaScript functions can also be invoked with the 'new' operator.
// TypeScript refers to these as **constructors** because they usually
// create a new object. We can write a **construct signature** by adding
// the 'new' keyword in front of a call signature.

class SomeObject {};

type TestConstructor = {
  new (s: string): SomeObject;
}

function fn(ctor: TestConstructor) {
  return new ctor("Huaier");
}

// Some objects, like JavaScript's 'Date' object, can be called with or
// without 'new'. We can combine call and construct signatures in the
// same type arbitrarily:

interface TestCallOrConstruct {
  (n?: number): string;
  new (s: string): Date;
}

function testCallOrConstructFunction(ctor: TestCallOrConstruct) {
  console.log(ctor(120));

  // (n?: number): string
  //
  // Passing an argument of type 'number' to 'ctor' matches it against
  // the first definition in the 'TestCallOrConstruct' interface.

  console.log(new ctor("10"));

  // new (s: string) => Date
  //
  // Passing an argument of type 'string'' to 'ctor''matches' it against
  // the second definition in the 'TestCallOrConstruct' interface.
}

function firstElement1(arr: any[]) {
  return arr[0];
}

const n1 = firstElement1([1, 2, 3]);        // let n1: any
const s1 = firstElement1(["a", "b", "c"]);  // let s1: any
const u1 = firstElement1([]);               // let u1: any

// type-checker can't analysis the type of return valuer, they are all 'any'
//
// Unfortunately, 'any' can't represent the generic types, the type of
// this function is:
//
// (arr: any[]): any
//
// Actually we don't know if the return type is related to the input type.

function firstElement2<T>(arr: T[]): T | undefined {
  return arr[0];
}

// In TypeScript, **generics** are used when we want to describe a 
// correspondence between two values. We do this by declaring a
// **type parameter** in the function signature.
//
// By adding a type parameter 'T' to this function and using it in
// two places, we've created a link between the input of the function
// and the output.

const n2 = firstElement2([2, 3, 4]);

// let n2: number | undefined
// function firstElement2<number>(arr: number[]): number | undefined

const s2 = firstElement2(["12", "anb", "lo"]);

// let s2: string | undefined
// function firstElement2<string>(arr: string[]): string | undefined

const u2 = firstElement2([]);

// let u2: undefined
// function firstElement2<never>(arr: never[]): undefined

const ns = firstElement2([1, "2"]);

// let ns: string | number | undefined
// function firstElement2<
//   string | number
// > (
//   arr: (string | number)[]
// ): string | number | undefined

// From those examples we know we didn't have to specify 'T'
// in those examples. The type was **inferred** - chosen
// automatically - by TypeScript

function testMultiGenericsMap<Input, Output>(
  arr: Input[], 
  func: (arg: Input) => Output
) {
  return arr.map(func);
}

const parsed = testMultiGenericsMap(["1", "2", "3"], (n) => parseInt(n));
// Parameter 'n' is of type 'string', 'parsed' is of type 'number[]'
// TypeScript could infer both the type of the 'Input' parameter and 
// the 'Output' type parameter.

// Sometimes we want to relate two values, but can only operate on
// a certain subset of values. In this case, we can use a **constraint**
// to limit the kind of types that a type parameter can accept

function testFindLongest<T extends { length: number }>(a: T, b: T) {
  return (a.length > b.length) ? a : b;
}

const longerArray = testFindLongest([1, 2, 3, 4], [2, 3, "23"]);
// let longerArray: (string | number)[]
const longerString = testFindLongest("Huaier", "AshGrey");
// let longerString: "Huaier" | "AshGrey"
// const notOK = testFindLongest(10, 100); // uncomment here
//                               ^^
// Argument of type 'number' is not assignable to parameter of type '{ length: number; }'

// We constrained 'T' to type '{ length: number}', we were allowed to
// access the '.length' property of the 'a' and 'b' parameters.

function testMinimumLength1<T extends { length: number }>(
  obj: T,
  minimum: number
): T | undefined {
  // return (obj.length >= minimum) ? obj : { length: minimum };  // uncomment here
  //                                          ^^^^^^^^^^^^^^^
  // Type '{ length: number; }' is not assignable to type 'T'.
  // '{ length: number; }' is assignable to the constraint of type 'T', 
  // but 'T' could be instantiated with a different subtype of constraint 
  // '{ length: number; }'.

  // The problem is that the function promises to return the **same**
  // kind of objects as was passed in, not some object matching the
  // constraint. Such as:
  //
  // let test = {
  //   length: 2,
  //   content: "1234"
  // };
  // testMinimumLength1(test, 12);
  //
  // But type '{ length: number; content: string; }' is not the same type
  // with type '{ length: number }'
  // 
  // To fix this, we can change the return type 'T' to
  //
  // T | { length: number }
  //
  // or just 'T | undefined', like this

  if (obj.length >= minimum) {
    return obj;
  }
}

function testCombine<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2);
}

// const arr = testCombine([1, 2, 3], ["hello"]);  // uncomment here
//                                     ^^^^^^^
// type 'string' is not assignable to type 'number'
//
// Generic 'T' can only denote one type. We could manually specify 'T':

const arr = testCombine<string | number>([1, 2, 3], ["Hello"]);

function testFilter1<T>(
  arr: T[],
  func: (arg: T) => boolean
): T[] {
  return arr.filter(func);
}

// good ^

function testFilter2<T, Func extends (arg: T) => boolean>(
  arr: T[],
  func: Func
): T[] {
  return arr.filter(func);
}

// bad ^
//
// We have created a type parameter 'Func' that doesn't relate two values.
// 'Func' doesn't do anything but make the function harder to read and 
// reason about.
//
// Remember, type parameters are for relating the types of multiple values.
// If a type parameter is only used once in the function signature, it a type
// parameter is only used once in the function signature.

function testOptionalParameter(x?: number) { }
testOptionalParameter();    // Ok
testOptionalParameter(30);  // Ok

// Although the parameter is specified as type 'number', the 'x' parameter will
// actually have the type 'number | undefined' because unspecified parameters in
// JavaScript get the value 'undefined'.

function testDefaultParameter(x: number = 10) { }

// Now in the body of 'testDefaultParameter', 'x' will have type 'number' because
// any 'undefined' argument will be replaced with '10'. Note that when a para-
// meter is optional, callers can always pass 'undefined', as this simply simulates
// a "missing" argument.

testDefaultParameter();           // Ok
testDefaultParameter(10);         // Ok
testDefaultParameter(undefined);  // Ok

function testForEach<T>(
  arr: T[], 
  callback: (arg: T, index?: number) => void
): void {
  for (let i = 0; i < arr.length; ++i) {
    callback(arr[i], i);
  }
}

testForEach([1, 2, 3], (a) => console.log(a));
testForEach([1, 2, 4], (a, i) => console.log(i, a));
testForEach([1.1, 2.2, 3.2], (a, i) => {
  console.log(i?.toFixed());
  
  // TypeScript will automatically add the '?.'
  // console.log(i.toFixed()); // uncomment here
  //             ^
  // 'i' might be'undefined'
});

// Some JavaScript functions can be called in a variety of argument
// counts and types.In TypeScript, we can specify a function that
// can be called in different ways by writing **overload signatures**.
// To do this, write some number of function signatures, followed by the
// body of the function:

function testOverload(timestamp: number): Date;
function testOverload(m: number, d: number, y: number): Date;
function testOverload(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);

    // It matches the overload function
    // function testOverload(m: number, d: number, y: number): Date;
  } else {
    return new Date(mOrTimestamp);

    // It matches the overload function
    // function testOverload(timestamp: number): Date;
  }
}

const date1 = testOverload(12345);
const date2 = testOverload(2, 3, 4);
// const date3 = testOverload(1, 3); // uncomment here
//                            ^^^^
// No overload expects 2 arguments, but overloads do exist that 
// expect either 1 or 3 arguments

// These first two signatures are called the **overload signature**.
// Then we wrote a function implementation with a compatible signature.
// Functions have an **implementation** signature, but this signature
// can't be called directly. Even though we wrote a function with two
// optional parameters after the required one, it can't be called with
// two parameters.

function testOverloadError1(x: string): void;
function testOverloadError1() { }

// testOverloadError1(); // uncomment here
// ^^^^^^^^^^^^^^^^^^
// Expected 1 arguments, but got 0.
//
// Again, the signature used to write the function body can't be seen
// from the outside.

// The signature of the implementation is not visible from the outside.
// When writing an overloaded function, we should always have two or more
// signatures above the implementation of the function.

function testOverloadReturn(x: string): string;
function testOverloadReturn(x: number): boolean;
function testOverloadReturn(x : string | number): string | boolean {
  if (typeof x === "string") {
    console.log(x);
    return "This is called by the '(string) => string' part";
  } else {
    return true;
  }
}

function testOverloadError2(s: string): number;
function testOverloadError2(arr: any[]): number;
function testOverloadError2(x: any) {
  return x.length;
}

testOverloadError2("This is a string");
testOverloadError2([12, 2, 3, 1]);
// testOverloadError2(Math.random() > 0.5 ? "Hello" : [1, 9]); // uncomment here
//                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// No overload matches this call.
// Overload 1 of 2, '(s: string): number', gave the following error.
//   Argument of type 'number[] | "Hello"' is not assignable to parameter of type 'string'.
//     Type 'number[]' is not assignable to type 'string'.
// Overload 2 of 2, '(arr: any[]): number', gave the following error.
//   Argument of type 'number[] | "Hello"' is not assignable to parameter of type 'any[]'.
//     Type 'string' is not assignable to type 'any[]'

// Because the type of argument we pass is 'number[] | string'

function noReturn(): void {
  return;
}

// 'void' represents the return value of functions which don't return a value.
// It's the inferred type ant time a function doesn't have any 'return'
// statements, or doesn't return any explicit value from those return
// statements.
//
// In JavaScript, a function that doesn't return any value will implicitly
// return the value 'undefined'. However, 'void' and 'undefined' are not
// the same thing in TypeScript.

// The special type 'object' refers to any value that isn't a primitive(
// 'string', 'number', 'bigint', 'boolean', 'symbol', 'null' and 'undefined').
// This is different from the **empty object** type {}, and also different
// from the global type 'Object'.

// In JavaScript, function values are objects: They have properties, have
// 'Object.prototype' in their prototype chain, are 'instanceof Object',
// we can call 'Object.keys' on them, and so on. For this reason, function
// types are considered to be 'object's in TypeScript.

function testAny(a: any) {
  a.b();  // Ok
}

function testUnknown(a: unknown) {
  // a.b();  // Not Ok, uncomment here
  // ^
  // 'a' is of type 'unknown'.
}

// The 'unknown' type represents 'any' value, but different to
// 'any' type, but is safer because it's not legal to do anything
// with an 'unknown' type.

// This is useful when describing function types because we can describe
// functions that accept any value without having 'any' values in our
// function body.

function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Some functions never return a value. 'never' also appears when
// TypeScript determines there's nothing left in a union.

function fail(msg: string): never {
  throw new Error(msg);
}

function testNever(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    console.log(x); // let x: never
  }
}

// In addition to using optional parameters or overloads to make functions
// that can accept a variety of fixed arguments counts, we can also define
// functions that take an **unbounded** number of arguments using
// **rest parameters**.

// A rest parameter appears after all other parameters, and use the '...'
// syntax.

function testRestParameter(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}

const testRestParameterResult = testRestParameter(10, 1, 2, 4);
// 'testRestParameterResult' gets value [10, 20, 40]

// Conversely, we can provide a variable number of arguments from an
// iterable object (for example, an array) using the **spread** syntax.

// Note that in general, TypeScript does not assume that arrays are immutable.
// This can lead to some surprising behavior:

const testSpread = [1, 2]; // let testSpread: number[]
// const testResult1 = Math.atan2(...testSpread);  // uncomment here

const testResult2 = [1].push(...testSpread);

// Math.atan2(x: number, y: number): number
// Array.push(...items: T[]): number