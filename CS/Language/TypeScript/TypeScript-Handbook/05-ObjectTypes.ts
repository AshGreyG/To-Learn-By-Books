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

