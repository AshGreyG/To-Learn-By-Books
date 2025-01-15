function greetForEveryone(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

// greetForEveryone("Huaier", Date());  // uncomment here
//                         ^^^^^^
// Argument of type 'string' is not assignable to parameter of type 'Date'
//
// Calling 'Date()' in JavaScript returns a 'string'. On the other hand,
// constructing a 'Date' with 'new Date()' actually gives a 'Date' object
greetForEveryone("Huaier", new Date());

// tsc will compile this snippet of TypeScript to ES3 code like this
//
// "use strict";
// function greetForEveryone(person, date) {
//     console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
// }
// greetForEveryone("Huaier", new Date());

let message: string = "Hello, World!";