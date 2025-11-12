<?php

// PHP uses the `=` to represent the assignment operator.
//
//   $variable_name = expression
//
// On the left side of the assignment operator is a variable to which we want
// to assign a value. And on the right side of the assignment, operator = is
// a value or an expression.
//
// The assignment expression returns a value assigned, which is the result of
// the expression:

$testAssign1 = $testAssign2 = 30;
echo "{$testAssign1} = {$testAssign2}\n";

$testAssign1 += 1;
echo "After the assignments: testAssign1 = {$testAssign1}\n"; // => 31

// += addition,   -= subtraction,   *= multiplication,
// /= division,   %= modules,      **= exponentiation

$testConcatenation1 = "Test";
$testConcatenation2 = " but that will be over.";
echo $testConcatenation1 . $testConcatenation2 . "\n";

// .= By using the concatenation assignment operator we can concatenate two
// strings and assign the result string to a variable.

// ==       Equal to                  (notice: PHP type juggling)
// !=, <>   Not equal to              (notice: PHP type juggling)
// ===      Identical to
// !==      Not identical to
// >        Greater than
// >=       Greater than or equal to
// <        Less than
// <=       Less than or equal to

echo "\"12\" == 12:   " . ("12" == 12 ? "true" : "false") . "\n";
echo "\"12\" <> 12.0: " . ("12" <> 12.0 ? "true" : "false") . "\n";
echo "\"12\" != 12.0: " . ("12" != 12.0 ? "true" : "false") . "\n";
echo "\"12\" === 12:  " . ("12" === 12 ? "true" : "false") . "\n";
echo "\"12\" !== 12:  " . ("12" !== 12 ? "true" : "false") . "\n";

// PHP use `and` keyword to `and-gate` two boolean values, we can also use `&&`.
// The only difference between them are their precedences: the `and` operator has
// higher precedence than the `&&` operator

// When the value of the first operand is `false` the logical `and` operator
// knows the result must be `false`, then it doesn't evaluate the second
// operand. This process is called *short-circuiting*.

// Also PHP use `or` keyword to `or-gate` two boolean values, we can also use
// `||` and the difference is same with `and` and `&&`. `or` has higher precedence
// than the `||` operator

// Because `=` has higher precedence than the `or` operator

$debug = false;
$debug && print("PHP is under debug mode.\n");
$debug || print("PHP is not under debug mode.\n");

$testAndPrecedence = true and false;
$testOrPrecedence = false or true;

var_dump($testAndPrecedence); // => true
var_dump($testOrPrecedence);  // => false

// The logical `not` operator accepts only one operand and negates the operand
// and we can also use `!`

var_dump(true and false);         // => false
var_dump("1" == 1 && "2" == 2.0); // => true
var_dump(true or false);          // => true
var_dump("1" === 1 || 1 === 1.0); // => false

?>
