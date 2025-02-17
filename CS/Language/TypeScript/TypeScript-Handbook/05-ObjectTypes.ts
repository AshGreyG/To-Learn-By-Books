interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

// Properties can also be marked as 'readonly' for 'TypeScript'. While
// it won't change any behavior at runtime, a property marked as 'readonly'
// can't be written to during type-checking.

function testReadonly1(readonlyPerson: ReadonlyPerson) {
  // readonlyPerson.age = 300; // uncomment here
  //                ^^^
  // Can't assign to 'age' because it is a read-only property.
}

// Using the 'readonly' modifier doesn't necessarily imply that a value
// is totally immutable. It just means the property itself can't be
// re-written to.

interface Home {
  readonly resident: {
    name: string;
    age: number;
  }
}

function testReadonly2(home: Home) {
  home.resident.age = 30; // Ok
}

function testReadonly3(home: Home) {
  // home.resident = {
  //   name: "AshGrey",
  //   age: 21
  // }
  // Can't assign to 'resident' because it is a read-only property.
}

interface Person {
  name: string;
  age: number;
}

let writablePerson: Person = {
  name: "AshGrey",
  age: 21
}

let readonlyPerson: ReadonlyPerson = writablePerson;  // Ok

console.log(readonlyPerson.age);  // 21
writablePerson.age++;
console.log(readonlyPerson.age);  // 22

// Sometimes we don't know all the names of a type's properties ahead
// of time, but we do know the shape of values. In those cases we can
// use an index signature to describe the types of possible values:

interface StringArray {
  [index: number]: string;
}
declare function getStringArray(): StringArray;

const testStringArray: StringArray = getStringArray();
const testSecondItem = testStringArray[1];  // let testSecondItem: string

// Above we have a 'StringArray' interface which has an index signature. 
// This index signature states that when a 'StringArray' is indexed with
// a 'number', it will return a 'string'

// Only these types are allowed for index signature properties:
// + 'string'
// + 'number'
// + 'symbol'
// + template string patterns
// + union types consisting only of these

interface TestMultipleIndexers {
  name: string;
}
interface TestDerived extends TestMultipleIndexers {
  some: string;
}

interface NotOkay {
  // [x: number]: TestMultipleIndexers;  // uncomment here
  [x: string]: TestDerived;
}

interface Okay {
  [x: number]: TestMultipleIndexers | TestDerived;
  [x: string]: TestMultipleIndexers | TestDerived;
  name: TestMultipleIndexers;
  some: TestDerived;
}
declare function getOkay(): Okay;

const okay: Okay = getOkay();
const testForNumber = okay[1];
const testForString = okay["thisStringIsNotNameOrSome"];

// String index signatures are a powerful way to describe the "dictionary"
// pattern, they also enforce that all properties match their return type.
// This is because a string index declares that 'obj.property' is also
// available as 'obj["property"]'.

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
declare function getReadonlyStringArray(): ReadonlyStringArray;

const testReadonlyArray: ReadonlyStringArray = getReadonlyStringArray();
// testReadonlyArray[2] = "test";  // uncomment here
// ^^^^^^^^^^^^^^^^^^^^
// Index signature in type 'ReadonlyStringArray' only permits reading.

// Finally, we can make index signatures 'readonly' in order to prevent 
// assignment to their indices.

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { 
  color: string; 
  area: number
} {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20
  }
}

let testSquare1 = createSquare({ color: "blue", width: 10 });
// If we use 'colour' instead of 'color', JavaScript will fail silently,
// but TypeScript can figure the mistake out.

// let testSquare2 = createSquare({ width: 10, opacity: 0.5 });  // uncomment here
//                                             ^^^^^^^
// Object literal may only specify known properties, 
// and 'opacity' does not exist in type 'SquareConfig'

let testSquare3 = createSquare({ width: 10, opacity: 0.5 } as SquareConfig);
// The easiest method is to just use a type assertion.

// However, a better approach might be to add a string index signature if we're
// sure that the object can have some extra properties that are used in some
// special way. We could define like this:

interface BetterSquareConfig {
  color?: string;
  width?: number;
  [propName: string]: unknown;
}
declare function createBetterSquare(config: BetterSquareConfig);

// But now compiler won't give us an error.

let testSquare4 = createBetterSquare({
  colour: "red",  // There is a spelling mistake
  width: 10,
  opacity: 0.5
});

// It's common to have types that might be more specific versions of other types
// We might have a 'BasicAddress' type that describes the fields.

interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

// But addresses often have a unit number associated with them if the building at
// an address has multiple units:

interface AddressWithUnitButNoExtend {
  name?: string;
  unit: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

// The downside here is that we had to repeat all the other fields from 'BasicAddress'
// when our changes were purely additive. Instead, we can *extend* the original 'Basic
// Address' type and just add the new fields:

interface AddressWithUnitAndExtend extends BasicAddress {
  unit: string;
}

interface BasicColor {
  color: string;
}
interface BasicCircle {
  radius: number;
}
interface ColorfulCircle extends BasicColor, BasicCircle {}

let testColorfulCircle: ColorfulCircle = {
  color: "red", // from BasicColor
  radius: 10    // from BasicCircle
};

// 'interface's can also extend from multiple types.

// TypeScript provides another construct called *intersection types* that is mainly
// used to combine existing object types. An intersection type is defined using the
// '&' operator.

type IntersectionColorfulCircle = BasicColor & BasicCircle;

// We've intersected 'BasicColor' and 'BasicCircle' to produce a new type that
// has all the members of 'BasicColor' and 'BasicCircle'

let testIntersectionColorfulCircle: IntersectionColorfulCircle = {
  color: "blue",  // from BasicColor
  radius: 9       // from BasicCircle
}

// Do not use '&' when two types has same property name but their types are conflict

interface TestIntersectionConflict1 {
  name: string;
}
interface TestIntersectionConflict2 {
  name: number;
}
type Conflict = TestIntersectionConflict1 & TestIntersectionConflict2;
declare const testConflict: Conflict;
testConflict.name;  // let testConflict.name: never

// We can make a generic 'Box' type which declares a *type parameter*.

interface Box<Type> {
  contents: Type;
}

let stringBox: Box<string> = { contents: "This is a test"  }; // contents: string

// 'Array' itself is a generic type.

function testBuiltinReadonlyArray(values: ReadonlyArray<string>) {
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // values.push("Hello"); // uncomment here
  //        ^^^^
  // Property 'push' does not exist on type 'readonly string[]'
}

// Unlike 'Array', there isn't a 'ReadonlyArray' constructor that we can use.
// 'Array' is actually defined in JavaScript, but 'ReadonlyArray' is not.
// Instead, we can assign regular 'Array's to 'ReadonlyArray's, but we can't
// do the opposite.

const roArray: ReadonlyArray<string> = [
  "first", "second", "third"
];

// A *tuple type* is another sort of 'Array' type that knows exactly how many 
// elements it contains, and exactly which types it contains at specific positions.

type StringNumberPair = [string, number];

// Here, 'StringNumberPair' is a tuple type of 'string' and 'number'. Like 'Readonly
// Array', it has no representation at runtime. To the type system, 'StringNumberPair'
// describes arrays whose '0' index contains a 'string' and whose '1' index contains
// a 'number'.

function testTuple(pair: [string, number]) {
  const a = pair[0];  // const a: string
  const b = pair[1];  // const b: number
}
testTuple(["AshGrey", 20]);

// We can also destructure tuples using JavaScript's array destructing:

function testTupleDestructure(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;
  console.log(inputString); // const inputString: string
  console.log(hash);        // const hash: number
}

// Tuples can have optional properties by writing out a question mark '?'
// after an element's type. Optional tuple element can only come at the
// *end*, and also affect the type of 'length'.

type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;  // const z: number | undefined
}

// Tuples can also have rest elements, which have to be an array/tuple type

type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

// Tuple types have 'readonly' variants, and can be specified by sticking
// a 'readonly' modifiers in front of them.

function testReadonlyTuple(pair: readonly [string, number]) {
  // pair[0] = "Change!";  // uncomment here
  //      ^
  // Can't assign to '0' property because it's readonly.
}