fn main() {
    let result = valid_braces("()");
    if result {
        println!("true")
    }
}

fn valid_braces(s: &str) -> bool {
    let mut stack = Vec::new();

    for (i, &item) in s.as_bytes().iter().enumerate() {
        let index = stack.len();
        let top = stack[index];
        if item == "}" && top == "{" {
            stack.pop();
            continue;
        }
    }

    if stack.len() == 0 {
        return true;
    } else {
        return false;
    }
}
