pub mod Solution {
  fn recursion(x: usize, y: usize, grid: &Vec<Vec<i32>>, m: usize, n: usize) -> i32 {
    println!("{}, {}, {:?}, {}, {}", x, y, grid[x][y], m, n);
    if grid[x][y] == 1 {
      if y == n - 1 || grid[x][y + 1] == -1 {
        return -1;
      } else {
        if x + 1 == m {
          return (y as i32) + 1;
        } else {
          return recursion(x + 1, y + 1, grid, m, n);
        }
      }
    } else {
      if y == 0 || grid[x][y - 1] == 1 {
        return -1;
      } else {
        if x + 1 == m {
          return (y as i32) - 1;
        } else {
          return recursion(x + 1, y - 1, grid, m, n);
        }
      }
    }
  }

  pub fn find_ball(grid: Vec<Vec<i32>>) -> Vec<i32> {
    let mut result: Vec<i32> = vec![];
    // 行数
    let m = grid.len();
    // 列数
    let n = grid[0].len();
    let mut i = 0;
    while i < n {
      let x = 0;
      let y = i;
      println!("i: {}", i);
      result.push(recursion(x, y, &grid, m, n));
      i += 1;
    }
    result
  }

  pub fn exec() {
    let mut grid: Vec<Vec<i32>> = vec![
      vec![1, 1, 1, -1, -1],
      vec![1, 1, 1, -1, -1],
      vec![-1, -1, -1, 1, 1],
      vec![1, 1, 1, 1, -1],
      vec![-1, -1, -1, -1, -1],
    ];
    println!("result is {:?}", find_ball(grid));

    grid = vec![vec![-1]];
    println!("result is {:?}", find_ball(grid));
    grid = vec![
      vec![1, 1, 1, 1, 1, 1],
      vec![-1, -1, -1, -1, -1, -1],
      vec![1, 1, 1, 1, 1, 1],
      vec![-1, -1, -1, -1, -1, -1],
    ];
    println!("result is {:?}", find_ball(grid));
  }
}
