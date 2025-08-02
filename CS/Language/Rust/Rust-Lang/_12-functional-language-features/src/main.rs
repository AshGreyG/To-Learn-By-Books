// Rust's closure are anonymous functions you can save in a variable or
// pass as arguments to other functions.

use std::{thread, time::Duration};

#[derive(Debug, PartialEq, Copy, Clone)]
enum ShirtColor {
    Red,
    Blue,
}

struct Inventory {
    shirts: Vec<ShirtColor>,
}

impl Inventory {
    fn giveaway(&self, user_preference: Option<ShirtColor>) -> ShirtColor {
        user_preference.unwrap_or_else(|| self.most_stocked())

        // The `unwrap_or_else` method on `Option<T>` is defined by the std.
        // It takes one argument: a closure without any arguments that returns
        // a value `T` (the same type stored in the `Some` variant of the
        // `Option<T>`).
    }

    fn most_stocked(&self) -> ShirtColor {
        let mut num_red = 0;
        let mut num_blue = 0;

        for color in &self.shirts {
            match color {
                ShirtColor::Red => num_red += 1,
                ShirtColor::Blue => num_blue += 1,
            }
        }

        if num_red > num_blue {
            ShirtColor::Red
        } else {
            ShirtColor::Blue
        }
    }
}

fn infer_type() {
    let example_closure = |x| x;

    let s = example_closure(String::from("hello"));
    // let n = example_closure(5); // uncomment here: try using a conversion method: `.to_string()`

    // The first time we call `example_closure` with the `String` value, the compiler infers the
    // type of `x` and the return type of the closure to be `String`. Those types are then locked
    // into the closure in `example_closure`, and we get a type error when we next try to use
    // a different type with the same closure.
}

fn capture_reference() {
    // Closures can capture values from their environment in three ways, which directly
    // map to the three ways a function can take a parameter: borrowing immutably, borrowing
    // mutably, and taking ownership. The closure will decide which of these to use
    // based on what the body of the function does with the captured values.

    // Closure in Rust is the sugar syntax of trait `Fn`, `FnOnce`, `FnMut`

    // Defining a closure that captures a immutable variable.

    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");  // -> [1, 2, 3]

    let only_borrows = || println!("From closure: {list:?}");

    println!("Before calling closure: {list:?}");   // -> [1, 2, 3]
    only_borrows();                                 // -> [1, 2, 3]
    println!("After calling closure: {list:?}");    // -> [1, 2, 3]

    // Defining a closure that captures a mutable variable.

    let mut mut_list = vec![1, 2, 3];
    println!("Before defining closure: {mut_list:?}");  // -> [1, 2, 3]

    let mut borrows_mutably = || mut_list.push(7);

    borrows_mutably();
    println!("After calling closure: {mut_list:?}");    // -> [1, 2, 3, 7]

    // If you want to force the closure to take ownership of the values it uses
    // in the environment even though the body of the closure doesn't strictly
    // need ownership, you can use the `move` keyword before the parameter list.

    // This technique is mostly useful when passing a closure to a new thread
    // to move the data so that it's owned by the new thread.

    let thread_list = vec![1, 2, 3];
    println!("Before defining closure: {thread_list:?}");           // -> [1, 2, 3]

    thread::spawn(move || println!("From thread: {thread_list:?}")) // -> [1, 2, 3]
        .join()
        .unwrap();

    // In this example, even though the closure body still only needs an immutable
    // reference, we need to specify that `thread_list` should be moved into the closure
    // by putting the `move` keyword at the beginning of the closure definition. The
    // new thread might finish before the rest of the main thread finishes, or the main
    // thread might finish first. If the main thread maintained ownership of `thread_list`
    // but ended before the new thread did and dropped `thread_list`, the immutable
    // reference in the thread would be invalid. Therefore, the compiler requires that
    // `thread_list` be moved into the closure given to the new thread so the reference
    // will be valid.

    // If we lack `move` keyword, Rustc will throw an error E0373: A captured variable
    // in closure may not live long enough.
}

// Iterator and closure

fn test_iterator() {
    let vec1 = vec![1, 2, 3];
    let vec1_iter = vec1.iter();    // vec1_iter: Iter<'_, i32>

    for val in vec1_iter {
        println!("Got: {val}");
    }

    let vec2 = vec![0, 1, 2];
    let mut vec2_iter = vec2.iter();
    assert_eq!(vec2_iter.next(), Some(&0));
    assert_eq!(vec2_iter.next(), Some(&1));
    assert_eq!(vec2_iter.next(), Some(&2));
    assert_eq!(vec2_iter.next(), None);

    // Calling the `next` method on an iterator changes internal state that the iterator
    // uses to keep track of where it is in the sequence. In other words, this code
    // consumes, or uses up, the iterator.

    // Notice that the return value of `next` is an immutable reference. If you want to
    // create an iterator that takes ownership of `vec2` and returns owned values, we
    // can call `into_iter` instead of `iter`. Similarly, if we want to iterate over
    // mutable references, we can call `iter_mut` instead of `iter`.

    let vec3 = vec![0, 1, 2];
    let vec3_into_iter = vec3.into_iter();  // vec3_into_iter: IntoIter<i32>

    // The vector can not be used after iterating it. It's a consumer iterator.

    let vec4: Vec<i32> = vec![1, 2, 3];
    let vec5: Vec<i32> = vec4.iter().map(|x| x * x).collect();
    assert_eq!(vec5, vec![2, 4, 9]);
}

// Many iterator adapters take closures as arguments, and commonly the closures we'll
// specify as arguments to iterator adapters will be closures that capture their
// environment.

#[derive(PartialEq, Debug)]
struct Shoe {
    size: u32,
    style: String,
}

fn shoes_in_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
    shoes.into_iter().filter(|s| s.size == shoe_size).collect()

    // We call `into_iter` to create an iterator that takes ownership of the vector.
    // Then we call `filter` to adapt that iterator into a new iterator that only
    // contains elements for which the closure returns `true`.
}


fn main() {
    let store = Inventory {
        shirts: vec![ShirtColor::Blue, ShirtColor::Red, ShirtColor::Blue],
    };

    let user_pref1 = Some(ShirtColor::Red);
    let giveaway1 = store.giveaway(user_pref1);
    println!(
        "The user with preference {:?} gets {:?}",
        user_pref1, giveaway1
    );
    // The user with preference Some(Red) gets Red

    let user_pref2 = None;
    let giveaway2 = store.giveaway(user_pref2);
    println!(
        "The user with preference {:?} gets {:?}",
        user_pref2, giveaway2
    );
    // The user with preference None gets Blue

    // There are more differences between functions and closures. Closures don't
    // usually require you to annotate the types of the parameters or the return value
    // like `fn` functions do.

    // Type annotations are required on functions because the types are part of an
    // explicit interface exposed to users. Closures are typically short and relevant
    // only within a narrow context rather than in any arbitrary scenario. Within
    // these limited contexts, the compiler can infer the types of the parameters and
    // the return type, similar to how it's able to infer the types of most variables.

    let expensive_closure = |num: u32| -> u32 {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    };

    capture_reference();
    test_iterator();
}
