// Rust groups errors into two major categories: *recoverable* and *unrecoverable* errors
// For a recoverable error, such as a *file not found* error, we most likely just want
// to report the problem to the user and retry the operation. Unrecoverable errors are
// always symptoms of bugs, such as trying to access a location beyond the end of an array,
// and so we want to immediately stop the program.

// Rust has 'Result<T, E>' for recoverable errors and the 'panic!' macro that stops execution
// when the program encounters an unrecoverable error.

// Panics will print a failure message, unwind, clean up the stack and quit

use std::{fs::File, io::{self, ErrorKind, Read}};

fn main() {
    // panic!("crash and burn 🔥");    // uncomment here

    // A backtrace is a list of all the functions that have been called to get to this point.
    // Backtraces in Rust works as they do in other languages.

    let test_panic_vec = vec![1, 2, 3];
    // let test_panic = test_panic_vec[99]; // uncomment here

    // $ RUST_BACKTRACE=1 cargo run     // This environment variable tells Rust to output 
    // $ RUST_BACKTRACE=full cargo run  // more detailed errors.
    
    // ----------- Recoverable Errors -----------

    // 'Result' enum is defined as having two variants, 'Ok' and 'Err'. 'T' represents
    // the type of the value that will be returned in a success case within the 'Ok'
    // variant. Because 'Result' has these generic type parameters

    let greeting_file_result = File::open("hello.txt"); 
    //  greeting_file_result: Result<std::fs::File, std::io::Error> / or short for Result<File, Error>

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => panic!("Problem opening the file: {:?}", other_error),
        },
    };

    // We could also use closure to rewrite this code snippet

    let greeting_file_closure = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {:?}", error);
            })
        } else {
            panic!("Problem opening the file: {:?}", error);
        }
    });

    // The 'Result<T, E>' type has many helper methods defined on it to do various
    // and more specific tasks. The 'unwrap' methods is a shortcut method implemented
    // just like the 'match' expression. If the 'Result' value is the 'Ok' variant,
    // 'unwrap' will return the value inside the 'Ok'. If the 'Result' is the 'Err'
    // variant, 'unwrap' will call the 'panic!' macro for us.

    let unwrap_file = File::open("hello.txt").unwrap();
    let expect_file = File::open("hello.txt").expect("hello.txt should be here");

    let username = read_username_from_file();
}

// When a function's implementation calls something that might fail, instead of
// handling the error within the function itself you can return the error to
// the calling code so that it can decide what to do. This is known as *propagating*
// the error.

fn read_username_from_file() -> Result<String, io::Error> {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}

// This pattern of propagating errors is so common in Rust that Rust provides the
// question mark operator '?' to make this easier.

fn shorter_read_username() -> Result<String, io::Error> {
    let mut username_file = File::open("hello.txt")?;
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}

// There is a difference between what the 'match' expression and what the '?' operator
// does 