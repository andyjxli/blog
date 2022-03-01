pub fn quick_sort(arr: &mut [i32], n: usize, k: i32) {
  quick_sort_c(arr, 0, n - 1, k);
}

pub fn quick_sort_c(arr: &mut [i32], l: usize, r: usize, k: i32) {
  if l >= r {
    return;
  } else {
    // 位置
    let pos = partition(arr, l, r);
    if k == pos as i32 {
      return;
    }
    // pos 可能为 0，在 rust 中 usize 可能会溢出
    if pos > 0 {
      quick_sort_c(arr, l, pos - 1, k);
    }
    if pos < r {
      quick_sort_c(arr, pos + 1, r, k);
    }
  }
}

pub fn partition(arr: &mut [i32], p: usize, r: usize) -> usize {
  let povit = arr[r];
  let mut i = p;
  let mut j = p;
  while j < r {
    // 通过 i 游标记录当前调整到的位置，
    // 只有小于 povit 时才会调整 i, 所以 i 前面的数都小于 povit
    if arr[j] < povit {
      arr.swap(j, i);
      i += 1;
    }
    j += 1;
  }
  // 这一步关键，将 p 放置 i 位置，那么 i 前面的数都小于等于 povit，i 后面的数都大于等于 povit
  arr.swap(i, r);
  return i;
}

pub mod Solution {
  use super::*;

  pub fn get_least_numbers(mut arr: Vec<i32>, k: i32) -> Vec<i32> {
    let len = arr.len();

    quick_sort(&mut arr[..], len, k);

    arr[..k as usize].iter().map(|&item| item).collect()
  }
}
