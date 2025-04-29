// Structs are similar to tuples, both hold multiple related values. 
// The pieces of a struct can be different types, and we can use different but
// clear name to specify these values

struct User {
    active: bool,      // Use ',' rather than ';'
    username: String,
    email: String,
    sign_in_count: u64,
}

// Rust supports that look similar to tuples, called *tuple structs*. Tuple structs
// have the added meaning the struct name provides but don't have names associated
// with their fields, they just have the types of the fields. 

struct Color(u32, i32, u32);
struct Point(i32, i32, i32);

// We can also define structs that don't have any fields. These are called unit-like
// structs because they behave similarly to '()'. Unit-like structs can be useful when
// you need to implement a trait on some type but don't have any data that you want
// to store in the type itself.

struct AlwaysEqual;

// Every instance of "AlwaysEqual" is always equal to every instance of any other type.

fn main() {
    // To use a struct after we've defined it, we create an *instance* of that struct
    // by specifying concrete values for each of the fields. We create an instance by
    // stating the name of the struct and then add curly brackets containing key:value
    // pairs. And like other programming languages, we use '.' to get the value
    
    let user_1 = User {
        active: true,
        username: String::from("AshGrey"),
        email: String::from("ashgrey.huaier@gmail.com"),
        sign_in_count: 1,
    };
    println!(
        "reading struct instance values: {} {} {} {}", 
        user_1.active,
        user_1.username,
        user_1.email,
        user_1.sign_in_count
    );

    let mut user_2 = User {
        active: true,
        username: String::from("AshGrey"),
        email: String::from("ashgrey.huaier@gmail.com"),
        sign_in_count: 1,
    };
    user_2.email = String::from("ashgrey.huaier@example.com");
    println!("modifying mutable struct instance values: {}", user_2.email);  // ashgrey.huaier@example.com

    // Note that the entire instance must be mutable. Rust doesn't allow us to mark only
    // certain fields as mutable.

    println!(
        "struct instance as return value: {}", 
        build_user(String::from("ashgrey.huaier@gmail.com"), String::from("Huaier")).username
    );

    let user_3 = build_user(String::from("test@test.com"), String::from("Jack"));
    let user_4 = User {
        email: String::from("ashgrey.huaier@gmail.com"),
        ..user_3
    };
    // The syntax ".." specifies that the remaining fields not explicitly set should have
    // the same value as the fields in the given instance. It's called *struct update
    // syntax*.

    println!("struct update syntax: {} {}", user_4.username, user_3.email);  // Jack test@test.com
    // Both 'active' and 'sign_in_count' are types that implement the 'Copy' trait.

    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);

    // Unlike tuples, tuple structs require you to name the type of the struct when
    // you destructure them.

    let Point(x, y, z) = add_vectors(Point(1, 2, 0), Point(0, -2, 3));
    println!("add vectors: ({}, {}, {})", x, y, z); // (1, 0, 3)

    print_rectangle();
    print_rectangle_area();
    check_rectangle_hold();
    test_constructor();
}

fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username: username,     // -> It can be just "username,"
        email: email,           // -> It can be just "email,"
        sign_in_count: 1,
    }

    // Because the parameter names and the struct field names are exactly the same, we can
    // use the *field init shorthand* syntax.
}

fn add_vectors(a: Point, b: Point) -> Point {
    Point(a.0 + b.0, a.1 + b.1, a.2 + b.2)

    // Although tuple struct doesn't have field names, they can be got by index field.
    // It's same with tuple.
}

#[derive(Debug)]    // This line adds the outer attribute just before the struct definition.
struct Rectangle {
    width: u32,
    height: u32,
}

fn print_rectangle() {
    let rect_1 = Rectangle {
        width: 30,
        height: 50,
    };
    println!("rect_1 is {:?}", rect_1);
    println!("rect_1 is {:#?}", rect_1);

    // If we directly print the Rectangle data, Rust compiler will give an error that
    // the trait `std::fmt::Display` is not implemented for `Rectangle`. If we are in
    // format strings we may be able to use `{:?}` or `{:#?}` (for pretty-print) instead.

    let rect_2 = Rectangle {
        width: dbg!(30),    // [src/main.rs:127:16] 30 = 30
        height: 50,
    };
    dbg!(&rect_1);
    // [src/main.rs:130:5] &rect_1 = Rectangle {
    //     width: 30,
    //     height: 50,
    // }
}

// Another way to print out a value using the `Debug` format is to use the `dbg!` macro,
// which takes ownership of an expression. It prints the file and line number of where
// that `dbg!` macro call occurs in our code along with the resultant value of that
// expression, and returns ownership of the value.

// Methods are similar to functions: we declare them with the 'fn' keyword and a name,
// they can have parameters and a return value, and they contain some code that's run
// when the method is called from somewhere else. Methods are defined within the context
// of a struct (or an enum or a trait object), and their first parameter is always `self`,
// which represents the instance of the struct the methods is being called on.

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

// We start an 'impl' (implementation) block for `Rectangle`. Everything within this
// 'impl' block will be associated with the `Rectangle` type.

// We use `&self` instead of `rectangle: &Rectangle`, the `&self` is actually short for
// `self: &Self`. Within an 'impl' block, the type `Self` is an alias for the type that
// the 'impl' block is for.

fn print_rectangle_area() {
    let rect_1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels. Equal to {}",
        rect_1.area(),
        (&rect_1).area()  // Explicitly add &
    );
}

// Rust doesn't have an equivalent to the '->' operator, instead, Rust has a feature called
// *automatic referencing and dereferencing*. Rust will automatically add & &mut * so object
// matches the signature of the method

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn check_rectangle_hold() {
    let rect_1 = Rectangle { width: 30, height: 50 };
    let rect_2 = Rectangle { width: 10, height: 40 };
    let rect_3 = Rectangle { width: 60, height: 45 };

    println!("Can rect_1 hold rect_2? {}", rect_1.can_hold(&rect_2));   // true
    println!("Can rect_3 hold rect_1? {}", rect_3.can_hold(&rect_1));   // false
}

// All functions defined within an 'impl' block are called *associated functions* because they
// are associated with the type named after the 'impl'. We can define associated functions
// that don't have 'self' as their first parameter (and thus are not methods) because they don't
// need an instance of the type to work with.

// Associated functions that aren't methods are often used for constructors that will return
// a new instance of the struct.

impl Rectangle {
    fn square(size: u32) -> Self {
        Self { width: size, height: size, }
    }
}

// To call this associated function, we use the '::' syntax with the struct name

fn test_constructor() {
    let square_1 = Rectangle::square(3);
    println!("Create a square: {{ width: {}, height: {} }}", square_1.width, square_1.height);
    // '\{' in Rust format string are not legal, we need use '{{' to stand for {
}