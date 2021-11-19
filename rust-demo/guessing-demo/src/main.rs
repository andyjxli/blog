/*
 * @Author: andyjxli(李嘉欣)
 * @Date: 2021-08-05 15:32:03
 * @LastEditTime: 2021-11-09 19:46:19
 * @LastEditors: andyjxli(李嘉欣)
 * @Description: 猜数字
 * @FilePath: /blog/rust-demo/guessing-demo/src/main.rs
 */
use rand::Rng; // trait 类似于接口. sdk.
use std::cmp::Ordering;
use std::io; // prelude

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..101);

    // println!("The secret number is: {}", secret_number);
    loop {
        println!("Please input your guess.");

        let mut guess = String::new();

        // io::stdin 关联函数，类似于类静态函数
        io::stdin()
            // 将 guess 引用地址传递给 read_line 函数，该函数会返回 io::Result 枚举值
            .read_line(&mut guess)
            // io::Result 包含 expect 函数用于匹配枚举值，if "OK" 则直接返回值，否则打印异常
            .expect("Failed to read line");

        println!("Your guessed: {}", guess);

        // 将 guess 转换为整型 u32，还可以直接使用 guess.trim().parse().expect('Please input number!')
        // 但 match 可以使用 continue 继续执行.
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("Please input number!");
                continue;
            }
        };

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
