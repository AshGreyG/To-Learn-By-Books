// "use strict";

let testCreateObject1 = new Object(); // "object constructor" syntax
let testCreateObject2 = {};           // "object literal" syntax

let testCreateObject3 = {
  age: 21,
  name: "AshGrey"
};
delete testCreateObject3.age;
// We can use the 'delete' operator to remove the property of an object
console.log(testCreateObject3.age); // undefined

let testCreateObject4 = {
  age: 18,
  name: "huaier",
  "her lover": "AshGrey"
};
console.log(testCreateObject4["her lover"]);

function testSimpleProp(name, age) {
  return { name, age };
}
// Equivalence to return { name: name, age: age }

console.log("name" in testCreateObject3);       // true
console.log("her lovers" in testCreateObject4); // false

let testCreateObject5 = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in testCreateObject5) {
  console.log(key + ": " + testCreateObject5[key]);
}

let integerPropObject = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  "1": "USA"
};

for (let key in integerPropObject) {
  console.log(key + ": " + integerPropObject[key]);
}
// 1: USA
// 41: Switzerland
// 44: Great Britain
// 49: Germany

let testForNumberProperty = {
  0: "test"
}
console.log(testForNumberProperty["0"]);  // test
console.log(testForNumberProperty[0]);    // test

// A variable assigned too an object stores not the object itself, but its
// "address in memory", "a reference" to it. When we perform actions with
// the object like take a property "user.name", the JavaScript engine looks
// at what's at that address and performs the operation on the actual object
// When an object variable is copied, the reference is copied, but the object
// itself is not duplicated.

let testCopyReferenceOld = {
  name: "old"
};
let testCopyReferenceNew = testCopyReferenceOld;
testCopyReferenceNew.name = "new";
console.log(testCopyReferenceOld.name); // new

console.log(testCopyReferenceOld == testCopyReferenceNew);  // true
console.log(testCopyReferenceOld === testCopyReferenceNew); // true

// For comparisons like "obj1 > obj2" or for a comparison against a primitive
// like "obj1 = 5", objects are converted to primitives.

// An object declared as `const` can be modified. The value (reference) of object
// is immutable, but the properties of that object are free to change.

const testConstObject = {
  name: "immutable"
};
testConstObject.name = "mutable";
console.log(testConstObject.name);  // mutable

// We can use `for...in` loop to copy the object content.

let testCopyOrigin = {
  name: "AshGrey",
  age: 23
};
let testCopyTarget = {};

for (let key in testCopyOrigin) {
  testCopyTarget[key] = testCopyOrigin[key];
}
testCopyTarget.name = "Huaier";
console.log(testCopyOrigin.name); // AshGrey

// We can also use `Object.assign` to copy object properties. If the copied
// property name already exists, it gets overwritten

let testObjectAssignTarget = {
  name: "AshGrey",
  duplicate: 12
}
let testObjectAssignSource1 = {
  permission: "Admin"
}
let testObjectAssignSource2 = {
  duplicate: 0
}
let testObjectAssignResult = Object.assign(
  testObjectAssignTarget,
  testObjectAssignSource1,
  testObjectAssignSource2
)
console.log(testObjectAssignResult.duplicate);  // 0
console.log(testObjectAssignResult.name);       // AshGrey
console.log(testObjectAssignResult.permission); // Admin

// Now it's not enough to copy nested cloning

let testNestedObjectsSource = {
  test: {
    a: 12
  },
  name: "AshGrey"
}
let testNestedObjectsTarget1 = Object.assign({}, testNestedObjectsSource);
testNestedObjectsSource.test.a = 89;
console.log(testNestedObjectsTarget1.test.a);  // 89
console.log(testNestedObjectsSource.test === testNestedObjectsTarget1.test);  // true

// We can use function `structuredClone(object)` to clone with all nested properties

let testNestedObjectsTarget2 = structuredClone(testNestedObjectsSource);
console.log(testNestedObjectsSource.test === testNestedObjectsTarget2.test);  // false

// The `structuredClone` function can clone most data types, such as objects, arrays
// and primitive values. But `function` properties aren't supported.

// Garbage Collection

let testPropertyGC1 = {
  test: "AshGrey"
};
testPropertyGC1 = null;

// The global variable "testPropertySetNull1" references the object { test: "AshGrey" }
// if the value of "testPropertySetNull1" is overwritten, the reference is lost. Now the
// value "AshGrey" becomes unreachable. There's no way to access it. GC will junk the data
// and free the memory.

let testPropertyGC2 = {
  test: "AshGrey"
};
let testPropertyGC3 = testPropertyGC2;
testPropertyGC2 = null;
console.log(testPropertyGC3.test);  // AshGrey

// Object methods

let testObjectMethod = {
  name: "Huaier",
  age: 19,

  sayHi1: function() {
    console.log("Hello");
  },
  sayHi2() {
    console.log("Hello");
  },
  sayHi3() {
    console.log(this.name); // Must `this` here, otherwise the `name` is undefined.
  }
};

testObjectMethod.sayHi1();  // Hello
testObjectMethod.sayHi2();  // Hello
testObjectMethod.sayHi3();  // Huaier

// `this` keyword in JavaScript can be used in any function, even if it's not a method
// of an object The value of `this` is evaluated during the run-time, depending on the
// context.

let testThis1 = { name: "AshGrey" };
let testThis2 = { name: "Huaier"  };
function sayHi() {
  console.log(this.name);
}
testThis1.f = sayHi;
testThis2.f = sayHi;

testThis1.f();  // AshGrey
testThis2.f();  // Huaier
sayHi();        // undefined (in non-strict situation)

// These calls have different this. The rule is simple, if `obj.f()` is called during the
// call of `f`, then `this` is `obj`. In non-strict mode the value of `this` in such case
// will be the global object (`window` in browser)

// Arrow functions are special: they don't have their own `this`. If we reference `this`
// from such a function, it's taken from the outer normal function.

let testThis3 = {
  name: "Huaier",
  sayHi() {
    let arrowFunction = () => console.log(this.name);
    arrowFunction();
  }
}

testThis3.sayHi();  // Huaier

// Constructor New

function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let testConstructor1 = new User("AshGrey");

// When a function is executed with `new`, it does the following steps:
//   1. A new empty object is created and assigned to `this`.
//   2. The function body executes. Usually it modifies `this`, adds new properties to it.
//   3. The value of `this` is returned.

// function UserExplained(name) {
//   this = {};    // Implicitly
//   this.name = name;
//   this.isAdmin = false;
//   return this;  // Implicitly
// }

// If we have many lines of code all about creation of a single complex object, we can wrap
// them in an immediately called constructor function

let testImmediateFunction = new function() {
  this.name = "AshGrey";
  this.isAdmin = false;
}
console.log(testImmediateFunction.name);  // AshGrey

// This constructor can't be called again, because it is not saved anywhere, just created
// and immediately called. So this trick aims to encapsulate the code that constructs the
// single object without future reuse.

function testCheckNewFunction() {
  console.log(new.target);
}
testCheckNewFunction();     // undefined
new testCheckNewFunction(); // [Function: testCheckNewFunction]

// With `new.target`, it can be used inside the function to know whether it was called with
// new `new`, or "in constructor mode".

function TestAlwaysInConstructor(name) {
  if (!new.target) {
    return new TestAlwaysInConstructor(name);
  }
  this.name = name;
}
let testAlwaysInConstructor = TestAlwaysInConstructor("AshGrey");
console.log(testAlwaysInConstructor.name);  // AshGrey

// Usually, constructors do not have a `return` statement. Their task iss to write all necessary
// stuff into `this`, and it automatically becomes the result. But if there is a `return`:
//   1. If `return` is called with an object, then the object is returned instead of `this`;
//   2. If `return` is called with a primitive, it's ignored.

function TestReturnNewObjects() {
  this.name = "AshGrey";
  return {
    name: "Huaier",
    lover: "AshGrey"
  }
}
console.log(new TestReturnNewObjects().lover);  // AshGrey

function TestReturnPrimitives() {
  this.name = "Huaier";
  return 3;
}
console.log(TestReturnPrimitives());          // 3      -> In regular mode
console.log(new TestReturnPrimitives().name); // Huaier -> In constructor mode

// Optional chaining

let testNoProperty = {};
// console.log(testNoProperty.address.street); // uncomment here, there is problem
// `testNoProperty.address` is `undefined`, so an attempt to get its property `street`
// will cause an error.

// The optional chaining `?.` stops the evaluation if the value before `?.` is undefined
// or `null` and returns `undefined`.

console.log(testNoProperty?.address?.street); // undefined

// The optional chaining `?.` is not an operator, but a special syntax construct, that
// also works with functions and square brackets.

// - `?.()` is used to call a function that may not exist.
// - `?.[]` is used to get a property or element from an object / array that may not exist.

// Symbol

let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false

// Symbol don't auto-convert to a string. If we use `alert` to show the Symbol in browser
// it will show a TypeError.
console.log(id1.toString());  // Symbol(id)
console.log(id2.description); // id

// Symbols allow us to create "hidden" properties of an object, that no other part of code
// can accidentally access or overwrite.

let testThirdPartyObject = {
  name: "This is a third party variable",
  age: 20
};
testThirdPartyObject[id1] = 1;
console.log(testThirdPartyObject[id1]); // 1

let lover = Symbol("lover");
let testUseSymbolInside = {
  name: "AshGrey",
  age: 21,
  [lover]: "Huaier"
};

for (key in testUseSymbolInside) {
  console.log("Property of `testUseSymbolInside`: ", key);  // Only name, age
}
console.log(Object.keys(testUseSymbolInside));  // ['name', 'age']

// "for...in" loop and `Object.keys()` ignore the symbol property, that's a part of the
// general "hiding symbolic properties". But `Object.assign()` copies both string and
// symbol properties.

console.log(Object.assign({}, testUseSymbolInside)[lover]); // Huaier

// If we want same-named symbols to be same entities, for instance, different parts of
// our application want to access symbol "id" meaning exactly the same property.

// To achieve this, there exists a *global symbol registry*. We can create symbols in it
// and access them later, and it guarantees that repeated accesses by the same name return
// exactly the same symbol.

let createIdSymbol = Symbol.for("id");
let getIdSymbol = Symbol.for("id");
console.log(createIdSymbol === getIdSymbol);  // true
console.log(Symbol.keyFor(getIdSymbol));  // id

// Object to primitive conversion

// 1. "string": For an object-to-string conversion, when we are doing an operation on an
//    object that expects a string like `alert` function or as a property key

let testConvertToString = {
  str1: "str1",
  str2: "str2"
};
let testConvertToStringResult = {
  "[object Object]": "Yes convert to [object Object]",
};
console.log(testConvertToStringResult[testConvertToString]);

// 2. "number": For an object-to-number conversion

let testConvertToNumber = {
  num1: 2,
  num2: 0
};
console.log(+testConvertToNumber);  // NaN

// 3. "default": Binary plus can work both with strings (concatenates them) and number
//   (adds them). So if a binary plus gets an object as an argument, it uses the "default"
//   hint to convert it. The greater and less comparison operators such as < >, can work
//   with both strings and numbers too. Still, they use the "number" hint, not "default".
//   That's for historical reasons.

// All built-in objects except for one case (`Date` object) implement "default" conversion
// the same way as "number".

// To do the conversion, JavaScript tries to find and call three object methods
//   1. Call `obj[Symbol.toPrimitive](hint)