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

    println!("{}", str_2);
    str_2 = String::from("Another string");
    println!("{}", str_2);

    // If we do want to deeply copy the heap data of the 'String', not just the stack data,
    // we can use a common method called 'clone'

    let str_clone_1 = String::from("Hello");
    let str_clone_2 = str_clone_1.clone();
    println!("str_clone_1 = {str_clone_1}, str_clone_2 = {str_clone_2}");

    test_for_function();
    test_slice_string();
    test_from_start_slice();
    test_to_end_slice();
    test_complete_slice();

    let str_3 = String::from("Love you Huaier");
    let str_literal_3 = "Love you Huaier";
    println!(
        "Test correct first word for \"Love you Huaier\": {}", 
        correct_first_word(&str_3)  // Love
    );

    println!(
        "Test scalable first word for \"Love you Huaier\": {} {} {} {}",
        scalable_first_word(&str_3[..]),            // Love
        scalable_first_word(&str_3[..2]),           // Lo
        scalable_first_word(str_literal_3),         // Love
        scalable_first_word(&str_literal_3[..2])    // Lo
    );
}

// +----------+-------+       +-------+-------+
// |   name   | value |       | index | value |
// |      ptr | ------+-----> |     0 | H     |
// |      len | 5     |       |     1 | e     |
// | capacity | 5     |       |     2 | l     |
// +----------+-------+       |     3 | l     |
//                            |     4 | o     |
//                            +-------+-------+

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

    let _s1 = gives_ownership();

    // 'gives_ownership' moves its return value into '_s1'

    let s2 = String::from("Hello");
    let _s3 = takes_and_gives_back(s2);

    // 's2' is moved into 'takes_and_gives_back', which also moves its return value
    // into '_s3'
}
fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}
fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
}
fn gives_ownership() -> String {
    let some_string = String::from("Huaier");
    some_string
    // 'gives_ownership' will move its return value into the function that call it.
    // 'some_string' is returned and moves out to the calling function
}
fn takes_and_gives_back(input_string: String) -> String {
    input_string
}

// Takeing ownership and then returning ownership with every function is a bit tedious.
// What if we want to let a function use a value but not take ownership?. Rust does let
// us return multiple values using a tuple

fn _calculate_length(s: String) -> (String, usize) {
    let length: usize = s.len();
    (s, length)
}

// We can provide a reference to the 'String' value. A *reference* is like a pointer in
// that it's an address we can follow to access the data stored at that address, but
// the data is owned by some other variable. Unlike a pointer, a reference is guaranteed
// to a valid value of a particular type

fn _calculate_length_using_ref(s: &String) -> usize {
    s.len()
}

// Reference points to the pointer in the String structure. The opposite of referencing
// by using '&' is dereferencing, which is accomplished with the dereference operator '*'.
// We call the action taking ownership as *borrow*

// Normal reference cannot be changed in function, but we can use mutable reference to
// modify it: (If we have a mutable reference to a variable, that we cannot have other
// references to that variable. This principle is designed to fix the data race problem)

fn _change_string(s: &mut String) {
    s.push_str("hello");
}

// A dangling reference refers to the freed memory space:

// fn _dangle_reference() -> &String {
//     let s: String = String::from("This");
//     &s
// }

fn _first_word(s: &String) -> usize {
    let bytes = s.as_bytes();
    // Convert string to bytes array
    for (i, &item) in bytes.iter().enumerate() {
        // + 'iter' is a method that returns each element in a collection
        // + 'enumerate' is a method that wraps the index and reference to
        //   the data as a tuple.
        if item == b' ' {
            return i;
        }
    }
    s.len()
}

// However, this function has a big problem: consider we have a String variable 's' and
// we use '_first_word" to get the first word end index of 's', when 's' is cleared, 
// the first word end index is still the first value (that means the result is not related
// to 's', they are not kept in sync).

// Rust has method to solve this problem: the reference to string slices:
// A string slice is a reference to part of a `String`, and it looks like this

fn test_slice_string() {
    let s = String::from("hello world!");
    let hello = &s[0..5];
    let world = &s[6..11];
    println!("From test_slice_string: {}", hello);  // hello
    println!("From test_slice_string: {}", world);  // world
}

// With Rust's '..' range syntax, if we want to start at index 0, we can drop the value before
// the two periods. And if we want to include the last byte of the 'String', we can drop the
// trailing number. 

fn test_from_start_slice() {
    let s = String::from("hello");
    let slice_1 = &s[0..2];
    let slice_2 = &s[..2];
    println!("From test_from_start_slice: {}", slice_1);    // he
    println!("From test_from_start_slice: {}", slice_2);    // he
}

fn test_to_end_slice() {
    let s = String::from("hello");
    let slice_1 = &s[3..s.len()];
    let slice_2 = &s[3..];
    println!("From test_to_end_slice: {}", slice_1);    // lo
    println!("From test_to_end_slice: {}", slice_2);    // lo
}

fn test_complete_slice() {
    let s = String::from("hello");
    let slice_1 = &s[0..s.len()];
    let slice_2 = &s[..];
    println!("From test_complete_slice: {}", slice_1);  // hello
    println!("From test_complete_slice: {}", slice_2);  // hello
}

// For the purposes of introducing string slices, we are assuming ASCII only.

fn correct_first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

// let s = "Hello World";
// The type of 's' here is '&str': it's a slice pointing to that specific point of
// the binary, &str is an immutable reference.

// Defining a function to take a string slice instead of a reference to a `String`
// makes our API more general and useful without losing any functionality.

fn scalable_first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}