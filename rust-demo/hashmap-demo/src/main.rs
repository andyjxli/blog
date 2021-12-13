use std::collections::HashMap;

fn main() {
    // 1. 使用 new 创建
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);

    // 2. 创建 使用 vec! 创建 hashmap
    let teams = vec![String::from("blue"), String::from("yellow")];
    let intial_score = vec![10, 50];

    let scores: HashMap<_, _> = teams.iter().zip(intial_score.iter()).collect();

    println!("{:#?}", scores);

    // 3. 所有权会被转移给 hashmap
    let field_name = String::from("blue");
    let field_value = String::from("yellow");
    let mut map = HashMap::new();
    map.insert(field_name, field_value);
    // 所有权被移交给 hashmap，不能再使用
    // 可以使用 map.insert(&field_name, &field_value) 避免该问题
    // println!("{}", field_name);

    // 4. 使用枚举
    let mut scores = HashMap::new();

    scores.insert(String::from("blue"), 10);
    scores.insert(String::from("yellow"), 50);

    let team_name = String::from("blue");
    // 返回 Option 枚举值
    let score = scores.get(&team_name);

    match score {
        Some(s) => println!("{}", s),
        None => println!("team not exist"),
    }

    // 5. 遍历
    let mut scores = HashMap::new();

    scores.insert(String::from("blue"), 10);
    scores.insert(String::from("yellow"), 50);

    for (k, v) in &scores {
        println!("{}: {}", k, v);
    }

    // 6. 更新
    // insert 覆盖
    // entry 不存在才插入
    scores.entry(String::from("yellow")).or_insert(100);
    // 基于现有的更新
    let text = "hello my world world";
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        // or_insert 返回的是 value 的引用.
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }
    println!("map: {:#?}", map);
    //
}
