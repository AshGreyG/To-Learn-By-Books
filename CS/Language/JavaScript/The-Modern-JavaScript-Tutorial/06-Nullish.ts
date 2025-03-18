// The nullish coalescing operator is written as two question marks '??'
// We say that a value is "defined" when it'ss neither 'null' or 'undefined'.

// The result of 'a ?? b' is:
//   + If 'a' is defined, then 'a',
//   + If 'a' is not defined, then 'b'

let testForNullish: string | undefined;

if (Math.random() > 0.5) {
  testForNullish = "The random number is greater than 0.5";
}

let resultForNullish = testForNullish ?? 12;  // resultForNullish: string | number

// '||' returns the first 'truthy' value
// '??' returns the first 'defined' value