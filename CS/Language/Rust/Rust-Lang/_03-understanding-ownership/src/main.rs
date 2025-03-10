// Both the stack and the heap are parts of memory available to your code to
// use at runtime, but they are structured in different ways. The stack stores
// values in the order it gets them and removes the values in the opposite order.
// This is referred as *last-in, first-out*(LIFO). Adding data is called *pushing
// onto the stack*, and removing data is called *popping off the stack*. All
// data stores on the stack must have a known, fixed size. Data with an unknown 
// size at compile time or a size that might change must be stored on the heap
// instead.

// The heap is less organized: when you put data on the heap, you request a certain
// amount of space. The memory allocator finds an empty spot in the heap that is big
// enough, marks it as being in use, and returns a *pointer*, which is the address
// of that location. This process is called *allocating on the heap*. Because the
// pointer to the heap is known, fixed size, you can store the pointer on the stack,
// but when you want the actual data, you must follow the pointer.

// Pushing to the stack is faster than allocating on the heap because the allocator
// never has to search for a place to store new data; that location is always at the
// top of the stack. Allocating space on the heap requires more work because the
// allocator must first find a big enough space to hold the data and then perform
// bookkeeping to prepare for the next allocation.

// When your code calls a function, the values passed into the function (including,
// pointers to data on the heap) and the function's local variables get pushed onto
// the stack. When the function is over, those values get popped off the stack.

// Each value in Rust has an *owner*
// There can only be one owner at a time
// When the owner goes out of scope, the value will be dropped.

fn main() {
    {                            // s is not valid here, it's not yet declared
        let _s: &str = "hello";  // s is valid from this point forward
    }                            // this scope is now over, and s is no longer valid

    // A scope is the range within a program for which an item is valid.

    // When a variable goes out of scope, Rust automatically calls the 'drop' function
    // and cleans up the heap memory for that variable.

    // String literals, where a string value is *hardcoded* into our program, are
    // convenient, but they aren't suitable for every situation in which we may
    // want to use text. One reason is that they're immutable. Another is that
    // not every string value can be known when we write our code like user input.
    // For these situations, Rust has a second string type, 'String'. This type
    // manages data allocated on the heap an as such is able to store an amount
    // of text that is unknown to us at compile time.

    let mut str: String = String::from("hello");
    str.push_str(", world!");   // push_str() appends a literal to a String
    
    let str_1: String = String::from("AshGrey");
    let mut str_2 = str_1;

    // For complicated type, assignment will not copy one to another considering
    // the performance. String has 
    //   1. The pointer of heap that stores the string
    //   2. The length is how much memory, in bytes, the contents of the 'String'
    //      are currently using.
    //   3. The capacity is the total amount of memory, in bytes, that the 'String'
    //      has received from the allocator.

    // When 'str_2' and 'str_1' go out of scope, they will both try to free the same memory.
    // This is known as *double free* error and is one of the memory safety bugs we
    // mentioned previously. To ensure memory safety, after the line 'let str_2 = str_1';
    // Rust considers 'str_1' as no longer valid

    // println!("{str_1}, world"); // uncomment here
    //           ^^^^^^^
    // borrow of moved value: `str_1`

    // Rust also invalidates the first variable, instead of being called a shallow copy,
    // it's known as a *move*. We would say that 'str_1' was *moved* into *str_2*. Therefor
    // any *automatic* copying can be assumed to be inexpensive in terms of runtime 
    // performance.

    str_2 = String::from("Another string");
    println!("{str_2}");

    // If we do want to deeply copy the heap data of the 'String', not just the stack data,
    // we can use a common method called 'clone'

    let str_clone_1 = String::from("Hello");
    let str_clone_2 = str_clone_1.clone();
    println!("str_clone_1 = {str_clone_1}, str_clone_2 = {str_clone_2}");

    test_for_function();
}

fn test_for_function() {
    let s: String = String::from("hello");
    takes_ownership(s);

    // 's's value moves into the function, and so is no longer valid here

    let x: i32 = 5;
    makes_copy(x);
    
    // because 'i32' implements the 'Copy' trait, 'x' does NOT move into the function, 
    // so it's okay to use 'x' afterward
    // println!("{}", s);  // uncomment here, 's' has been moved to the function
    println!("{}", x);

    let s1 = gives_ownership();

    // 'gives_ownership' moves its return value into 's1'

    let s2 = String::from("Hello");
    let s3 = takes_and_gives_back(s2);

    // 's2' is moved into 'takes_and_gives_back', which also moves its return value
    // into 's3'
}
fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}
fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
}
fn gives_ownership() -> String {
    let some_string = String::from("Huaier");
    return some_string;
    // 'gives_ownership' will move its return value into the function that call it.
    // 'some_string' is returned and moves out to the calling function
}
fn takes_and_gives_back(input_string: String) -> String {
    return input_string;
}