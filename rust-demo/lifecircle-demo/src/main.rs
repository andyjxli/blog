fn main() {
    max_len_str("hello", "world");
}

fn max_len_str<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
