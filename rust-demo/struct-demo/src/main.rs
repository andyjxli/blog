#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.height * self.width
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    fn seuqre(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn main() {
    println!("Hello, world!");

    let rect1 = Rectangle {
        width: 50,
        height: 50,
    };

    let rect2 = Rectangle {
        width: 20,
        height: 20,
    };

    let rect3 = rect1.can_hold(&rect2);

    println!("The rect is {:?}", rect1);

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );

    println!("Can Rect1 hold rect2 ? {}", rect3);

    println!("Square {:?}", Rectangle::seuqre(80));
}

// fn area(rectangle: &Rectangle) -> u32 {
//     rectangle.width * rectangle.height
// }
