use std::error::Error;
use std::{env, fs};

pub struct Config {
    pub query: String,
    pub file_path: String,
    pub ignore_case: bool,
}

impl Config {
    pub fn build(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("🫰 Not enough arguments");
        }

        // Our error values will always be string literals that have the
        // `'static` lifetime

        let query = args[1].clone();
        let file_path = args[2].clone();

        let ignore_case = env::var("IGNORE_CASES").is_ok();

        // Here we create a new variable `ignore_case`, to set its value
        // we call the `env::var` function and pass it the name of the
        // `IGNORE_CASE` environment

        // IGNORE_CASES=1 cargo run -- to poem.txt

        Ok(Config {
            query,
            file_path,
            ignore_case
        })
    }
}

pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    // The return variable's lifetime should be same with `contents`.
    // That's because `contents` is the argument that contains all of our
    // text and we want to return the parts of that text that match.

    let mut results = Vec::new();

    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }

    results
}

pub fn search_case_insensitive<'a>(
    query: &str,
    contents: &'a str
) -> Vec<&'a str> {
    let query = query.to_lowercase();
    let mut results = Vec::new();

    for line in contents.lines() {
        if line.to_lowercase().contains(&query) {
            results.push(line);
        }
    }

    results
}

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let contents = fs::read_to_string(config.file_path)?;

    let results = if config.ignore_case {
        search_case_insensitive(&config.query, &contents)
    } else {
        search(&config.query, &contents)
    };

    for line in results {
        println!("{}", line);
    }

    Ok(())
}

// In most terminals, there are two kinds of output: *standard output* (`stdout`)
// for general information and *standard error*(stderr) for error messages. This
// distinction enables users to choose to direct the successful output of a program
// to a file but still print error messages to the screen.

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case_sensitive() {
        let query = "duct";
        let contents = "\
Rust:
safe, fast, productive
Pick three.";
        assert_eq!(vec!["safe, fast, productive"], search(query, contents));
    }

    #[test]
    fn case_insensitive() {
        let query = "rUsT";
        let contents = "\
Rust:
safe, fast, productive
Pick three.
Trust me.";

        assert_eq!(vec!["Rust:", "Trust me."], search_case_insensitive(query, contents));
    }
}