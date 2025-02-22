// The identity function is a function that will return back whatever
// passed in:

function identity<T>(arg: T): T {
  return arg;
}

// This 'T' allows us to capture the type the user provides. We say that
// this version of the 'identity' function is generic, as it works over
// a range of types. Unlike using 'any'.

let testIdentityNumber1: number = identity<number>(1);
let testIdentityNumber2 = identity(1);

let testIdentityString1: string = identity<string>("Explicit string");
let testIdentityString2 = identity("Inexplicit string");

// We can call a generic function in two ways:
//   + The first way is to pass all of the arguments, including the type
//     argument, to the function.
//   + The second way is to use 'type argument inference', that is, we 
//     want the compiler to set the value of 'Type' for us automatically
//     based on the type of the argument we pass in

let funcT1: <T>(arg: T) => T = identity;
let funcT2: <S>(arg: S) => S = identity;
let funcT3: { <T>(arg: T): T } = identity;

// The type of generic functions is just like those of non-generic 
// functions, with the type parameters listed first, similarly to function
// declarations.

// We can also write the generic type as a call signature of an object
// literal type. It can also be moved to an interface. In a similar
// example, we may want to move the generic parameter to be a parameter
// of the whole interface. This lets us see what types we're generic
// over.

interface GenericIdentityFunc {
  <T>(arg: T): T;
}
let funcT4: GenericIdentityFunc = identity;

interface GenericIdentityFuncPara<T> {
  <T>(arg: T): T;
}
let funcT5: GenericIdentityFuncPara<number> = identity;

let testFuncT1: number = funcT1<number>(1);
let testFuncT2: string = funcT2<string>("Explicit string");
let testFuncT3: number = funcT3<number>(2);

class GenericAdd<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let testGenericNum = new GenericAdd<number>();
testGenericNum.zeroValue = 0;
testGenericNum.add = function(x, y) {
  return x + y;

  // x: number, y: number, x + y: number
}

let testGenericStr = new GenericAdd<string>();
testGenericStr.zeroValue = "";
testGenericStr.add = function(x, y) {
  return x + y;

  // x: string, y: string, x + y: string
}

// Just as with interface, putting the type parameter on the class
// itself lets us make sure all of the properties of the class are working
// with the same type.

function loggingLengthIdentity1<T>(arg: T): T {
  // console.log(arg.length);  // uncomment here
  //                 ^^^^^^
  // Property 'length' does not exist on type 'T'

  return arg;
}

interface Lengthwise {
  length: number;
}
function loggingLengthIdentity2<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Because the generic function is now constrained, it will no longer work
// over any and all types that don't have 'length' property.

// loggingLengthIdentity2(2);  // uncomment here
//                     ^
// Argument of type 'number' is not assignable to parameter of type 'Lengthwise'
loggingLengthIdentity2([1, 2, 3]);
loggingLengthIdentity2({ length: 10, value: 3});

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
let testGetProperty = { a: 1, b: 2, c: 3, d: 4 };
getProperty(testGetProperty, "a");

// function getProperty<{
//   a: number;
//   b: number;
//   c: number;
//   d: number;
// }, "a">(obj: {
//   a: number;
//   b: number;
//   c: number;
//   d: number;
// }, key: "a"): number

// getProperty(testGetProperty, "e");  // uncomment here
//                              ^^^ 
// Argument of type '"m"' is not assignable to parameter of type

function create<T>(c: new() => T): T {
  return new c();
}

// This function takes a constructor function as an argument. 'c' is
// a constructor function or class that can be instantiated with 'new c()'
// to produce an object of type 'T'.

class TestFactory {
  constructor() {
    console.log("TestFactory instance is created!");
  }
}
let testCreateInstance = create(TestFactory); // let testCreateInstance: TestFactory;

interface Container<T, U> {
  element: T;
  children: U;
}
declare function createElement(): Container<HTMLDivElement, HTMLDivElement[]>;

declare function createElement<
  T extends HTMLElement
>(element: T): Container<T, T[]>;

declare function createElement<
  T extends HTMLElement,
  U extends HTMLElement
>(element: T, children): Container<T, U[]>;

// With generic parameter defaults we can reduce it to:

declare function createElement<
  T extends HTMLElement = HTMLDivElement,
  U extends HTMLElement[] = T[]
>(element?: T, children?: U): Container<T, U>;

// A generic parameter default follows the following rules:
//    + A type parameter is deemed optional if it has a default;
//    + Required type parameters must not follow optional type
//      parameters;
//    + Default types for a type parameter must satisfy the constraint
//      for the type parameter, if it exists;
//    + When specifying type arguments, you are only required to specify
//      type arguments for the required type parameters. Unspecified
//      type parameters will resolve to their default types.
//    + If a default type is specified and inference cannot choose a
//      a candidate, the default type is inferred;
//    + A class or interface declaration that merges with an existing
//      class or interface declaration may introduce a default for an
//      existing type parameter;
//    + A class or interface declaration that merges with an existing
//      class or interface declaration may introduce a new type parameter
//      as long as it specifies a default.

interface Producer<T> {
  make: () => T;
}

// We can use a 'Producer<Cat>' where a 'Producer<Animal>' is expected,
// because a 'Cat' is an 'Animal'. This relationship is called
//
//                         *covariance*
//
// The relationship from 'Producer<T>' to 'Producer<U>' is the same as
// the relationship from 'T' to 'U'

interface Consumer<T> {
  consume: (arg: T) => void;
}

// Then we can use a 'Consumer<Animal>' where a 'Consumer<Cat>' is 
// expected, because any function that is capable of accepting an 'Animal'
// must be capable of accepting a 'Cat'. This relationship is called
//
//                       *contravariance*
//
// The relationship from 'Consumer<T>' to 'Consumer<U>' is the same as
// the relationship from 'U' to 'T'.

// If 'Producer<T>' is covariant on 'T', then we can simplify check
// 'Cat' and 'Animal' instead, as we know they'll have the same relation-
// ship as 'Producer<Cat>' and 'Producer<Animal>'. TypeScript automatically
// infers the variance of every generic type. In extremely rare cases 
// involving certain kinds of circular types, this measurement can be
// inaccurate, you can add a variance annotation to a type parameter to
// force a type parameter to force a particular variance

// Contravariant annotation
interface ConsumerAnnotation<in T> {
  consume: (arg: T) => void;
}

// Covariant annotation
interface ProducerAnnotation<out T> {
  make: () => T;
}

// Invariant annotation
interface ProducerAndConsumer<in out T> {
  consume: (arg: T) => void;
  make: () => T;
}