package documentation.control

fun main() {
  // Conditional expressions

  val numberGreaterThanZero = 1
  if (numberGreaterThanZero > 0) {
    println("Value `numberGreaterThanZero` is greater than 0")
  }

  // Notice there is no `<condition> ? <statement1> : <statement2>` expression
  // in Kotlin. It can use `if <condition> <statement1> else <statement2>` and
  // curly are optional if the statement has only one line.

  val colors = "green"
  when (colors) {
    "green" -> println("The green branch has been executed")
    "red"   -> println("The red branch has been executed")
    "blue"  -> println("The blue branch has been executed")
    else    -> println("No named branch has been executed")
  }

  // When conditional expression is like other languages' `switch` statement
  // notice branches can also return values and assign to a variable

  var result = when (colors) {
    "green" -> "The green party"
    "red"   -> "Red bull"
    else    -> "Unknown brand"
  }
  println(result)

  // In Kotlin we can use `..` operator to generate ranges:

  // Loop expressions

  println("[+] Closed Increase Intervel: ")
  print("    ")
  for (number in 1..5) {
    print("$number ")
  }
  print("\n")

  // 1..5 represents 1 2 ... 5, its closed increase interval

  println("[+] Open Increase Interval: ")
  val cipher = "ywngj ywjj wjlwjy fstymjw"
  for (i in 1..<26) {
    print("    ")
    for (c in cipher) {
      if (c != ' ')
        print('a' + (c - 'a' + i) % 26)
      else 
        print(c)
    }
    print("\n")
  }

  // 1..<26 represents 1 2 .. 25, its open increase interval

  println("[+] Closed Decrease Interval: ")
  print("    ")
  for (number in 8 downTo 1) {
    print("$number ")
  }
  print("\n")

  // 8 downTo 1 represents 8 7 ... 1

  println("[+] Closed Stpes Increase Interval: ")
  print("    ")
  for (number in 1..20 step 3) {
    print("$number ")
  }
  print("\n")

  // 1..20 step 3 represents 1 4 7 ... 16 19

  // Kotlin also has `while` and `do...while` loop and that's same with other
  // languages.
}
