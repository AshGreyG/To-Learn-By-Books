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

    // Note that s1 has been moved here and can no longer be used.
}