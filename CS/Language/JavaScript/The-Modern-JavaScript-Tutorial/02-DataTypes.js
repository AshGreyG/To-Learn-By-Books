// There are eight basic data types in JavaScript. We can put any type
// in a variable. A variable can at one moment be a string and then
// store a number. Programming languages that allow such things such
// as JavaScript are called "dynamical typed", meaning that there exist
// data types, but variables are not bound to any of them.

let testMessage = "hello";  // testMessage: string
testMessage = 12;           // testMessage: number now

let numberIncludesInt = 123;        // numberIncludesInt: number
let numberIncludesFloat = 123.123;  // numberIncludesFloat: number

// The 'number' type represents both integer and floating point numbers.
// Besides regular numbers, there are so-called "special numeric values"
// which also belong to 'number':
// + Infinity
// + -Infinity
// + NaN

alert(1 / 0);     // Infinity
alert(Infinity);  // Infinity

// Infinity represents the mathematical Infinity, it's a special value 
// that's greater than any number.

alert("Not a number, it's a string" / 2); // NaN
alert(NaN);                               // NaN

// NaN represents a computational error. It's a result of an incorrect or
// an undefined mathematical operation. NaN is sticky, any mathematical
// operation on 'NaN' returns 'NaN'. There is only one exception:
//
// NaN ** 0 is 1

alert(NaN + 1);   // NaN
alert(NaN * 3);   // NaN
alert(NaN ** 0);  // 1

// In JavaScript, the 'number' type cannot safely represent integer values
// larger than 2 ^ 53 - 1, that's 9007199254740991. The number type can store
// larger integers up to 1.7976931348623157 * 10 ^ 308, but outside of the
// safe integer range there'll be a precision error.
//
// All odd integers greater than 2 ^ 53 - 1 can't be stored at all in the 
// 'number' type.

alert(9007199254740991 + 1);  // 9007199254740992
alert(9007199254740991 + 2);  // 9007199254740992

// 'BigInt' type was recently added to the language to represent integers of
// arbitrary length. A 'BigInt' type value is created by appending 'n' to
// the end of an integer:

const testBigInt1 = 12345678901234657890n;
const testBigInt2 = BigInt("12345678901234567890");

// A 'string' in JavaScript must be surrounded by quotes:

let testDoubleQuotes = "This is a test";
let testSingleQuotes = "This is a test";
let testTemplateString = `${testDoubleQuotes} + is embedded`;

// If we use 'let str = `${str}`;', its value will be "undefined"
// Backticks(``) are extended functionality quotes, they allow us to embed
// variables and expressions into a string by wrapping them into '${...}'

// The 'boolean' type has only two values: 'true' and 'false'. This type is
// commonly used to store yes/no values

let fieldCheckedName = false; // fieldCheckedName: boolean
let fieldCheckedAge = true;   // fieldCheckedAge: boolean

// The special value 'null' doesn't belong to any of the types described above.
// It forms a separate type of its own which contains ony the 'null' value.
// It's just a special value which represents nothing, empty or value unknown.

let nullAge = null;

// The special value 'undefined' also stands apart, it makes a type of its own,
// just like 'null'. The meaning of 'undefined' is "value is not assigned".
// If a variable is declared but not assigned, then its value is 'undefined'

let undefinedAge;
alert(undefinedAge);  // undefined

undefinedAge = 3;
undefinedAge = undefined;

// Technically, it's possible to explicitly assign 'undefined' to a variable.
// Normally, one uses 'null' to assign an empty or unknown value to a variable,
// while 'undefined' is reserved as a default initial value for unassigned things.

// All other types are called "primitive" because their values can contain only a
// single thing. In contrast, 'objects' are used to store collections of data
// and more complex entities.

// The 'typeof' operator returns the type of the operand (string with the typename)

alert(typeof undefined);    // undefined
alert(typeof 0);            // number
alert(typeof 123n);         // bigint
alert(typeof true);         // boolean
alert(typeof "fool");       // string
alert(typeof Symbol("id")); // symbol
alert(typeof Math);         // object
alert(typeof null);         // object // wrong
alert(typeof alert);        // function

// 1. 'Math' is a built-in object that provides mathematical operations.
// 2. The result of 'typeof null' is '"object"', that's an officially recognized
//    error in 'typeof', coming from very early days of JavaScript and kept for
//    compatibility. Definitely, 'null' is not an object.
// 3. 'alert' is a function. Functions belong to the object type, but 'typeof'
//    treats them differently, returning '"function"'

// Task: String quotes
// -------------------

let name = "Ilya";
alert(`hello ${1}`);      // hello 1
alert(`hello ${"name"}`); // hello name
alert(`hello ${name}`);   // hello Ilya

// -------------------