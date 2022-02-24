enum SpreadSheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

// vec 使用 enum 支持多种类型.
fn main() {
    let row = vec![
        SpreadSheetCell::Int3(3),
        SpreadSheetCell::Float(10.222),
        SpreadSheetCell::Text(String::from("blue")),
    ];
}
