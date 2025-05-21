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