use std::cmp;

fn main() {
    println!("result is {:?}", sq_in_rect(5, 3));
}

fn sq_in_rect(lng: i32, wdth: i32) -> Option<Vec<i32>> {
    let mut result: Vec<i32> = vec![];
    if lng == wdth {
        return None;
    } else {
        let max = cmp::max(lng, wdth);
        let min = cmp::min(lng, wdth);
        result.push(min);
        let new_min = max - min;
        if new_min == min {
            result.push(new_min)
        } else {
            let next_vec = sq_in_rect(min, new_min);
            if next_vec != None {
                result.extend(next_vec.unwrap());
            }
        }
        return Some(result);
    }
}
