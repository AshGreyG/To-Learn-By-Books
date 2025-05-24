use _10_writing_tests::Rectangle;

#[test]
fn calculate_square() {
    let a = Rectangle {
        width: 3,
        height: 3,
    };
    assert_eq!(a.square(), 9);
}

// The code above is integration test, we don't need to annotate any
// code in `tests/integration_test.rs` with `#[cfg(test)]`. Cargo treats the
// tests directory specially and compiles files in this directory