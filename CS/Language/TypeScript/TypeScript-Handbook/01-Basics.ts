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
//
// TypeScript can downlevel ECMAScript version (such as ES6, ES5, ES3)
// Template strings are a feature from version ES6. TypeScript has the
// ability to rewrite code from newer versions of ECMAScript to older
// ones.
//
// tsc --target es2015 hello.ts

let message: string = "Hello, World!";