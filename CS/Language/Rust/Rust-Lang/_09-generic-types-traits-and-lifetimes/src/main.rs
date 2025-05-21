use std::fmt::{Debug, Display};

fn main() {
    let number_list = vec![13, 34, 100, 65, 20];
    println!("The largest number is {}", largest(&number_list));    // 100

    let char_list = vec!['y', 'x', 'm', 'a'];
    println!("The largest char is {}", largest(&char_list));    // 'y'

    let prod1 = Product { fst: 5, snd: 10 };        // Product<i32, i32>
    let prod2 = Product { fst: 10.0, snd: "This" }; // Product<f64, &'static str>
    println!("The first fields of prod1 is {}", prod1.fst());
    println!("The second fields of prod2 is {}", prod2.snd());

    let news = NewsArticle { 
        headline: String::from("Let me do it for you"),
        location: String::from("China"),
        author: String::from("AshGrey"),
        content: String::from("So would you let me do it for you?"),
    };
    println!("{}", news.summarize());
    println!("{}", news.summarize_author());
    notify(&news);

    println!("{}", longest(&"This", &"AshGrey"));   // AshGrey

    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split(".").next().unwrap();
    let i = ImportantExcerpt {
        part: first_sentence,
    };
}

// When defining a functions that uses generics, we place the generics in the
// signature of the function where we would usually specify the data types of
// the parameters and return value. We place type name declarations inside
// angle brackets: `<>`

fn largest<T: PartialOrd>(list: &[T]) -> &T {
    // The function `largest` is generic over some type `T`
    let mut largest_val: &T = &list[0];

    for item in list {
        if item > largest_val {
            largest_val = item;
        }
    }

    // Consider restricting type parameter `T` with trait `PartialOrd`.

    largest_val
}

// We can also define structs to use a generic type parameter in one or more
// fields using the `<>` syntax.

struct Product<U, V> {
    fst: U,
    snd: V,
}

// We can implement methods on structs and enums and use generic types in their
// definitions too.

impl<U, V> Product<U, V> {
    fn fst(&self) -> &U {
        &self.fst
    }
    fn snd(&self) -> &V {
        &self.snd
    }
}

// We can also constraints on generic types when defining methods on the type.
// Other instances or `Product<U, V>` where `U` is not `f32` and `V` is not
// `f32` will not have this methods defined.

impl Product<f32, f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.fst.powi(2) + self.snd.powi(2)).sqrt()
    }
}

// We can define enums to hold generic data types in their variants

enum MyOption<T> {
    Some(T),
    None
}

// Rust performs [monomorphization](https://en.wikipedia.org/wiki/Monomorphization) of 
// the code using generic at compile time. It is the process of turning generic code into
// specific code by filling in the concrete types that are used when compiled

// A **trait** defines the functionality a particular type has and can share with other
// types. We can use traits to define shared behavior in an abstract way. We can use 
// **trait bounds** to specify that a genetic type can be any type that has certain behavior

pub trait Summary {
    fn summarize(&self) -> String;

    // The syntax for overriding a default implementation is the same as the syntax for
    // implementing a trait method that doesn't have a default implementation.

    fn summarize_author(&self) -> String {
        format!("@{}", self.summarize())
    }
}

pub trait Author {
    fn show_author(&self) -> String;
}

// In **trait**, we describe the behaviors of the types that implement this trait. Each
// type implementing this trait must provide its own custom behavior for the body of the
// method. We should use `for` keyword to implement the trait, `impl <trait_name> for
// <struct_name>`

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} {}", self.headline, self.author, self.location)
    }
}

impl Author for NewsArticle {
    fn show_author(&self) -> String {
        format!("@{}", self.author)
    }
}

// We can use traits as parameter, it only accepts the type that implements this trait.
// For instance, the function `notify` only accepts the variable whose type implements
// trait `Summary`. Or we can use another syntax sugar called **trait bound**

pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

pub fn notify_trait_bound<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

// We can also specify more than one trait bound, we can do so using the `+` syntax

pub fn notify_author(item: &(impl Summary + Author)) {
    println!("{}\n{}", item.summarize(), item.show_author());
}

pub fn notify_author_trait_bound<T: Summary + Author>(item1: &T, item2: &T) {
    println!("{}\n{}", item1.summarize(), item2.show_author());
}

// However, using too many trait bounds, functions with multiple generic type 
// parameters can contain lots of trait bound information between the function's
// name and its parameter list, making teh function signature hard to read.
// Rust has alternate syntax for specifying trait bounds inside a `where` clause
// after the function

fn where_clause<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
    println!("{}", t);
    0
}

// We can also use the `impl trait` syntax in the return position to return a
// value of some type that implements trait:

fn returns_summarize() -> impl Summary {
    NewsArticle {
        headline: String::from("Let me do it for you"),
        location: String::from("Japan"),
        author: String::from("Huaier"),
        content: String::from("So can I do it for you?"),
    }
}

// By using a trait bound with an `impl` block that uses generic type parameters,
// we can implement methods conditionally for types that implement the specified
// traits.

struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y}
    }
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}

// Implementations of a trait on any type that satisfies the trait bounds are called
// **blanket implementations** and are used extensively in the Rust standard library.

impl<T: Display> Summary for T {
    fn summarize(&self) -> String {
        format!("{}", self)
    }
    fn summarize_author(&self) -> String {
        format!("@{}", self)
    }
}

// Every reference in Rust has a **lifetime**, which is the scope for which that
// reference is valid. Most of the time, lifetimes are implicit and inferred,
// just like most of the time, types are inferred

// The Rust compiler has a borrow checker that compares scopes to determine whether
// all borrows are valid

// fn lifetime_checker() {
//     let r;                       // ----------+----- 'a
//     {                            //           |
//         let x = 5;               // -+-- 'b   |
//         r = &x;                  //  |        |
//         // x doesn't live enough // -+        |
//     }                            //           |
//     println!("r: {}", r);        // ----------+
// }

// The inner 'b lifetime is much smaller than the outer 'a lifetime block. At compile
// time, Rust compares the size of the two lifetimes and sees that 'r' has a lifetime
// of 'a but that it refers to memory with lifetime 'b. The program is rejected because
// 'b is shorter than 'a

// fn error_longest(x: &str, y: &str) -> &str { // error here
//     if x.len() > y.len() { x } else { y }
// }
// this function's return type contains a borrowed value, but the signature does not 
// say whether it is borrowed from `x` or `y`

// When we're defining this function, we don't know the concrete values that will be
// passed into this function, so we don't know whether the if case or the else case
// will execute. We also don't know the concrete lifetimes of the references that
// will be passed in

// Lifetime annotations don't change how long any of the references live. Rather,
// they describe the relationships of the lifetimes of multiple references to
// each other without affecting the lifetimes.

// &i32         => a reference
// &'a i32      => a reference with an explicit lifetime
// &'a mut i32  => a mutable reference with an explicit lifetime

// To use lifetime annotations in function signatures, we need to declare the **generic
// lifetime parameters** inside angle brackets between the function name and the parameter
// list

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// The returned reference will be valid as long as both the parameters are valid

// We can define structs to hold references, but in that case we would need to add
// a lifetime annotation on every reference in the struct's definition

struct ImportantExcerpt<'a> {
    part: &'a str,
}

// For `scalable_first_word` function in [../../_03-understanding-ownership/src/main.rs]
// The signature is
//
//    `fn scalable_first_word(s: &str) -> &str`
//
// The reason why this function doesn't need an explicit lifetime annotation is historical
// The rule is called **lifetime elision**

// 0. Lifetimes on function or method parameters are called **input lifetimes**, and 
//    lifetimes on return values are called **output lifetimes**

// 1. The compiler assigns a lifetime parameter to each parameter that's a reference
//    In other words, a function with one parameter gets one lifetime parameter:
//
//      `fn foo<'a>(x: &'a i32)`
//
//    a function with two parameters gets two separate lifetime parameters
//
//      `fn foo<'a, 'b>(x: &'a i32, y: &'b i32)`
//
//   and so on.

// 2. If there is exactly one input lifetime parameter, that lifetime is assigned to
//    all output lifetime parameters:
//
//     `fn foo<'a>(x: &'a i32) -> &'a i32`

// 3. If there are multiple input lifetime parameters, but one of them is `&self`
//    or `&mut self` because this is a method, the lifetime of `self` is assigned
//    to all output lifetime parameters

//     ==> fn first_word(s: &str) -> &str
// (1) ==> fn first_word<'a>(s: &'a str) -> &str
// (2) ==> fn first_word<'a>(s: &'a str) -> &'a str

// Lifetime names for struct fields always need to be declared after the `impl`
// keyword and then used after the struct's name. In method signatures inside
// the `impl` block, references might be tied to the lifetime of references
// in the struct's fields, or they might be independent

impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
    fn explicit_announce<'b, 'c>(&'b self, announcement: &'c str) -> &'b str {
        println!("Explicit attention please: {}", announcement);
        self.part
    }
}

//     ==> fn announce_and_return_part(&self, announcement: &str) -> &str
// (1) ==> fn announce_and_return_part<'b, 'c>(&'b self, announcement: &'c str) -> &str
// (3) ==> fn announce_and_return_part<'b, 'c>(&'b self, announcement: &'c str) -> &'b str

// `'static` denotes that the affected reference can live for the entire duration of
// the program. All string literals have the `'static` lifetime

fn static_lifetime() {
    let s: &'static str = "I have a static lifetime.";
}

fn longest_with_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display
{
    println!("Announcement! {}", ann);
    if x.len() > y.len() { x } else { y }
}