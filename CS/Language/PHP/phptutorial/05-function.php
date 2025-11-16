<?php

function concat($str1, $str2,) {
  return $str1 . $str2;
}

// Starting from PHP 8.0, we can place the trailing comma `,` in the parameter
// list and PHP interpreter will ignore

echo concat("Welcome, ", "admin", ) . "\n";

// From PHP 7.0 the argument list may contain a trailing comma `,` which the
// PHP interpreter will ignore

function increase($value) {
  $value += 1;
  echo "Now the value increase to {$value}\n";
}

$counter = 1;
increase($counter);                         // => 2
echo "But `counter` is still {$counter}\n"; // => 1

// So we know the PHP function passes value but not reference for scalar values.
// Otherwise the $counter should be modified.
//
// In order to pass an argument by reference, we can prepend the operator & to
// the parameter name in the function definition like that

function increaseRef(&$value) {
  $value += 1;
  echo "Now the value increase to {$value}\n";
}

increaseRef($counter);                            // => 2
echo "And `counter` is modified to {$counter}\n"; // => 2

function concatWithDelimiter($str1, $str2, $delimiter = ' ') {
  return $str1 . $delimiter . $str2;

  // Parameter `delimiter` in this function has a default value, and this is
  // called *default parameter*. And it will be optional, this means that we
  // can pass a value or skip it. Notice the default arguments must be constant
  // expressions, they cannot be variables or function calls.
  //
  // PHP allows us to use a scalar value, an array and `null` as the default
  // arguments.
  // 
  // When we use the default parameters we should place them after the parameters
  // that don't have default values. Otherwise we cannot skip it.
}

// From PHP 8.0, it introduces the named arguments that allow us to specify the
// parameter names when passing arguments.

echo concatWithDelimiter(
  str1: "awesome",
  str2: "PHP is awesome!",
  delimiter: "!!!"
) . "\n";

// By using named arguments, the default arguments don't need to consider the
// order of arguments.
//
// Also, PHP allow us to call a function using both positional and named arguments.
// And we need to place the named arguments after positional arguments

// In PHP, variables have four types of scopes:
//
//   [+] Local
//   [+] Global
//   [+] Static
//   [+] Function parameters
//
// [+] When we define a variable inside a function, we can only access that
//     variable within the function. The function is said to be local to the 
//     function.
// [+] When we declare a variable outside the function, the variable is *global*
//     We can access the variable anywhere within the script except the function.
//     By default function cannot get the global variable. PHP allows us to
//     access a global variable within a function by using the `global` keyword

$message = "This is a global variable";
function globalTest() {
  global $message;
  echo $message . "\n";
  $message = "This is a local variable";

  // After use the global keyword, when we modify the variable the global variable
  // will also be modified.

  echo $message . "\n";
}
globalTest();
echo $message . "\n";

// PHP has a list of built-in variables known as super-global variables

// $GLOBALS:  array   Return an array that contains global variables
// $_GET:     array   Return data from GET requests.
// $_POST:    array   Return data from POST requests.
// $_COOKIE:  array   Return data from HTTP cookies.
// $_FILES:   array   Return data from POST file uploads.
// $argv:     array   The parameter while running PHP script.
// $argc:     int     The amount of parameter while running PHP script.
// $_SERVER   array   Returns data about the web server environment.

// var_dump($GLOBALS);

// A static variable retains its value between function calls. Also a static
// variable is only accessible inside the function

function getCounter() {
  static $counter = 1;
  return $counter++;
}

echo getCounter() . "\n"; // => 1
echo getCounter() . "\n"; // => 2
echo getCounter() . "\n"; // => 3

// Function parameters are local to the function. Therefore function parameters
// can only be accessible inside the function.

// Type hints ensure that PHP will check the type of a value at the call time
// and throw a `TypeError` if there is a mismatch.
//
// To add a type hint to a parameter we place a type in front of it

function integerAdd(int $a, int $b): int {
  return $a + $b;
}
echo integerAdd(1, 2) . "\n";     // => 3
echo integerAdd(1.1, "3") . "\n"; // => 4

// Notice that we can still pass a non-int value into this function, and that's
// not what we expect, to enable strict typing we need to use
// `declare(strict_types = 1)`

// declare(strict_types = 1);
// It must be the first statement of this PHP script. In the strict mode, PHP
// expects the values with the type to match the target types. If there's a
// mismatch PHP will issue an error.
// 
// The strict type directive has a special case when the target type is float.
// If the target type is `float` we can pass a value of type `integer`
//
// Also notice that including a strict_mode PHP script file to this file doesn't
// affect this file.

// In PHP 5, we can use `array`, `callable` and `class` for type hints, In PHP
// 7+, we can also use scalar types such as `bool`, `float` `int` and `string`
//
// To specify a return value's type for a function, we can add type hint after
// the function header.
//
// Starting from PHP 7.0 if a function doesn't return a value we can use the
// `void` type.

function echoMessage(string $message): void {
  echo $message . "\n";
}

// Starting from PHP 8.0 if a function returns a value of several types we can
// declare it as an union type

function returnUnionType(): int | string {
  if (random_int(0, 2) > 1) {
    return 1;
  } else {
    return "Re";
  }
}

// PHP supports `mixed` type which represents for all primitive PHP types. The
// mixed type is equivalent to
//
//   `object | resource | array | string | int | float | bool | null`

function returnMixed(): mixed {
  if (random_int(0, 2) > 1) {
    return 1;
  } else {
    return "Re";
  }
}

// PHP also supports nullable type, we can prepend `?` to denote the nullable
// types :

function nullableUpper(?string $input): ?string {
  if ($input !== null) {
    return strtoupper($input);
  }
  return null;
}

// PHP supports *variadic functions* that accept a variable number of arguments.
// We need to use `func_get_args()` function which returns an array that contains
// all function argumentss

function variadicSum1(): int {
  $numbers = func_get_args();
  $total = 0;
  for ($i = 0; $i < count($numbers); $i++) {
    $total += $numbers[$i];
  }
  return $total;
}

echo variadicSum1(1, 2, 3, 9, 10) . "\n";

// PHP 5.6 introduced the `...` operator when you place the `...` operator in
// front of a function parameter, the function will accept a variable number of
// arguments, and the parameter will become an array inside the function

function variadicSum2(int ...$numbers): int {
  $total = 0;
  for ($i = 0; $i < count($numbers); $i++) {
    $total += $numbers[$i];
  }
  return $total;
}

echo variadicSum2(1, 2, 3, 9, 10) . "\n";

// If a function has multiple parameters, only the last parameter can be variadic

?>
