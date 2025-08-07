/**
 * @flow
 */

// Primitive types

const testBoolean: boolean = true;
const testString: string = "12";
const testNumber: number = 12.23;
const testNull: null = null;
const testUndefined: void = undefined;
const testBigint: bigint = 1234n;

function testParamType(a: number, b: string) {}
testParamType(12.3, "123");

// Literal types

const test2: 2 = 2;
const testWithoutTypeAnnotations = "123"; // type: "123"

function testLiteralParamType(a: 2) {}
// $FlowExpectedError[incompatible-call]
testLiteralParamType(1);
testLiteralParamType(2);

// Some literal primitives can also be wrapped as object:

// $FlowExpectedError[incompatible-type]
const testWrappedBoolean$1: boolean = new Boolean(true);
const testWrappedBoolean$2: Boolean = new Boolean(true);
const testWrappedString: String = new String("123");

// Wrapped objects are rarely used.

// Literal type with union types are powerful

type PromiseState = "pending" | "resolve" | "reject";

// Mixed is the supertype of all types, all values are `mixed`. However, this means
// that very few operations are permitted on it, without refining to some more specific
// type

function getTypeof(value: mixed): string {
  return typeof value;
}
getTypeof("foo");
getTypeof(123);
getTypeof(true);

// `mixed` is safe, while `any` is not. `any` unsafely allows all operations.
// `empty` is the opposite of `mixed`:

// Everything is `mixed` but nothing is `empty`. The `empty` types has no value, it's the
// subtype of all other types (the bottom type). If you have a function that always
// throws, you can annotate the return as `empty`

function alwaysThrow(message: string): empty {
  throw new Error(message);
}

// You can use `empty` to assert that you have refined away all members of a union.

function castToEmpty(x: "a" | "b"): number {
  switch (x) {
    case "a":
      return 1;
    case "b":
      return 2;
    default:
      return (x: empty);
  }
}

// Maybe type

// You can prefix a type with `?` to make it a `union` with `null` and `void`.
// `?T` is equivalent to `T | null | void`.

function maybeType(value: ?number) {}
maybeType();
maybeType(null);
maybeType(undefined);
maybeType(12);

// Function types

type T1 = typeof maybeType; // (value: ?number) => void
type T2 = typeof alwaysThrow; // (message: string) => empty
type T3 = (message: string, value: ?number) => boolean; // With parameter names
type T4 = (string, ?number) => boolean; // Without parameter names.

// Generic types

function generic<T>(x: T): Array<T> {
  return [x];
}

// Optional types

function optionalParameter(message: string, value?: number) {}
optionalParameter("123");
optionalParameter("1223", 1233);

// Optional parameters will accept missing `undefined` or matching types.
// But they will not accept `null`.

type T5 = typeof optionalParameter; // (value?: number) => void

// Rest parameters

function restParameters(...args: Array<number>) {}
restParameters(1, 2, 3);

// `this` type

// Every function in JavaScript can be called with a special context called `this`.
// You can call a function with any context that you want. Flow allows you to annotate
// the type for this context by adding a special parameter at the start of the function's
// parameter list.

function thisType<T>(this: { x: T }): T {
  return this.x;
}
const num = thisType.call({ x: 12 }); // num: number

// Function return type:

async function promiseFunction(): Promise<number> {
  return 1;
}

// Callable objects can be typed

type CallableObject = {
  (number, number): number;
  bar: string;
  ...
}

function add(x: number, y: number): number {
  return x + y;
}

add.bar = "123";

add as CallableObject;

// In general, functions can have properties assigned to them if they are function
// declarations, or simple variable declarations of the form `const f = () =>`. The
// properties must be assigned in the format `f.prop = <expr>`. In the same statement
// list as the function definition.

declare const fn:
  & ((x: "string") => string)
  & ((x: "number") => number);

// Use intersection types to define overloaded function types.

const s: string = fn("string");
const n: number = fn("number");

function useCallback<T: (...$ReadOnlyArray<empty>) => mixed>(
  callback: T,
  inputs: ?$ReadOnlyArray<mixed>,
): T {
  return callback;
}
useCallback((x: string) => true);
useCallback((x: number) => [1]);

// This type `(...$ReadOnlyArray<empty>) => mixed` represents for any function. Notice
// type `Function` is just an alias for `any` and it's unsafe.

// Interfaces are separate from object types, only they can describe instances of classes.

interface TestInterface {
  bar: string;
  foo: number;
}

// You can add variance annotations to object types. To mark a property as read-only,
// you can use the `+`:

type ReadOnlyArray<T> = {
  +[index: number]: T;
  ...
}

const testReadOnlyArray: ReadOnlyArray<number> = {};
// $FlowExpectedError[cannot-write]
testReadOnlyArray[0] = 2;

// You can also mark a property as write-only, you can use the `-`:

type WriteOnlyArray<T> = {
  -[index: number]: T;
  ...
}

const testWriteOnlyArray: WriteOnlyArray<number> = {};
// $FlowExpectedError[cannot-read]
const testRead = testWriteOnlyArray[0];
testWriteOnlyArray[0] = 12;