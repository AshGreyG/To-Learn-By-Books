// use 'cargo new project_name' to setup the project
// use 'cargo run' to run the project

use std::io;
use std::cmp::Ordering;

// By default, Rust has a set of items defined in the standard library,
// there we need to bring the 'io' input/output library into scope. The
// 'io' library comes from the standard library, known as 'std'

use rand::Rng;

// This is an external dependency, it should be written in the 'cargo.toml':
//
// [dependencies]
// rand = "0.8.5"

fn main() {

    // The 'main' function is the entry point into the program,
    // the 'fn' syntax declares a new function, the parentheses '()'
    // indicate there are no parameters, and the curly bracket '{}' 
    // starts the body of the function.

    let secret_number = rand::thread_rng().gen_range(1..=100);

    // The kind of range expression we're using here takes the form
    // 'start..=end' and is inclusive on the lower and upper bounds.

    //'rand::thread_rng' generates the random number according to the
    // current thread of execution and is seeded by the OS. Then we
    // call the 'gen_range' method on the random number generator.
    // This method is defined by the 'Rng' trait that we brought into
    // scope with the 'use rand::Rng'

    println!("Guess the Number!");

    // 'println!' is a macro that prints a string to the screen.

    loop {
        println!("Please input your guess.");

        let mut guess = String::new();

        // 'let apples = 5' creates a new variable named 'apples' and binds
        // it to the value '5'. In Rust, **variables are immutable by default**,
        // meaning once we give the variable a value, the value won't change.
        // To make a variable mutable, we must add 'mut' before the variable name.
        // 'mut let' is not OK.

        // 'let mut guess' will introduce a mutable variable named 'guess'. The equal
        // sign '=' tells Rust we want to bind something to the variable now. On the
        // right of the '=' is the value that 'guess' is bound to, which is the result
        // of calling 'String::new', a function that returns a new instance of a 'String'.
        // 'String' is a string type provided by the standard library that is a growable,
        // UTF-8 encoded bit of text.

        // The '::' syntax in the '::new' line indicates that 'new' is an associated
        // function of the 'String' type. An *associated function* is a function that's 
        // implemented on a type, in this case 'String'. This 'new' function creates a new,
        // empty string. It's a common name for a function that makes a new value of some
        // kind.

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        // 'io::stdin' function allows us to handle user input. If we hadn't imported the
        // 'io' library with 'use std::io', we can still use the function by writing this
        // function call as 'std::io::stdin'. The 'stdin' function returns an instance
        // of 'std::io::Stdin', which is a type that represents a handle to the standard
        // to the standard input for terminal.

        // The line '.read_line(&mut guess)' calls the 'read_line' method on the standard 
        // input handle to get input from the user. We're also passing '&mut guess' as the
        // argument to 'read_line' to tell it what string to store the user input in. The
        // full job of 'read_line' is to take whatever the user types into standard input
        // and **append** that into a string without overwriting its contents. So we therefore
        // pass that string as an argument. The string argument needs to be mutable so the 
        // method can change the string's content. 

        // The '&' syntax indicates that this argument is a *reference*, which gives you a way
        // to let multiple parts of your code access one piece of data without needing to copy 
        // that data into memory multiple times. Like variables, references are immutable by
        // default. Hence, we need to write '&mut guess' rather than '&guess' to make it mutable.

        // The third line is still a part of a single logical line of code. We could have written
        // this code as:
        //
        // io::stdin().read_line(&mut guess).expect("Failed to read line");
        //
        // It's often used to introduce a newline and other whitespace to help break up long
        // lines when you call a method with the '.method_name()' syntax.

        // 'read_line' puts whatever the user enters into the string we pass to it, but it also
        // returns a 'Result' value. 'Result' is an 'enumeration', often called an 'enum', which
        // is a type that can be in one of multiple possible states. We call each possible state
        // a *variant*.

        // 'Result''s variants are 'Ok' and 'Err'. The 'Ok' variant indicates the operation was
        // successful, and inside 'Ok' is the successfully generated value. The 'Err' variant
        // means the operation failed, and 'Err' contains information about how or why the operation
        // failed.

        // Values of the 'Result' type, like values of any type, have methods defined on them.
        // An instance of 'Result' has an 'expect' method that we can call. If this instance of
        // 'Result' is an 'Err' value, 'expect' will cause the program to crash and display
        // the message that we passed as an argument to 'expect'.

        println!("You guessed: {}", guess);

        // This line prints the string that now contains the user's input. The '{}' set of
        // curly brackets is a placeholder, when printing the value of a variable, the
        // variable name can go inside the curly brackets. We can also write it as:
        //
        // println!("You guessed: {guess}");

        let guess: u32 = guess
            .trim()
            .parse()
            .expect("Please type a number!");

        // + 'trim' method on a 'String' instance will eliminate any white space
        //   at the beginning and end (<space>, \n, \r\n, \t) 
        // + 'parse' method on a 'String' instance converts to a string to another type,
        //   we need to tell Rust the exact number type we want by using 'let guess: u32'.

        // If we didn't change the guess type, the Rust compiler will raise an error:
        //
        // match guess.cmp(&secret_number) {
        //             --- ^^^^^^^^^^^^^^ expected '&String', found '&{integer}'
        //
        // The core of the error states that there are **mismatched types**.
        // Rust has a string, static type system, and it also has type inference.
        // When we wrote 'let mut guess = String::new()', Rust was able to infer that
        // 'guess' should be a 'String'.

        // The number types of Rust:
        // + ...
        // + 'i32': a 32-bit number
        // + 'u32': an unsigned 32-bit number
        // + 'i64': a 64-bit number
        // + ...
        // Unless otherwise specified, Rust defaults to an 'i32'.

        let test_string: String = String::new();

        let _test_num: u32 = match test_string.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;

                // 'break' is to jump out of the loop
            }
        }

        // The 'Ordering' type is another enum and has the variants:
        // + 'Less'
        // + 'Greater'
        // + 'Equal'

        // The 'cmp' method compares two values and can be called on anything that
        // can be compared. It takes a reference to whatever we want to compare
        // with. It returns a variant of the 'Ordering' enum. We use **match**
        // expression to decide what to do next based on which variant of 'Ordering'
        // was returned from the call to 'cmp' with the values in 'guess' and 'secret_
        // number'.

        // A 'match' expression is made up of **arms**. An arm consists of a **pattern**
        // to match against, and the code that should be run if the value given to 'match'
        // fits that arm's pattern.
    }
}