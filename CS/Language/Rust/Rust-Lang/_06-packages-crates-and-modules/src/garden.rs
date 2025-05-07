pub mod vegetables;

pub enum Vegetables {
    Broccoli,
    Carrot,
    Onion,
    Potato,
    Pumpkin,
    Asparagus,
}

pub fn has_eaten_before(input: Vegetables) -> bool {
    match input {
        Vegetables::Broccoli => false,
        Vegetables::Asparagus => false,
        _ => true,
    }
}