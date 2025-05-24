// Our first task is to make `minigrep` accept its two commands line arguments
// the file path and s string to search for. We want our program can be ran with
// `cargo run`, two hyphens to indicate that the following arguments

// We need to use `std::env::args` function provided in Rust's standard library
// This function returns an iterator of the command line arguments passed to
// the program. We can call the `collect` method on an iterator to turn it into
// a collection

use std::env;
use std::fs;
use std::process;
use std::error::Error;

fn state_1() {
    let args: Vec<String> = env::args().collect();
    // dbg!(args);  // 🐒 uncomment here to see behaviors of `std::env::args`

    // Note that `std::env::args` will panic if any argument contains invalid
    // unicode, use `std::env::args_os` instead. That function returns an
    // iterator that produces `OsString` values instead of `String` values

    // The first value in the vector is `"target/debug/xxx"`, which is the
    // name of our binary.

    let query = &args[1];
    let file_path = &args[2];

    println!("🔍 Searching for \"{}\" in file \"{}\"", query, file_path);

    let contents = fs::read_to_string(file_path)
        .expect(format!("📌 Should have been able to read the file \"{}\"", file_path).as_str());

    // The new statement `fss::read_to_string` takes the `file_path`, opens that file,
    // and returns a value of type `std::io::Result<String>`
}

struct Config {
    query: String,
    file_path: String,
}

fn parse_config(args: &[String]) -> Config {
    let query = args[1].clone();
    let file_path = args[2].clone();

    Config { query, file_path }
}

fn state_2() {
    let args: Vec<String> = env::args().collect();
    let config = parse_config(&args);

    // This time we use the `Config` structure

    println!("🔍 Searching for \"{}\" in file \"{}\"", config.query, config.file_path);

    let contents = fs::read_to_string(&config.file_path)
        .expect(format!("📌 Should have been able to read the file \"{}\"", config.file_path).as_str());
}

impl Config {
    fn build(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("🫰 Not enough arguments");
        }

        // Our error values will always be string literals that have the
        // `'static` lifetime

        let query = args[1].clone();
        let file_path = args[2].clone();

        Ok(Config { query, file_path })
    }
}

fn state_3() {
    let args: Vec<String> = env::args().collect();

    let config = Config::build(&args).unwrap_or_else(|err| {
        println!("🚨 Problem parsing arguments: {}", err);
        process::exit(1);
    });

    // Method `unwrap_or_else` returns the inner value that `Ok` is wrapping, 
    // if the value is an `Err` value, this methods calls the code in the
    // **closure**.
}

// We should extract logic from `main` function (`state_<n>` functions defined
// above) into a `run` function, and `main` only needs to invoke the `run`.

fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let contents = fs::read_to_string(&config.file_path)?;

    Ok(())

    // `Box<dyn Error>` means the function will return a type that implements
    // the `Error` trait, but we don't have to specify what particular type
    // the return value will be.
}

fn main() {

}