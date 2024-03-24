// Description: Count Negative Numbers in a Sorted Matrix
// Source: https://youtu.be/skc7FmE_gj8
// Date: 04/06/2021

pub fn count_negatives(grid: Vec<Vec<i32>>) -> i32 {
  return grid.iter()
             .flatten()
             .filter(|i| i < &&0i32)
             .count() as i32;
}