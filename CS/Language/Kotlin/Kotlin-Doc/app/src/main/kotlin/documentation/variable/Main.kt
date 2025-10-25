package documentation.variable

// In Kotlin, `fun` is to define the function, the `main()` function is where
// out program starts from. The body of a function is written within curly
// braces.

fun main() {
  val variableImmutable = 12
  var variableMutable  = "This is a mutable variable. "

  variableMutable += "Now it has been modified."

  println(
    """
Immutable variable: $variableImmutable
Muttable  variable: $variableMutable
    """
  )

  // In Kotlin, we use `val` to define immutable values (like const and this keyword
  // is represented for "value"). We use `var` to define mutable variables (
  // this keyword is represented for "variable")
  //
  // In Kotlin, we use `""` to wrap single-line string and use `"""..."""` to
  // wrap multiple-lines string.
  //
  // Kotlin has the ability of type inference. Such it can infer the
  // `variableMutable` as `Int` and infer `variableMutable` as `String`

  val typeAnnotation: Int = 120

  // Because Kotlin has the type inference so explicit type will be redundant.
  //
  // [+] Integer types:          Byte, Short, Int, Long
  // [+] Unsigned integer types: UByte, UShort, UInt, ULong
  // [+] Floating number types:  Float, Double
  // [+] Boolean types:          Boolean
  // [+] Character types:        Char
  // [+] String types:           String
  //
  // [*] Lists: Ordered collections of items
  // [*] Sets:  Unique unordered collections of items
  // [*] Maps:  Sets of value pairs where keys are unique and map to only one 
  //            value
  // [*] And their mutable version container

  val readonlyShapes = listOf("triangle", "rectangle", "square")
  println(readonlyShapes) // => [triangle, rectangle, square]

  val shapes: MutableList<String> = mutableListOf(
    "triangle", "rectangle", "square"
  )
  println(shapes)
  println("The first item of `readonlyShapes` is ${readonlyShapes[0]}")
  println("The last item of `shapes` is ${shapes.last()}")

  // And we can use `[List<T>].first()` and `[MutableList<T>].first()` to get
  // the first element and use `last()` to get last element

  println("square" in readonlyShapes) // => true

  // To check if an element is in the list we can use `in` operator

  shapes.add("circle")
  println(shapes) // => [triangle, rectangle, square, circle]
  shapes.remove("square")
  println(shapes) // => [triangle, rectangle, square]

  val readonlyFruits = setOf("apple", "orange", "pear")
  println(readonlyFruits) // => [apple, orange, pear]

  val fruits: MutableSet<String> = mutableSetOf(
    "apple", "orange", "pear"
  )
  println(fruits) // => [apple, orange, pear]

  // As sets are unordered, we can't access an item at a particular index. But
  // we can also use `in` operator and `[Set<T>].add()`, `[MutableSet<T>].add()`
  // or `remove()` to handle with sets.

  val readonlyJuiceMenu: Map<String, Int> = mapOf(
    "apple" to 100,
    "orange" to 190,
    "pear" to 200
  )
  println(readonlyJuiceMenu) // => {apple=100, orange=190, pear=200}

  val juiceMenu: MutableMap<String, Int> = mutableMapOf(
    "apple" to 100,
    "orange" to 190,
    "pear" to 200
  )
  println(juiceMenu)
  println("The price of apple juice is ${juiceMenu["apple"]}") // => 100

  // If we try to access a key-value pair with a key that doesn't exist in a map
  // we will get a null value.

  juiceMenu["coconut"] = 210
  juiceMenu.remove("orange")
  println(juiceMenu)  // => {apple=100, pear=200, coconut=210}
  println(juiceMenu.containsKey("orange"))  // => false
  println(juiceMenu.containsValue(210))     // => true
  println(juiceMenu.keys)                   // => [apple, pear, coconut]
  println(juiceMenu.values)                 // => [100, 200, 210]

  // We can use `[]` operator to add new key-value pairs into the map and use
  // `[MutableMap<T>].remove()` method to remove the pairs
  //
  // We can use `[Map<T>].containsKey()` method to check if a key has been
  // written into the map.
  //
  // We can use `[Map<T>].keys` and `[Map<T>].values` to get the keys set
  // and values set.
}
