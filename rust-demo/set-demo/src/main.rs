fn main() {
    vector_demo();
    vector_enum();
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

    let mut v2 = vec![1, 2, 3, 4, 5];
    // let thrid: &i32 = &v2[2];

    for i in &mut v2 {
        *i += 50;
    }

    // println!("the thrie element is {}", thrid);

    for i in &v2 {
        println!("{}", i);
    }
}

fn vector_enum() {
    #[derive(Debug)]
    enum SpreadsheetCell {
        Int(i32),
        Float(f64),
        Text(String),
    }

    let row = vec![
        SpreadsheetCell::Int(21),
        SpreadsheetCell::Float(11.23),
        SpreadsheetCell::Text("23123".to_string()),
        SpreadsheetCell::Text(String::from("red")),
    ];

    println!("{:?}", row.get(2))
}
