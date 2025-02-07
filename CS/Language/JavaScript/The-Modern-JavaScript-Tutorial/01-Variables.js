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