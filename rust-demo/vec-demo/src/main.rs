fn main() {
    let mut v1: Vec<i32> = Vec::new();
    let mut v2 = vec![1, 2, 3, 4, 5];

    v1.push(2);
    let mut first = &mut v1[0];
    first = &mut v2[2];
    println!("The first number is {}", first);
    println!("The v1's first number is {}", &v1[0]);

    // insert value
    v1.push(2);
    v1.push(3);

    // read value
    v1.get(3);

    // 可能会出现 panic
    let _thrid = &v2[2];
    // 不会出现 panic. 会返回 None.
    match v2.get(2) {
        Some(thrid) => println!("The thrid element is {}", thrid),
        None => println!("There is no thrid element"),
    }
}
