// A variable is a named storage for data. To create a variable in 
// JavaScript, use the 'let' keyword.

let message;

// Now we can put some data into it by using the assignment operator '=',
// and we can access the data using the variable name

message = "Hello";
alert(message); // 'alert' function is to show the variable content.

// We can combine the variable declaration and assignment into a single line,
// and we can also declare multiple variables in one line
// For the sake of better readability, please use a single line per variable

let anotherMessage = "Another hello";
let message1 = "Hello, 1", message2 = "Hello, 2", message3 = "Hello, 3";

// In older scripts, we may also find another keyword: 'var' instead of
// 'let'. Variables declared with 'var', are either function-scoped or
// global-scoped. They are visible through blocks. But 'let' is function-
// scoped and global-scoped.

var varMessage = "This message is declared by 'var' keyword";

if (true) { var testForVar = "Huh?"; }
alert(testForVar);  // Huh?

let testRedeclarationsLet = 1;
// let testRedeclarationsLet = 2;  // uncomment here
//     ^^^^^^^^^^^^^^^^^^^^^
// Cannot redeclare block-scoped variable 'testRedeclarationsLet'

function testDeclarationBelowUse() {
  phrase = "Hello";
  alert(phrase);
  var phrase;

  // 'var' declaration are processed when the function starts or script
  // starts for globals. In other words, 'var' variables are defined
  // from the beginning of the function, no matter where the definition
  // is. Assuming that the definition is not the nested function.

  // People also call such behavior "hoisting" because all 'var' are hoisted
  // to the top of the function.

  neverPhrase = "never";
  alert(neverPhrase);
  if (false) {
    var neverPhrase;
  }

  // Even as this, code blocks are ignored.
}
testDeclarationBelowUse();

let testChange = 1;
alert(testChange);  // 1
testChange = 2;
alert(testChange);  // 2

// When the value is changed, the old data is removed from the variable

// There are two limitations on variable names in JavaScript:
// + The name must contain only letters, digits, or the symbols '$' and '_'
// + The first character must not be a digit.
// + Variables named 'apple' and 'APPLE' are two different variables.

const myLoverBirthday = "10.07.2006";

// To declare a constant / unchanging variable, use 'const' instead of 'let'

// Task: Working with variables
// ----------------------------

var admin, name;
name = "John";
admin = name;
alert(admin); // John

// ----------------------------

// Task: Giving the right name
// ---------------------------

let ourPlanetName = "Earth";
let currentUserName;

// ---------------------------