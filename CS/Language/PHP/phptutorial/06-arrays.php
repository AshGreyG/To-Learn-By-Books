<?php

// To add an element to an array, we can use the following syntax:
// PHP will automatically calculate the length of this array and append the
// new element.

$testAppend = [1, 2, 3];
$testAppend[] = 4;
print_r($testAppend);

// To remove an element from an array we can use the `unset()` function.
// Note that `unset` function doesn't change the key index

unset($testAppend[1]);
print_r($testAppend);

// To get the number of elements in an array we can use the `count()` function

echo count($testAppend) . "\n";

// PHP provides us with the `foreach` statement that allows us to iterate over
// elements of an array either an indexed array or associative array
//
// The `foreach` statement iterates over all elements in an array, one at a time.
// It starts with the first element and ends with the last one, the syntax is
//
// foreach ($<array-name> as $<element-name>) {}

foreach ($testAppend as $element) {
  echo "{$element} ";
}

// In each iteration PHP assigns the next array element to the $element variable.
// If the PHP reaches the last element the loop ends.

// To iterate over elements of an associative array we can use following syntax
//
// foreach ($<array-name> as $<key-name> => $<value-name>) {}
//
// In each iteration PHP assigns the key and value of next element to the
// variables that follows the *as* keyword. If the last element is reached
// the loop ends.

$capitals = [
  "Japan" => "Tokyo",
  "France" => "Paris",
  "Germany" => "Berlin",
  "UK" => "London",
  "US" => "Washington D.C."
];

foreach ($capitals as $country => $capital) {
  echo "The capital city of $country is $capital\n";
}

// [+] array_unshift(arary &$array, mixed ...$values): int;
//   [+] $array is the input array
//   [+] $values is the values to prepend
//
// And `array_shift` function can remove an element from the beginning of an
// array and return it.

array_unshift($testAppend, 3, 10);
print_r($testAppend);

// To prepend an element to an associative array, we cannot use the `array_unshift`
// function but we can use `+` operator:

$capitals = ["China" => "Beijing"] + $capitals;
print_r($capitals);

// [+] array_push(array &$array, mixed ...$values): int; similar to array_unshift
//
// And `array_pop` function can remove an element from the end of an array and
// return it.

array_push($testAppend, 10, 9);
print_r($testAppend);

// To append an element to an associative array we can use the syntax
//   $<array-name>[<new-key>] = new-value

$capitals["Russia"] = "Moscow";
print_r($capitals);

// [+] array_keys(array &$array, mixed $search_value, bool $strict = false): array
//   [+] $search_value specifies the value of the keys to search for;
//   [+] $strict if it sets to `true`, the `array_keys()` function uses the
//     identical operator (===) for matching the search_value with the array
//     keys. Otherwise the function uses the equal operator (==) for matching

$testKeys1 = array_keys($capitals);
print_r($testKeys1);  // The keys of $capitals.

// If this function is used at normal array it will return the index array

$testKeys2 = array_keys($testAppend);
print_r($testKeys2);  // [0, 1, 2, 3, 4, 5, 6]

$testKeys3 = array_keys(
  $testAppend,
  filter_value: "10",
  strict: true
);
print_r($testKeys3);  // []

$testKeys4 = array_keys(
  $testAppend,
  filter_value: "10",
  strict: false
);
print_r($testKeys4);  // [1, 5]

// [+] array_key_exists(string | int $key, array $array): bool

echo (array_key_exists("China", $capitals) ? "true" : "false") . "\n";

// When the value of key in associative array is not set to `null` then both
// function `array_key_exists()` and `isset()` will return `true` if the key
// exists.

$capitals["Rust"] = null;
echo (array_key_exists("China", $capitals) ? "true" : "false") . "\n";  // true
echo (isset($capitals["China"]) ? "true" : "false") . "\n";             // true
echo (array_key_exists("Rust", $capitals) ? "true" : "false") . "\n";   // true
echo (isset($capitals["Rust"]) ? "true" : "false") . "\n";              // false

// [+] in_array(mixed $needle, array $haystack, bool $strict): bool;
//   [+] $needle is the searched value;
//   [+] $haystack is the array to search;
//   [+] $strict if the $strict sets to `true` the `in_array()` function will
//      use the strict comparison.

echo (in_array(10, $testAppend) ? "true" : "false") . "\n";   // true
echo (in_array("10", $testAppend) ? "true" : "false") . "\n"; // true
echo (in_array(
  "10", 
  $testAppend, 
  strict: true
) ? "true" : "false") . "\n"; // false

// [+] array_reverse(array $array, bool $preserve_keys = false): array
//   [+] $preserve_keys determines if the numeric keys should be preserved. If
//     $preserve_keys is `true` the numeric key of elements in the new array
//     will be preserved.
//
// Notice the `array_reverse` doesn't change the original array but returns a
// new array.

$numbers = [1, 2, 3];
$reversed = array_reverse($numbers);
$reversedPreserveKey = array_reverse($numbers, preserve_keys: true);
print_r($reversed);
print_r($reversedPreserveKey);

// [+] array_merge(array ...$arrays): array
//   [+] This function accepts one or more arrays and returns a new array containing
//     elements from the input arrays.
//   [+] Starting from PHP 7.4.0 we can call the `array_merge()` function without
//     any arguments. In this case the function will return an empty array.
//   [+] Use this function for associative may override the key

$testMerge = array_merge([1, 2], [3, 10]);
print_r($testMerge);

// PHP 7.4 introduced the spread operator to the array expression. PHP uses the
// three dots ... to denote the spread operator.
//
// This spread operator performs better than calling `array_merge` function
// because it is a language construct, PHP optimizes the performance for
// constant arrays at compile time.
//
// Spread operator doesn't only support for array:

function getRandomNumbers(): array {
  $randomNumbers = [];
  for ($i = 0; $i < 5; $i++) {
    $randomNumbers[] = rand(1, 100);
  }
  return $randomNumbers;
}

$testSpread = [10, 9, ...$numbers, ...$reversed];
print_r($testSpread);

// Spread operator can be used at function return array.

$testSpreadFunc = [...getRandomNumbers()];
print_r($testSpreadFunc);

// Spread operator can be used at generator function.

function evenNumberGenerator() {
  for ($i = 2; $i < 10; $i += 2) {
    yield $i;
  }
}

$testSpreadGen = [...evenNumberGenerator()];
print_r($testSpreadGen);

// PHP allows us to apply the spread operator not only to an array but also
// to any object that implements `Traversable` interface.

/**
 * @implements IteratorAggregate<mixed, mixed>
 */
class RGB implements IteratorAggregate {
  private $colors = ["RED", "GREEN", "BLUE"];

  public function getIterator(): Traversable {
    return new ArrayIterator($this->colors);
  }
}

$rgb = new RGB();
$colors = [...$rgb];
print_r($colors);

// PHP 8 allows us to call a function using named arguments and now we can
// apply spread operator to an associative array and pass them to functions

function formatName(?string $first, ?string $middle, ?string $last): string {
  return $middle
    ? "$first $middle $last"
    : "$first $last";
}

$testSpreadParam = [
  "first" => "Ash",
  "middle" => null,
  "last" => "Grey"
];
echo formatName(...$testSpreadParam) . "\n";

// PHP use `list` language construct to deconstruct the array and assign elements 
// to variables on the left.

$prices = [100, 0.1, 0.05];
list($buyPrice, , $discount) = $prices;

var_dump($buyPrice, $discount);

// If the array is nested then we can also use nested `list`. And we can also
// use `list` for associative array.

list(
  "first" => $firstName,
  "last" => $lastName
) = $testSpreadParam;

var_dump($firstName, $lastName);

// In PHP `list` construct can be replaced by array destructuring syntax:
//
// [
//   "first" => $firstName,
//   "last" => $lastName
// ] = $testSpreadParam;
//
// And the destructuring syntax also allows us to skip elements

?>