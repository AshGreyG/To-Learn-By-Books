package documentation.intermediate

// In software development we often need to modify a program's behavior without
// changing the original source code. For example we might to add extra
// functionality to a class from a third-party library.
//
// We can do this by adding extension functions to extend a class. We can
// extension functions the same way we call member functions of a class

fun String.bold(): String = "<b>$this</b>"

// [+] `String` is the extended class;
// [+] `bold` is the name of the extension function;
// [+] In main function, "Test extension functions" is the receiver of the extension
//     function.
// [+] Extension function can also call `this`

// Using extension function syntax we can make extension-oriented design.
// These designs separate core functionality from useful but non-essential
// features, making our code easier to read and maintain.

class HttpClient {
  fun request(
    method: String,
    url: String,
    headers: Map<String, String>
  ): Unit { /* implementation code here */ }
}

fun HttpClient.gets(url: String, headers: Map<String, String>): Unit 
  = request("GET", url, headers)

fun HttpClient.post(url: String, headers: Map<String, String>): Unit
  = request("POST", url, headers)

fun main() {
  println("Test extension functions".bold())
}
