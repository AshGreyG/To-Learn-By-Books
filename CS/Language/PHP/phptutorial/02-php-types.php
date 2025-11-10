<?php

// A type specifies the amount of memory allocated to a value associated with
// it. A type also determines the operations that you can perform on it.
//
//   [+] PHP Types
//     [+] Scalar
//       [+] Boolean  | bool
//       [+] Integer  | int
//       [+] Float    | float
//       [+] String   | string
//     [+] Compound
//       [+] Array    | array
//       [+] Object   | object
//     [+] Special
//       [+] Null     | null
//       [+] Resource | resource

// A variable is a scalar when it holds a single value of the type integer,
// float, string or boolean.

$count = 0;

echo "Value of count is ".$count."\n";
echo PHP_INT_SIZE."\n"; // => 8
echo PHP_INT_MAX."\n";  // => 9223372036854775807
echo PHP_INT_MIN."\n";  // => -9223372036854775808

// From PHP 7.4 we can use the underscores _ to group digits in an integer to
// make it easier to read

$useUnderscoreToEasyRead = 1_000_000;
echo $useUnderscoreToEasyRead."\n";

// Octal numbers consist of a leading zero and a sequence of digits from 0 to
// 7, octal numbers can have a plus (+) or minus (-)

$testOctalNumber = -073;
echo $testOctalNumber."\n";

// Hexadecimal numbers consist of a leading `0x` and a sequence of digits or
// letters (A-F), the letters can be lowercase or uppercase

$testHexadecimalNumber = 0xFF;
echo $testHexadecimalNumber."\n";

// The `is_int()` built-in function returns `true` is a value or a variable is
// an integer. Otherwise it returns `false`.

// PHP uses the IEEE 754 double format to represent floats.

$price = 10.25;
$tax = 0.08;

echo $price * (1 + $tax)."\n";

// PHP also supports the floating-point numbers in scientific notation

$testScientificNotation = 0.125e10;
echo $testScientificNotation."\n";

// Since PHP 7.4, we can use the underscores in floats to make long numbers
// more readable

$useUnderscoreFloat = 1.23_456_789e3;
echo $useUnderscoreFloat."\n";

$testAccuracy = 0.1 + 0.1 + 0.1;
echo ($testAccuracy == 0.3 ? "true" : "false") . "\n";  // => false

// To check if a value is a floating-point number, we can use the `is_float()`
// or `is_real()` function.

// The bool type has two values `true` and `false`

$isAdmin = true;
$isUserLoggedIn = false;

// When using the values of other types in the boolean context, PHP converts
// them to the boolean values, PHP tests the following values as `false`:
//
//   [+] The `false` keyword
//   [+] The integer 0 and -0
//   [+] The floats 0.0 and -0.0
//   [+] The empty string "" or '' and the string "0" (what...)
//   [+] The empty array array() or []
//   [+] The `null`
//   [+] The `SimpleXML` objects created from attributeless empty elements

$quoteMessage1 = 'quote-1';
$quoteMessage2 = "{$quoteMessage1} quote-2";  // => quote-1 quote-2
$quoteMessage3 = '{$quoteMessage1} quote-2';  // => {$quoteMessage1} quote-2
echo $quoteMessage2."\n";
echo $quoteMessage3."\n";
echo $quoteMessage3[0]."\n";

// To display multiple strings we need use concatenate operator .

// When evaluating a double quoted string, PHP replaces the value of any variable
// that you place inside the string. This feature is called the *variable
// interpolation*.

echo strlen($quoteMessage2)."\n";

$testEmoji = "🐂";
echo $testEmoji."\n";
echo $testEmoji[0].$testEmoji[1].$testEmoji[2].$testEmoji[3]."\n";
echo strlen($testEmoji)."\n";             // => 4
echo mb_strlen($testEmoji, 'UTF-8')."\n"; // => 1

// mb_* functions deal with multiple-byte strings (UTF-8 or other codes)

// An array is an ordered map that associated keys with values. It maps the index
// 0, 1, ... to values. This is called an *indexed array* because it uses numeric
// indexed as keys.

$testIndexedArray = ["laptop", "mouse", "keyboard"];

// Besides numeric indexes we can use strings as keys for the array elements like
// other languages hash map or dictionary, and in PHP in's called *associative
// arrays*. To access an element in an associative array we specify the key in
// the square brackets:

echo $testIndexedArray[1]."\n";

$testAssociatedArray = [
  "laptop" => 1000,
  "mouse" => 50,
  "keyboard" => 120,
  12.3 => "What fuck, the associated array can have different type keys..."
];

echo $testAssociatedArray["laptop"]."\n";
echo $testAssociatedArray[12.3]."\n";

// An object is an instance of a class. An object has properties and methods
//
// The `null` type has one value called `null` that represents a variable with
// no value.

$testNull = null;
var_dump($testNull);  // => NULL

// We can use `is_null` function to test null value.

// A resource is a special variable that references to an external resource
// such as
//
//   [+] A file
//   [+] A database connection
//   [+] A network connection

echo (int)12.5 . "\n";    // => 12
echo (int)12.9 . "\n";    // => 12
echo (int)12.1 . "\n";    // => 12
echo (int)"What" . "\n";  // => 0 (strings can be converted to integer)
echo (int)null . "\n";    // => 0

// And if the string is numeric or leading numeric it can be 

echo (int)"100 USDT" . "\n";  // => 100
echo ((string)100 == "100" ? "true" : "false") . "\n";
echo (string)[1, 2, 3] . "\n";

// Cast array to string will cause a PHP warning because array will be
// casted to "Array"

// PHP is a loosely typed programming language, when we define a variable we
// don't need to declare its type, PHP will determine the type by the context
// in which we use the variable.
//
// PHP has a feature called *type juggling* which means that when comparing
// variables of different types, PHP will convert them to the common comparable
// type.

$testTypeJuggling = '20';

if ($testTypeJuggling == 20) echo "Equal\n";

// Because of type juggling PHP converts the string "20" to an integer 20

echo 20 + "100 strings" . "\n"; // => 120 (but a non-numeric value encountered)

echo "-- Begin to dump variable information --\n";

var_dump($price);
var_dump($testIndexedArray);
var_dump($testIndexedArray[1]);
var_dump($testAssociatedArray);
var_dump($testAssociatedArray["mouse"]);
var_dump($testAssociatedArray[12.3]);

?>
