//! # My Crate
//! 
//! `my_crate` is a collection of utilities to make performing certain calculations
//! more convenient.

// The style of doc comment `//!` adds documentation to the item that contains the
// comments rather than to the items following the comments. We typically use these
// doc comments inside the crate root file or inside a module to document the crate
// or the module as a whole.

// Rust has a particular kind of comment for documentation, known
// conveniently as a *documentation comment*, that will generate HTML
// documentation. The HTML displays the contents of documentation comments
// for public API items intended for programmers interested in knowing how
// to use your crate as opposed to how your crate is implemented.

/// Returns a number 2
/// 
/// ### Examples
/// 
/// ```
/// let result = document_comment();
/// assert_eq!(2, result);
/// ```
pub fn document_comment() -> i32 { 2 }

fn main() {
    println!("Hello, world!");
}
