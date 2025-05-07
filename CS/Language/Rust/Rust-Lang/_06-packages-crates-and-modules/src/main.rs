use crate::garden::vegetables::Asparagus;

// A package can contain multiple binary crates and optionally one library crate. As
// a package grows, you can extract parts into separate crates that become external 
// dependencies.

// A *crate* is the smallest amount of code that the Rust compiler considers at a
// time. If we run 'rustc' rather than 'cargo' and pass a single source code file, 
// the compiler considers that file to be a crate. Crates can contain modules, and
// the modules may be defined in other files that get compiled with the crate.

// Library crates don't have a `main` function, and they don't compile to an executable.
// Instead, they define functionality intended to be shared with multiple projects.
// The *crate root* is a source file that the Rust compiler starts from and makes up
// the root module of our crate.

// A package contains a *Cargo.toml* file that describes how to build those crates.

// - Start from the crate root: When compiling a crate, the compiler first looks in the
//   crate root file (usually src/lib.rs for a library crate or src/main.js for a
//   binary crate) for code to compile.

// - Declaring modules: In the crate root file, we can declare new modules; say we
//   declare a module with 'mod ***;'. The compiler will look for the module's code
//   in these places:
//   - Inline, within curly brackets that replace the semicolon following 'mod ***'
//   - In the file src/***.rs
//   - In the file src/***/mod.rs

// - Declaring submodules is similar to declaring a normal module.

// - Private vs. Public: Code within a module is private from its parent modules by default.
//   To make a module public, declare it with 'pub mod' instead of 'mod'. To make items
//   within a public module public as well, use 'pub' before their declarations.

// - The 'use' keyword: Within a scope, the 'use' keyword creates shortcuts to items to reduce
//   repetition.

// A path can take two forms:

// - An *absolute path* is the full path starting from a crate root; for code from an external
//   crate, the absolute path begins with the crate name, and for code from the current crate,
//   it starts with the literal 'crate';
// - A *relative path* starts from the current module and uses 'self', 'super', or an
//   identifier in the current module.

mod inline {
    // This is the inline modules
}

pub mod garden;

// Items in a parent module can't use the private items inside child modules, but items in
// child modules can use the items in their ancestor modules.

fn main() {
    crate::garden::vegetables::eat_vegetable(); // Absolute path
    garden::vegetables::eat_vegetable();        // Relative path
}