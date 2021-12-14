fn server_order() {}

mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}

        fn seat_at_table() {
            super::cook_order();
        }
    }

    pub struct Breakfast {
        pub toast: String,
        searonal_fruit: String,
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                searonal_fruit: String::from("peaches"),
            }
        }
    }

    fn cook_order() {}

    mod serving {
        fn take_order() {}

        fn server_order() {
            take_order();
            super::cook_order();
        }

        fn take_payment() {}
    }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    crate::front_of_house::hosting::add_to_waitlist();

    front_of_house::hosting::add_to_waitlist();

    hosting::add_to_waitlist();

    let mut meal = front_of_house::Breakfast::summer("Rye");
    meal.toast = String::from("Wheat");
    println!("I'd like {} toast please", meal.toast);
}
