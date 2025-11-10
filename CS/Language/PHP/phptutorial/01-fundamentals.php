<?php

// Like HTML, we need to have the opening tag <?php to start php code, and if
// we mix PHP code with HTML, we need to have the enclosing tag.
//
// PHP is partially case-sensitive, the following is case-insensitive:
//
//   [+] PHP constructs like `if`, `if-else`, `if-elseif`, `switch`, `while`
//       `do-while` and etc;
//   [+] Keywords such as `true` and `false`;
//   [+] User-defined function and class names.
//
// On the other hand, variables are case-sensitive, for instance $message
// and $MESSAGE is different variables.

// In PHP, a statement always ends with a semicolon ;

$message = "Hello PHP";

// This is a assignment statement. PHP variable assignment starts with $

if ($message) {
  echo "The message is not empty\n";
}

// A constant is simply a name that holds a single value, the value of a
// constant cannot be changed during the execution of the PHP script.
//
// To define a constant we can use the `define()` function and it takes the
// constant's name as the first argument and the constant values as the second

define("WIDTH", "1920px");  // => run-time constant
echo WIDTH."\n";

// By convention constant names are uppercase and unlike a variable, the
// constant name doesn't start with the dollar sign.
//
// From PHP 7.0 a constant can hold an array.

// PHP provides keyword `constant` to define constants

const HEIGHT = "1080px";    // => compile-time constant
echo HEIGHT."\n";

// Run-time constant declaration using `define` function can happen in compound
// statement but compile-time constant declaration with `const` keyword cannot.

// The `var_dump()` is a built-in function that allows you to dump the
// information about a variable. The `var_dump()` function accepts a variable
// and displays its type and value

var_dump($message); // => string(9) "Hello PHP"
var_dump(HEIGHT);   // => string(6) "1080px"

// The `die()` function displays a message and terminates the execution of the
// PHP script

die("Terminates ...");

// A variable stores a value of any type like `string`, `number`, `array`
// and an `object`. When defining a variable, we need to follow these rules:
//
//   [+] The variable name must start with the dollar sign $
//   [+] The first character after the dollar sign must be a letter or underscore
//   [+] The remaining character can be underscores, letters or numbers
//
// To display variables in console or HTML page, we can use function `echo`.
// When displaying in HTML page it can also use <?= $variable_name

echo "Below is the HTML page output...\n";

// Mixing PHP code with HTML will make the code unmaintainable, especially when
// the application grows. To avoid this we can separate the code into separate
// files: 
//
//   [+] `index.php`: store the logic for defining and assigning values to
//       variables
//   [+] `index.view.php`: store the code that displays the variables
//   [+] Use the `require` construct to include the code from `index.view.php`
//       in the `index.php`

#  PHP also supports `#` comment

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PHP Variables</title>
</head>
<body>
  <h1><?= $message; ?></h1>
</body>
</html>
