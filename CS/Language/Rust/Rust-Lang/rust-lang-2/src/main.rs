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

}