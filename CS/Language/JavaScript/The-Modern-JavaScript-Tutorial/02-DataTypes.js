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

alert(9007199254740991 + 1);
alert(9007199254740991 + 2);