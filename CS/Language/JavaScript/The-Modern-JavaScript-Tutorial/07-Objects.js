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

console.log("name" in testCreateObject3);
console.log("her lover" in testCreateObject4);

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