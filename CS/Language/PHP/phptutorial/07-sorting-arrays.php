<?php

// The `sort` function sorts the elements of an array in place in ascending
// order:
//
// sort(array &$array, int $flag = SORT_REGULAR): bool

$fruits = ["apple", "Banana", "orange"];
sort($fruits, flags: SORT_FLAG_CASE | SORT_STRING);
print_r($fruits);

// The `rsort` function sorts array in descending order.

rsort($fruits, flags: SORT_FLAG_CASE | SORT_STRING);
print_r($fruits);

// The `ksort` function sorts the elements of an array by their keys. The
// `ksort` is mainly useful for sorting associative arrays.
//
// ksort(array &$array, int $flags = SORT_REGULAR): bool
//
// [+] $flags changes the sorting behavior using one or more values:
//   [+] SORT_REGULAR
//   [+] SORT_NUMERIC
//   [+] SORT_STRING
//   [+] SORT_LOCALE_STRING
//   [+] SORT_NATURAL
//   [+] SORT_FLAG_CASE
//
//   to combine the flag values we can use the | operator like
//   SORT_REGULAR | SORT_NUMERIC

$employees = [
  "john" => [
    "age" => 24,
    "title" => "Front-end Developer"
  ],
  "alice" => [
    "age" => 28,
    "title" => "Web Designer"
  ],
  "bob" => [
    "age" => 25,
    "title" => "MySQL DBA"
  ]
];

ksort($employees, SORT_STRING);
print_r($employees);

// Similarly, `krsort` function is the reverse version of function `ksort`

// The `usort` function sorts the element of an array using user-defined functions
//
// usort(array &$array, callable $value_compare_func): bool

$testUsort = [2, 1, 3];

usort($testUsort, function ($x, $y) {
  if ($x === $y) {
    return 0;
  }
  return $x < $y ? 1 : -1;  // reverse
});
print_r($testUsort);

// In PHP 7 or newer we can use the spaceship operator <=> to make the code more
// concise

usort($testUsort, function ($x, $y) {
  return $x <=> $y;
});
print_r($testUsort);

// And if the callback function is simple we can use arrow function like this

usort($testUsort, fn ($x, $y) => $x <=> $y);
print_r($testUsort);

class Person {
  /** @var string */
  public $name;
  /** @var int */
  public $age;

  public function __construct(string $name, int $age) {
    $this->name = $name;
    $this->age = $age;
  }
}

class PersonComparer {
  public static function compare(Person $x, Person $y): int {
    return $x->age <=> $y->age;
  }
}

$group = [
  new Person("Bob", 28),
  new Person("Alex", 25),
  new Person("Peter", 30)
];

usort($group, fn ($x, $y) => $x->age <=> $y->age);
print_r($group);

// We can also use static function as the callback function

$groupStatic = [
  new Person("Bob", 28),
  new Person("Alex", 25),
  new Person("Peter", 30)
];

usort($groupStatic, ["PersonComparer", "compare"]);
print_r($groupStatic);

// The `asort` function is to sort an associative function in ascending order
// and maintain index association

$moutains = [
  "K2" => 8611,
  "Lhotse" => 8516,
  "Mount Everest" => 8848,
  "Kangchenjunga" => 8586
];

asort($moutains);
print_r($moutains);

// The `uasort` function is to sort an associative function in ascending order
// using user-defined function

$countries = [
  "China"   => ["gdp" => 12.238, "gdp_growth" => 6.9 ],
  "Germany" => ["gdp" => 3.693,  "gdp_growth" => 2.22],
  "Japan"   => ["gdp" => 4.872,  "gdp_growth" => 1.71],
  "USA"     => ["gdp" => 19.485, "gdp_growth" => 2.27]
];

uasort($countries, fn ($x, $y) => -($x["gdp"] <=> $y["gdp"]));
foreach ($countries as $name => $status) {
  echo "{$name} has a GDP of {$status['gdp']} trillon USD with a growth {$status['gdp_growth']}\n";
}

// The `uksort` function is to sort an associative function using a user-
// defined comparision function.

$namesUksort = [
  "c" => "Charlie",
  "A" => "Alex",
  "b" => "Bob"
];

uksort($namesUksort, fn ($x, $y) => strtolower($x) <=> strtolower($y));
print_r($namesUksort);

?>