fn main() {
    // 字符串切片 &str，字面值存储在二进制文件中
    let data = "hello world!";
    // 转换为 String 类型
    let s = data.to_string();
    let s1 = String::from(data);

    // 字符串拼接
    let mut s = String::from("foo");
    let s1 = String::from("bar");
    s.push_str(&s1);
    s.push_str("11111");
    // 拼接单个字符
    s.push('2');

    println!("s is {}", &s);

    // 相当于执行 fn add(self, s:&str) -> String{...}
    // s1 的所有权被移交出去，add 执行完之后 s1 就无效了.
    let s1 = String::from("Hello, ");
    let s2 = String::from("World!");
    let s3 = s1 + &s2;
    println!("s3 is {}", &s3);
    // println!("s1 is {}", &s1);

    // 使用 format!
    let s1 = String::from("1");
    let s2 = String::from("2");
    let s3 = String::from("3");
    let s = format!("{}-{}-{}", s1, s2, s3);
    println!("s is {}", s);
}
