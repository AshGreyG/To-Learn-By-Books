#[derive(Debug)]
pub struct Rectangle {
    pub width: u32,
    pub height: u32,
}

impl Rectangle {
    pub fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
    pub fn square(&self) -> u32 {
        self.width * self.height
    }
}

pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 {
            panic!("Guess value must be greater than or equal to 1, got {}.", value);
        } else if value > 100 {
            panic!("Guess value must be less than or equal to 100, got {}", value);
        }

        Guess { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // Testing boolean value: `assert!`

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };
        assert!(larger.can_hold(&smaller));
        assert!(
            !smaller.can_hold(&larger), // Delete the symbol `!` to see result
            "Smaller is {:?}, larger is {:?}",
            smaller,
            larger
        );

        // We can also use format macro in assert macros
    }

    // Testing equality: `asset_eq!` and `assert_ne`

    #[test]
    fn calculate_square() {
        let a = Rectangle {
            width: 8,
            height: 7,
        };
        let b = Rectangle {
            width: 1,
            height: 9,
        };
        assert_eq!(a.square(), 56);
        assert_ne!(b.square(), 1);
    }

    // In some languages and test frameworks, the parameters to equality
    // functions are called `expected` and `actual`, and the order in which
    // we specify the arguments matters. However in Rust, they're called
    // `left` and `right`, and the order iin which we specify the value we 
    // expect and the value the code produces doesn't matter.

    // We can also add a custom message to be printed with the failure as
    // optional arguments to the `assert!`, `assert_eq!` and `assert_ne!`
    // macros. Any arguments specified after the required arguments are
    // passed along to the `format!` macros

    // Checking for panics with `should_panic`

    #[test]
    #[should_panic(expected = "less than or equal")]
    fn greeter_than_100() {
        Guess::new(200);
    }

    // We can also write tests that use `Result<T, E>`

    #[test]
    fn return_result() -> Result<(), String> {
        let a = Rectangle {
            width: 3,
            height: 3,
        };
        if a.square() == 9 {
            Ok(())
        } else {
            Err(String::from("the square of 3,3 should be 9"))
        }
    }

    // When we run multiple tests, by default they run in parallel using
    // threads. So we must make sure our tests don't depend on each other or
    // on any shared state, including a shared environment

    // + If we don't want to run the tests in parallel we can use `--test-threads=1`
    //   flag. 
    // + If we want to see printed tests as well, we can tell Rust to also
    //   show the output of successful tests with the `--show-output` flag
    // + If we want to run subset of tests, we can use the name of test function
    //   `-- cargo test <function_name>`

    #[test]
    #[ignore]
    fn expensive_test() {
        // code that takes an hour to run
    }

    // + If we want to run only the ignored tests, we can use 
    //   `cargo test -- --ignored`
}

// Rust community thinks about tests in terms of two main categories: unit tests
// and integration tests. 
// + Unit tests are small and more focused, testing one
//   module in isolation at a time, and can test private interfaces.
// + Integration tests are entirely external to our library and use our code in
//   the same way any other external code would, using only the public interface
//   and potentially exercising multiple modules per test.

// The code above is the unit test, annotated as `#[cfg(test)]`

