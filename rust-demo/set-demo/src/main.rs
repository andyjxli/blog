fn main() {
    vector_demo()
}

fn vector_demo() {
    println!("vector demo");
    let v: Vec<i32> = Vec::new();
    println!("v: {:?}", v);

    let mut v1 = vec![1, 2, 3];
    v1.push(4);
    println!("v1 push: {:?}", v1);
    v1.pop();
    println!("v1 pop: {:?}", v1);
}
