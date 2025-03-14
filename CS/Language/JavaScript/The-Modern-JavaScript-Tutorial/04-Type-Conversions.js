// Most of the time, operators and functions automatically convert the
// values given to them to the right type. 'alert' automatically converts
// any value to a string to show it. Mathematical operators convert values
// to numbers.

console.log("------- String Conversion -------")
let booleanValue1 = true;
console.log(typeof booleanValue1); // boolean

let stringValue1 = String(booleanValue1);
console.log(typeof stringValue1);  // string

// String conversion is mostly obvious. A 'false' becomes '"false"', 'null'
// becomes '"null"', etc

console.log( "6" / "2" ); // 3, strings are converted to numbers
let stringValue2 = "123";
console.log(typeof stringValue2);  // string
let numberValue2 = Number(stringValue2);
console.log(typeof numberValue2);  // number

console.log("------- Number Conversion -------")
// Explicit conversion is usually required wheen we read a value from a string-
// based source like a text form but expect a number to be entered. If the string
// is not a valid number, the result of such a conversion is 'NaN':

let testNaNConversion = Number("This is not a valid number");
console.log(testNaNConversion); // NaN, conversion failed

// undefined -> NaN
// null      -> 0
// true      -> 1
// false     -> 0
// string    -> Whitespaces(includes spaces, tabs '\t', newlines '\n' etc.) from
//              the start and end are removed. If the remaining string is empty,
//              the result is '0'. Otherwise, the number is "read" from the string.
//              An error gives 'NaN'.

console.log(Number(undefined));             // NaN
console.log(Number(null));                  // 0
console.log(Number(true));                  // 1
console.log(Number(false));                 // 0
console.log(Number("   \n    \t"));         // 0
console.log(Number("   \n 78    \t  6 \n"));// NaN
console.log(Number("7y67"));                // NaN

// Boolean conversion:
//   + Values that intuitively "empty", like 0, an empty string, 'null', 'undefined'
//     and 'NaN', become 'false'
//   + Other values become 'true'

console.log("------- Boolean Conversion -------")
console.log(Boolean(0));        // false
console.log(Boolean(12));       // true
console.log(Boolean(-1));       // true
console.log(Boolean(""));       // false
console.log(Boolean("\n"));     // true
console.log(Boolean("0"));      // true
console.log(Boolean("This !")); // true
console.log(Boolean(undefined));// false
console.log(Boolean(null));     // false
console.log(Boolean(NaN));      // false