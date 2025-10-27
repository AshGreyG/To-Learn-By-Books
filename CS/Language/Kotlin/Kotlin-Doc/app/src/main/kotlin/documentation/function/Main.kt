package documentation.function

fun sayHello(name: String, x: Int = 0, y: Int = 0): Map<String, Pair<Int, Int>> {
  // [+] Function parameters are written within parentheses ().
  // [+] Each parameter must have a type, and multiple parameters must be
  //     separated by comma.
  // [+] The return type is written after the function's parentheses, separated
  //     by colon.
  // [+] Function body is written in the curly {}

  println("Hello $name, you are now at position ($x, $y)")
  return mapOf(name to (x to y))
}

// If our function doesn't return anything then the return type of this function
// is `Unit`. `Unit` is a type with only one value.

// Simple functions declaration can be simplified, when there is only one
// expression or one return expression in the function body (we use `=` as
// function definition):

fun simpleSum(x: Int, y: Int) = x + y

fun toSeconds(time: String): (Int) -> Int = when (time) {
  "hour"   -> { value: Int -> value * 60 * 60 }
  "minute" -> { value: Int -> value * 60 }
  "second" -> { value: Int -> value }
  else     -> { value: Int -> value }
}

// Function `toSeconds` return the lambda expression

fun main() {
  sayHello("AshGrey", 20, 12)
  sayHello(name = "Huaier", x = 12, y = 18)
  sayHello(name = "Ruby")

  // [+] We can also call function using named parameters;
  // [+] We can use default parameters when declaring functions and when we
  //     didn't provide parameters when calling them they will use default
  //     values;

  println(simpleSum(1, 2))

  // Kotlin support us to use lambda expressions to define more concise functions

  val testFn: (String) -> Unit = { text: String -> println(text) }
  println(testFn("This is a test for lambda expression"))

  val numbers = listOf(1, -2, 3, -1, 9, -8)
  val positiveNumbers = numbers.filter { x: Int -> x > 0 }
  val twiceNumbers = numbers.map { x: Int -> x * 2 }
  println(positiveNumbers)
  println(twiceNumbers)

  val testFnNoParam: () -> String = { "This is a returned value" }
  val testFnTwoParams: (Int, Int) -> Double = {
    x: Int, y: Int -> x * 1.0 / y
  }

  val timesInMinutes = listOf(1, 18, 4, 9)
  val totalTimesInSeconds = timesInMinutes
    .map(toSeconds("minute"))
    .sum()
  println("Total times in seconds: $totalTimesInSeconds")

  println({ x: Int -> println("Invoke lambda immediately: $x") }(4))

  // [+] We can pass lambda expression to another function (higher order function)
  //     For methods or functions that only receive one lambda argument we can
  //     drop the parentheses
  // [+] The type of a lambda expression is `(...) -> <return type>`, when there
  //     is no parameter it should be `() -> <return type>`. When there is
  //     multiple parameters we should use comma to separate parameters:
  //     `(Int, String, ... , <parameters type>) -> <return type>`
  // [+] We can also return the lambda expression from a function
  // [+] Lambda expressions can be invoked on their own by adding parentheses ()
  //     after the curly brace {} and including any parameters with the
  //     parentheses
}
