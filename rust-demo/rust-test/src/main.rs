fn main() {
    let s1 = String::from("hello");

    let len = calcalate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);

    // let s2 = s1;
    // println!("{}", s1);

    test();

    let hello = first_world(&s1);

    println!("hello: {}", hello);
}

fn calcalate_length(s: &String) -> usize {
    s.len()
}

fn test() {
    let s = "hello world";

    let a = &s[0..4];

    println!("a: {}", a)
}

fn first_world(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
