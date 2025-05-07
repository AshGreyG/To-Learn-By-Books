// We can construct relative paths that begin in the parent module, rather than
// the current module or the crate root, by using 'super' at the start of the
// path. This is like starting a filesystem path with the '..' syntax.

use super::has_eaten_before;
use super::Vegetables;

// Using the parent modules distinguishes the two 'Result' types. If instead we
// specified 'use std::fmt::Result' and 'use std::io::Result', we'd have two
// 'Result' types in the same scope, and Rust wouldn't know which one we meant
// when we used 'Result'.

use std::fmt;
// use std::io;
// use std::io::Result as IoResult;

// After the path, we can specify 'as' and a new local name, or *alias* for
// the type.

use std::{cmp::Ordering, alloc};
use std::io::{self, Result as IoResult};

// If we're using multiple items defined in the same crate or same module, listing
// each item on its own line can take up a lot of vertical space in our files. We can
// use nested paths to bring the same items into scope in one line. We do this
// by specifying the common part of the path, followed by two colons. We can use
// 'self' in the nested path.

use std::collections::*;

// If we want to bring all public items defined in a path into scope, we
// can specify that path followed by the '*' glob operator.

#[derive(Debug)]
pub struct Asparagus {}

// If we use 'pub' before a struct definition, we make the struct public but the
// struct fields will still be private.

// If we use 'pub' before an enum, all of its variants are then public. We only need
// the 'pub' before the 'enum' keyword.

impl Asparagus {
    pub fn has_eaten_asparagus() -> bool {
        has_eaten_before(Vegetables::Asparagus)
    }
}

// Implementation doesn't need 'pub' keyword.

pub fn eat_vegetable() {
    println!("Eat! Eat! Eat!");
}

fn function1() -> fmt::Result { Ok(()) }
fn function2() -> io::Result<()> { Ok(())}
fn function3() -> IoResult<()> { Ok(()) }