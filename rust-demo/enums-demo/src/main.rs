#[derive(Debug)]
enum IpAddr {
    V4(u8, u8, u8, u8),
}

#[derive(Debug)]
enum UsState {
    Alabama,
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn main() {
    println!("{:?}", IpAddr::V4(168, 1, 1, 0));

    let x = Some(5);
    let y = Some("a string");

    println!("x: {:?}, y: {:?}", x, y);
    println!("coin: {}", value_in_cents(Coin::Penny));
    println!("coin: {}", value_in_cents(Coin::Nickel));
    println!("coin: {}", value_in_cents(Coin::Quarter(UsState::Alabama)));
    println!("coin: {}", value_in_cents(Coin::Dime));

    println!("plus 5: {:?}", plus_one(Some(5)));
    println!("some_value: {:?}", some_value(1));

    let some_u8_value = Some(0u8);

    if let Some(3) = some_u8_value {
        println!("three");
    } else {
        println!("other three");
    }
}

fn some_value(value: u8) {
    match value {
        1 => println!("one"),
        3 => println!("three"),
        5 => println!("five"),
        7 => println!("seven"),
        _ => (),
    }
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        }
    }
}

fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}
