<?php

// The `if` statement allows you to execute a statement if an expression
// evaluates to `true`. If PHP evaluates the expression to be `true`, then PHP
// executes the statement.

$isAdmin = true;

if ($isAdmin) {
  echo "Welcome, admin!\n";
}

$testAlternative = "Hello";

// PHP uses `else` and `elseif` as other clauses. PHP also supports an alternative
// syntax for the `elseif` without using curly braces like the following:

if ($testAlternative === "Hello") :
  echo "alternative syntax `if` branch is executed\n";
elseif ($testAlternative === "World") :
  echo "alternative syntax `elseif` branch is executed\n";
endif;

if ($testAlternative === "Hello") {
  echo "alternative syntax `if` branch is executed\n";
} elseif ($testAlternative === "World") {
  // Notice curly can use `elseif` and `else if`, both syntax are legal, but
  // comma syntax are not, it cannot use `else if` 

  echo "alternative syntax `elseif` branch is executed\n";
}

// Ternary operator: Like other language, use `? :`

$ternary = $testAlternative === "Hello" ? 1 : 0;
$ternaryMaybeEmpty = $testAlternative === "Hello" ?: 0;
echo $ternary . "\n";

switch ($testAlternative) {
  case "Hello" :
    echo "Welcome and Hello\n";
    break;
  case "World" :
    echo "The world is ...\n";
    break;
}

switch ($testAlternative) :
  case "Hello" :
    echo "Welcome and Hello\n";
    break;
  case "World" :
    echo "The world is ...\n";
    break;
endswitch;

$sum = 0;

for ($i = 1; $i <= 100; $i++) {
  $sum += $i;
}
echo "The sum from 1 to 100 is: {$sum}\n";

$sumAlternative = 0;

for ($i = 1; $i <= 100; $i++) :
  $sumAlternative += $i;
endfor;
echo "The sum from 1 to 100 is: ${sumAlternative}\n";

$mul = 1;
$index = 1;

while ($index <= 10) {
  $mul *= $index;
  $index += 1;
}
echo "The multiplication from 1 to 10 is: {$mul}\n";

$mulAlternative = 1;
$indexAlternative = 1;

while ($indexAlternative <= 10) :
  $mulAlternative += $indexAlternative;
  $indexAlternative += 1;
endwhile;

// Other syntax or grammar like do-while break, continue are same to other
// programming languages.

// To embed an `if` statement in an HTML document we can use the below syntax.
// The HTML syntax can also use `else` block
?>

<?php if ($isAdmin) : ?>

<!-- Show HTML code when expression is true -->
<p>Welcome, admin!</p>

<?php else : ?>

<!-- Show HTML code when expression is false -->
<p>You're a member but not an admin</P>

<?php endif; ?>
