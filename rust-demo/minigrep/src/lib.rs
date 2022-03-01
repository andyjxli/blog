use std::env;
use std::error::Error;
use std::fs;

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
  println!("query: {}", config.query);
  println!("filename: {}", config.file_name);

  let contents = fs::read_to_string(config.file_name)?;

  println!("The file content is: {:?}", contents);

  let results = if config.case_sensitive {
    search(&config.query, &contents)
  } else {
    search_case_insensitive(&config.query, &contents)
  };

  for line in results {
    println!("{}", line);
  }

  Ok(())
}

pub struct Config {
  pub query: String,
  pub file_name: String,
  pub case_sensitive: bool,
}

impl Config {
  pub fn new(mut args: env::Args) -> Result<Config, &'static str> {
    args.next();

    let query = match args.next() {
      Some(arg) => arg,
      None => return Err("Didn't get a query string"),
    };
    let file_name = match args.next() {
      Some(arg) => arg,
      None => return Err("Didn't get a file_name string"),
    };

    let case_sensitive = env::var("CASE_INSENSITIVE").is_err();

    println!("case_sensitive: {}", case_sensitive);

    Ok(Config {
      query,
      file_name,
      case_sensitive,
    })
  }
}

fn search<'a>(query: &'a str, contents: &'a str) -> Vec<&'a str> {
  contents
    .lines()
    .filter(|line| line.contains(query))
    .collect()
}

fn search_case_insensitive<'a>(query: &'a str, contents: &'a str) -> Vec<&'a str> {
  let query = query.to_lowercase();

  contents
    .lines()
    .filter(|line| line.to_lowercase().contains(&query))
    .collect()
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn one_result() {
    let query = "duct";
    let contents = "\
      Rust:
      safe, fast, productive.
      Pick three.";

    assert_eq!(vec!["safe, fast, productive."], search(query, contents));
  }
}
