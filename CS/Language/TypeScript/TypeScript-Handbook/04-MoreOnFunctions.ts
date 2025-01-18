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
