// Description: Count Negative Numbers in a Sorted Matrix
// Source: https://youtu.be/skc7FmE_gj8
// Date: 04/06/2021

fun countNegatives(grid: Array<IntArray>): Int {
  return grid.flatMap { it.asIterable() }
             .filter { it < 0 }
             .count();
}