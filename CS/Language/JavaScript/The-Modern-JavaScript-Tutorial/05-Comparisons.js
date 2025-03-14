// When comparing values of different types, JavaScript converts the values
// to numbers. A regular equality check '==' has a problem. It cannot
// distinguish between 0, '' and false. So there is a strict equality operator
// '===' checks the equality without type conversion.

console.log("002" > 1);         // true
console.log(null <= undefined); // false
console.log(null >= undefined); // false
console.log(null > 0);          // false
console.log(null >= 0);         // true
console.log(undefined > 0);     // false
console.log(undefined < 0);     // false

console.log("----------- Check for operator '==' -----------");
console.log("001" == 1);         // true
console.log("" == false);        // true
console.log(0 == false);         // true
console.log(null == undefined);  // true
console.log(null == 0);          // false
console.log(0 == NaN);           // false
console.log(undefined == 0);     // false

console.log("----------- Check for operator '===' -----------");
console.log(0 === false);          // false
console.log(null === undefined);   // false

// Conclusion: Never use == and !=