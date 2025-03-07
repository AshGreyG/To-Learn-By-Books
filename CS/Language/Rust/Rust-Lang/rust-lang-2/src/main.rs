fn main() {
    let test = 5;
    println!("The value of test is: {test}");

    // x = 6;  // uncomment here
    // ^^^^^
    // cannot mutate immutable variable 'x'
    //
    // We can add 'mut' in front of the variable name to let
    // the variable to be mutable

    let mut test_mutable = 5;
    println!("The value of test is: {test_mutable}");
    test_mutable = 3;
    println!("The value of test is: {test_mutable}");

    const ONE_DAY_IN_SECONDS: u32 = 60 * 60 * 24;
    println!("One day has {ONE_DAY_IN_SECONDS} seconds.");

    // **constants** are values that are bound to a name and
    // are not allowed to change. Constant globals cannot be
    // mutable:
    //
    // const mut TEST_CONSTANT_MUTABLE: i32 = 3;   // uncomment here
    //       ^^^
    // const globals cannot be mutable

    let test_shadow: i32 = 5;
    let test_shadow = test_shadow + 1;
    println!("Now the value of test_shadow is: {test_shadow}");

    {
        let test_shadow = test_shadow * 2;
        println!("Now the value of inner scope test_shadow is: {test_shadow}");
    }

    println!("Now the value of test_shadow is: {test_shadow}");

    // We can declare a new variable with the same name as a previous
    // variable. Rustacean says that the first variable is shadowed
    // by the second, which means the second variable is what the
    // compiler will see when we use the name of the variable.

    // By using 'let', we can perform a few transformations on a value
    // but have the variable be immutable after those transformations
    // have been completed.

    let spaces = "  ";
    let spaces = spaces.len();
    println!("Now 'spaces' is a number, its value is {spaces}");

    // Using 'let' can transform the type of variable.

    // Every value in Rust is of a certain **data type**, which tells Rust what
    // kind of data is being specified so it knows how to work with that data.
    // Rust is a **statically typed** language, which means that it must know
    // the types of all variables

    // A scalar type represents a single value. Rust has four primary types:
    // integers, floating-point numbers, booleans and characters.

    // Integer type has the difference between *signed* (using i) and *unsigned*
    // (using u). The integer types in Rust:

    //    Length       Signed       Unsigned
    //     8-bit        i8              u8
    //    16-bit        i16             u16
    //    32-bit        i32             u32
    //    64-bit        i64             u64
    //   128-bit        i128            u128
    //      arch        isize           usize
    
    // The 'isize' and 'usize' types depend on the architecture of the computer
    // program is running on: 64 bits if you're on a 64-bit architecture and
    // 32-bits if you're on a 32-bit architecture.

    let num_decimal = 98_222;   // decimal
    let num_hex = 0xff;         // hex
    let num_octal = 0o77;       // octal
    let num_binary = 0b1011_1;  // binary
    let num_byte = b'A';        // byte
    println!("{num_decimal}, {num_hex}, {num_octal}, {num_binary}, {num_byte}");

    // Rust's defaults are generally good places to start: integer types default
    // to 'i32', the primary situation in which you'd use 'isize' or 'usize'
    // is when indexing some sort of collection.

    // 'u8' can hold values between 0 and 255, if you try to change the variable
    // to a value outside that range, such as 256, *integer overflow* will occur.
    // Rust includes checks for integer overflow that cause your program to
    // *panic* at runtime if this behavior occurs. When you're compiling in
    // release mode with the '--release' flag, Rust does not include checks for
    // integer overflow that cause panics. Instead, if overflow occurs, Rust
    // performs *two's complement wrapping*. In the case of a 'u8', the value
    // 256 becomes 0, the value 257 becomes 1. The program won't panic, but the
    // variable will have a wrong value.

    // Rust also has two primitive types for floating-point numbers, they are
    // 'f32' and 'f64', which are 32 bits and 64 bits in size. The default type
    // is 'f64' because on modern CPUs, it's roughly the same speed as 'f32' but
    // is capable of more precision.

    let num_float_default = 2.0;    // f64
    let num_float_32: f32 = 3.0;    // f32
    println!("{num_float_default} {num_float_32}");

    let _t = true;
    let _f: bool = false;

    let _char_z = 'z';    // c: char
    let _char_z_explicit = 'Z';
    let _bingo_emoji = '✅';

    // Compound types can group multiple values into one type, Rust has two primitive
    // compound types: tuples and arrays:

    let _test_tuple: (i32, f64, u8) = (500, 6.4, 1);

    // The variable '_test_tuple' binds to the entire tuple because a tuple is 
    // considered a single compound element. To get the individual values out of a
    // tuple, we can use pattern matching to destructure a tuple value:

    let (_x, _y, _z) = _test_tuple;
    println!("The value of x, y, and z are {_x}, {_y}, {_z}");

    // This is called *destructuring* because it breaks the single tuple into three
    // parts. We can also access a tuple element directly by using a period '.'
    // followed by the index of the value we want to access:

    let index_x = _test_tuple.0;
    let index_y = _test_tuple.1;
    let index_z = _test_tuple.2;
    println!("The value of x, y and z using index are {index_x}, {index_y}, {index_z}");

    // The tuple without any values has a special name: *unit*. This value and its
    // corresponding type are both written '()' and represent an empty value or an
    // empty return type.
    
    // Another way to have a collection of multiple values is with an *array*. Unlike
    // a tuple, every element of an array must have the same type. Unlike arrays in
    // some other languages, arrays in Rust have a fixed length.

    let _test_int_array = [1, 2, 3];    // [i32; 3]

    // An array isn't as flexible as the vector type. A *vector* is a similar collection
    // type provided by the standard library that is allowed to grow and shrink in size.
    // Arrays are more useful when you know the number of elements will not need to change

    const _MONTH_NAME: [&str; 12] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // You write an array's type using square brackets with the type of each element, a
    // *semicolon*, and then the number of elements in the array.

    let _initialize = [3; 5];   // [3, 3, 3, 3, 3]

    const _DECEMBER: &str = _MONTH_NAME[11];

    another_test_function();
}

fn another_test_function() {
    // Rust code uses *snake case* as the conventional style for function and variable
    // names, in which all letters are lowercase and underscores separate words.
    // Rust don't care where you define your functions, only that they're defined
    // somewhere in a scope that can be seen by the caller.
    println!("Yet another function!");
    function_has_parameter(4);
}

fn function_has_parameter(x: i32) {
    println!("The value of x is: {x}");

    // The declaration of 'function_has_parameter' has one parameter named 'x'. The
    // type of 'x' is specified as 'i32'. In function signatures, you must declare
    // the type of each parameter.

    // Statements do not return values, therefore, you can't assign a 'let' statement
    // to another variable.

    let test_expression: i32 = {
        let _inner = 3;
        _inner + 1
    };
    println!("This is an expression in statement: {test_expression}");

    // This expression is a block that evaluates to 4. That value gets bound to 'test
    // _expression' as part of the 'let' statement

    let call_return = function_has_returns(3);
    println!("We call function which has returns: {call_return}");
}

fn function_has_returns(x: i32) -> i32 {
    return x + 1;   // or just 'x + 1'
}

fn _control_flow() {
    let number = 3;

    if number < 5 {
        println!("Condition was true");
    } else {
        println!("Condition was false");
    }

    // Rust will not automatically try to convert non-Boolean types to a Boolean.
    // You must be explicit and always provide 'if' with a Boolean as its condition.

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }

    let condition: bool = true;
    // let _type_conflict = if condition { 3 } else { "six" }; // uncomment here
    let _condition_assign: i32 = if condition { 3 } else { 4 };

    // The 'loop' keyword tells Rust to execute a block of code over and over again
    // forever until you explicitly tell it to stop. You can place the 'break'
    // keyword within the loop to tell the program when to stop
}