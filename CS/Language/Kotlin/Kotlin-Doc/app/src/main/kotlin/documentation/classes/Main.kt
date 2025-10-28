package documentation.classes

// Kotlin supports object-oriented programming using class and object.
// To declare class we can use `class` keyword. Properties can be declared in
// parentheses () and curly {}:

class Customer(val id: Int, val email: String = "default@local.com") {
  var category: String = ""

  // We can also declare member functions to define object's behavior. In Kotlin
  // member functions must be defined in curly

  fun printInfomation() {
    println("[+] Id:       $id")
    println("[+] Email:    $email")
    println("[+] Category: $category")
  }
}

// You can declare properties without `val` or `var` within parentheses but
// these properties are not accessible after an instance has been created

// Kotlin has data classes which are particularly useful for storing data. Data
// classes come automatically with additional member functions. These members
// functions allow you to easily print the instance to readable output

data class ReadableCustomer(val id: Int, val email: String = "default@local.com") {
  var category: String = ""
}

// Data classes have those methods:
// [+] `toString()`: prints a readable string of the class instance and its
//     properties;
// [+] `equals()` or ==: Compares instances of data class;
// [+] `copy()`: Creates a class instance by copying another instance

// In Kotlin, it's possible to have a null value, Kotlin uses null values when
// something is missing or not yet set. Null safety is a collection of features
// that we can safely deal with null values:
//
// [+] We use `<type>?` to declare a variable that can be null
// [+] We can check for the presence of null values within conditional expressions
// [+] To safely access properties of an object that might contain a null value,
//     we should use the safe call operator ?. The safe operator returns null
//     if either the object or one of its accessed properties is null.
// [+] We can provide a default value if a null value is detected by using the
//     Elvis operator ?:

fun acceptNullValues(maybeNull: String?): String {
  if (maybeNull != null && maybeNull.isNotEmpty()) {
    return "The input string is neither null nor empty"
  }
  return "The input string is null or empty"
}

fun maybeNullLengthString(maybeNull: String?): Int? = maybeNull?.length
fun mustIntLengthString(maybeNull: String?): Int = maybeNull?.length ?: 0

fun main() {
  val customerToday = Customer(id = 4, email = "kotlin@gmail.com")
  val customerNoEmail = Customer(2)

  // `customerToday` is an instance of class `Customer`, `id` and `email` are
  // properties. When the properties have their own default value then we can
  // use default constructor functions of this class.

  customerToday.category = "today"
  println(customerToday.email)
  println(customerToday.category)
  println(customerNoEmail.email)
  println(customerToday) // => documentation.classes.Customer@1540e19d

  customerToday.printInfomation()

  val readableCustomer = ReadableCustomer(90, "read@gmail.com")
  val comparedCustomer = ReadableCustomer(90, "read@gmail.com")
  println(readableCustomer) // => ReadableCustomer(id=90, email=read@gmail.com)
  println(readableCustomer == comparedCustomer)
  println(readableCustomer.copy(email = "another@gmail.com"))

  var maybeNullVariable: String? = "This is may be modified to null"
  maybeNullVariable = null
}
