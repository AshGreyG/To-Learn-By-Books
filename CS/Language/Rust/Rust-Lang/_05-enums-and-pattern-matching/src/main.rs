// Enums give you a way of saying a value is one of a possible set of values
// Any IP address can be either a version four or a version six address, but not
// both at the same time.

enum IpAddressKind {
    V4,
    V6,
}

// We can put the data directly into each enum variant:

enum IpAddressKindData {
    V4(String),
    V6(String),
}

enum Message {
    Quit,
    Move { x: i32, y: i32 }, // Not ({ x: i32, y: i32 })
    Write(String),
    ChangeColor(u32, u32, u32),
}

fn main() {
    // We can create instances of each of the two variants of `IpAddressKind` like
    let four = IpAddressKind::V4;
    let six = IpAddressKind::V6;
    route(four); // It is IPv4
    route(six); // It is IPv6

    let four_str = IpAddressKindData::V4(String::from("127.0.0.1"));
    let six_str = IpAddressKindData::V6(String::from("2001:0db8:85a3:0000:0000:8a2e:0370:7334"));
    let message = Message::Write(String::from("Write some code into it."));
    route_data(four_str, &message);
    route_data(six_str, &message);

    // We attach data to each variant of the enum directly, so there is no need for
    // an extra struct. `IpAddressKindData::V4()` is also a function call that takes
    // s `String` argument and returns an instance of the `IpAddressKindData` type.
    // We automatically get this constructor function defined as a result of defining
    // the enum.

    let some_number = Some(5); // some_number: Option<i32>
    let some_char = Some('e'); // some_char: Option<char>
    let absent_number: Option<i32> = None;

    println!("{:?}", plus_one(some_number)); // Some(6)
    println!("{:?}", plus_one(absent_number)); // None

    test_if_let_syntax();

    let alabama = UsState::Alabama;
    println!("Alabama is in 1890? {}", alabama.existed_in(1890)); // true
}

fn route(ip_kind: IpAddressKind) {
    match ip_kind {
        IpAddressKind::V4 => println!("It is IPv4"),
        IpAddressKind::V6 => println!("It is IPv6"),
    }

    // If a pattern matches expression executes, it compares the resultant value
    // against the pattern of each arm. If a pattern matches the value, the code
    // associated with that pattern is executed.
}

fn route_data(ip_kind: IpAddressKindData, msg: &Message) {
    match ip_kind {
        IpAddressKindData::V4(address) => println!("It is IPv4 and its address is {}", address),
        IpAddressKindData::V6(address) => println!("It is IPv6 and its address is {}", address),
    }

    // When enum stores the data, we can use a variable name after the pattern match,
    // this variable will be the value of the stored data.

    // Sometimes we don't want to match some patterns separately, then we could use
    // _ to match left patterns like

    match msg {
        Message::Quit => println!("Quit"),
        Message::Write(message) => println!("Message is {}", message),
        _ => println!("Other commands"),
    }
}

// `Option` is enum defined by the standard lib, the `Option` type encodes the very
// common scenario in which a value could be something or it could be nothing. In
// standard lib it's defined as below:

// enum Option<T> {
//     None,
//     Some(T),
// }

fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

// If we only want to do something for a specific pattern we can use `if let` syntax.
// It works the same way as a `match`, where the expression is given to the `match` and
// the pattern is its first arm. We can include an `else` with an `if let`, the block
// of code that goes with the `else` is the same as the block of code that would go with
// the `_` case in the `match` expression.

fn test_if_let_syntax() {
    let msg = Message::Write(String::from("It's a test string for if let syntax"));
    if let Message::Write(message) = msg {
        println!("The message is \"{}\"", message);
    } else {
        println!("Didn't receive any message");
    }
}

enum UsState {
    Alabama,
    Alaska,
}

impl UsState {
    fn existed_in(&self, year: u16) -> bool {
        match self {
            UsState::Alabama => year >= 1819,
            UsState::Alaska => year >= 1959,
        }
    }
}

// Pattern match can use `|` to match multiple values, use `..=` to match ranges.
// `_` is used for exhaustiveness checking. If you want to use a variable to store
// the matched value, you can use `@`

fn match_symbol() {
    let day = 6;
    match day {
        weekend @ (0 | 6) => {
            // Here needs a pair of parentheses, if we use `weekend @ 0 | 6`, rust
            // will think you use `weekend` to match specific value `0`, so Rust will
            // throw an error E0408

            println!(
                "This is weekend! Today is {}",
                if weekend == 0 { "Sunday" } else { "Saturday" }
            )
        }
        weekday @ 1..=5 => println!("This is weekday! Values is {}", weekday),
        _ => println!("Invalid"),
    }
}

// We could use `ref` keyword to get a reference:

fn match_reference() {
    let x: i32 = 5;
    let mut y: i32 = 6;

    match x {
        ref r => println!("Got a reference to {}", r),
        // The type of `r` here is &i32
    }

    match y {
        ref mut mr => println!("Got a mutable reference to {}", mr),
        // The type of `mr` here is &i32 and it's mutable.
    }
}
