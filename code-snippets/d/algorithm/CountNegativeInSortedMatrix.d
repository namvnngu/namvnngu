/*
Description: Count Negative Numbers in a Sorted Matrix
Source: https://youtu.be/skc7FmE_gj8
Date: 04/06/2021
*/

int countNegatives(int[][] grid) {
  return cast(int) grid
      .join
      .count!(x => x < 0)
}