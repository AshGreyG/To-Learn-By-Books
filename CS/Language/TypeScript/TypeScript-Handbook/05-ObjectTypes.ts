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
