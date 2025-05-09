use std::{collections::HashMap, hash::Hash, thread::Scope};

fn main() {
    let mut test_vec: Vec<i32> = Vec::new();

    // Note that we added a type annotation here. Because we aren't inserting
    // any values into this vector, Rust doesn't know what kind of elements we
    // intend to store. Vectors are implemented using generics.

    // More often, we'll create a 'Vec<T>' with initial values and Rust will 
    // infer the type of value you want to store. Rust conveniently provides
    // the 'vec!' macro which will create a new vector that holds the values
    // you give it.

    let mut test_vec_with_macro = vec![1, 2, 4];    // Vec<i32>

    // To add elements into a vector we can use 'push' method

    test_vec.push(4);               // [4]
    test_vec_with_macro.push(5);    // [1, 2, 4, 5]

    // There are two ways to reference a value stored in a vector: via indexing
    // or by using the 'get' method.

    let test_ref_index: &i32 = &test_vec_with_macro[2];
    let test_ref_get1: Option<&i32> = test_vec_with_macro.get(2);
    let test_ref_get2: Option<&i32> = test_vec.get(2);

    println!("{}", test_ref_index); // 4
    match test_ref_get1 {
        Some(value) => println!("{}", value),       // ✅
        None => println!("There is no element"),
    }
    match test_ref_get2 {
        Some(value) => println!("{}", value),
        None => println!("There is no element"),    // ✅
    }

    let test_first = &test_vec[0];
    // test_vec.push(6);    // uncomment here
    println!("The first element is {}", test_first);

    // Vector puts the values next to each other in memory, adding a new element
    // onto the end of the vector might require allocating new memory and copying
    // the old elements to the new space.

    for i in &mut test_vec_with_macro {
        print!("{} ", i);   // 1 2 4 5
        *i += 50;
        print!("{} ", i);   // 51 52 54 55

        // We could use dereference operator '*' to get to the value in 'i' before
        // we can use the '+=' operator.
    }

    // Vectors can only store values that are of the same type and this can be
    // inconvenient. However, the variants of an enum are defined under the same
    // enum type, so when we need one type to represent elements of different
    // types, we can defined and use an enum.

    enum SpreadsheetCell {
        Int(i32),
        Float(f64),
        Text(String),
    }

    let test_row = vec![
        SpreadsheetCell::Int(32),
        SpreadsheetCell::Float(78.90),
        SpreadsheetCell::Text(String::from("test for ashgrey")),
    ];

    // -------------- String ----------------

    let mut test_str = "initial contents".to_string();  // Equals to String::from()
    test_str.push_str("ashgrey");

    // In addition, we can use the '+' operator or the 'format!' macro to concatenate
    // 'String' values.

    test_str.push('1');
    println!("\n{}", test_str); // initial contentsashgrey1

    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2;
    println!("{}", s3); // Hello, world!

    // Note that s1 has been moved here and can no longer be used. The '+' operator uses
    // the 'add' method, whose signature looks something like this:
    //
    // fn add(self, s: &str) -> String
    //
    // The reason we're able to use '&s2' in the call to 'add' is that the compiler can
    // *coerce* the '&String' argument into a '&str'. When we call the 'add' method,
    // Rust uses a *deref coercion*, which here turns '&s2' into '&s2[..]'.
    //
    // In the signature that 'add' takes ownership of 'self' because 'self' does not have
    // an '&'. This means 's1' will be moved into the 'add' call and will no longer be
    // valid after that.

    let s4 = format!("{}-{}", s2, s3);  // format! macro returns the String with the contents.
    println!("{}", s4);

    // String doesn't support index to get the content. A 'String' is a wrapper over a 'Vec<u8>'.
    // Some characters stored in String is not just a byte but 2 or 4 or even more bytes, if we use index
    // to get them, they are not a valid character on its own.

    let test_emoji = String::from("🐃");
    println!("The length of String \"{}\" is {}", test_emoji, test_emoji.len());    // length = 4

    // The best way to operate on pieces of strings is to bVe explicitly about whether
    // you want characters or bytes.

    println!("Output the chars of test_emoji");
    for c in test_emoji.chars() { 
        println!("{}", c);  // 🐃
    }
    println!("Output the bytes of test_emoji");
    for b in test_emoji.bytes() {
        println!("{}", b);  // 240 159 144 131
    }

    // --------- HashMap -------------

    // The type 'HashMap<K, V>' stores a mapping of keys of type 'K' to values of type 'V'
    // using a hashing function, which determines how it places these keys and values into
    // memory

    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    // Like vectors, hash maps are homogeneous: all of the keys must have the same type, and
    // all of the values must have the same type.

    let blue_name = String::from("Blue");
    let none_name = String::from("None");
    let blue_score = scores.get(&blue_name).copied().unwrap_or(0);
    let none_score = scores.get(&none_name).copied().unwrap_or(0);

    println!("{} and {}", blue_score, none_score);  // 10 and 0

    // The get method will return an 'Option<&V>'; if there's no value for that key in the
    // hash map, 'get' will return 'None'. This program handles the 'Option' by calling
    // 'copied' to get an 'Option<i32>' rather than an 'Option<&i32>', then 'unwrap_or'
    // to set 'blue_score' to zero if 'scores' doesn't have an entry for the key.

    for (key, value) in &scores {
        println!("{}: {}", key, value);

        // We can iterate over each key-value pair in a hash map in a similar manner
        // as we do with vectors.
    }

    // For types that implement the 'Copy' trait like 'i32', the values are copied into the
    // hash map. For owned values like 'String' will be moved and the hash map will be the
    // owner of those values.

    // If we inset a key and a value into a hash map and then insert the same key with a
    // different value, the value associated with that key will be overwritten.

    scores.insert(String::from("Blue"), 20);
    println!("{}", scores.get(&String::from("Blue")).copied().unwrap_or(0));    // 20

    // Hash maps have a special API for checking the existence of a key: 'entry'. Its
    // return value if an enum called 'Entry' that represents a value that might or
    // might not exist.

    scores.entry(String::from("Blue")).or_insert(50);
    scores.entry(String::from("Red")).or_insert(50);
    println!("{}", scores.get(&String::from("Blue")).copied().unwrap_or(0));    // 20
    println!("{}", scores.get(&String::from("Red")).copied().unwrap_or(0));     // 50
}