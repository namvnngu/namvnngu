# Description: Count Negative Numbers in a Sorted Matrix
# Source: https://youtu.be/skc7FmE_gj8
# Date: 04/06/2021

def count_negatives(grid: List[List[int]]) -> int:
  return sum(i < 0 for j in grid for i in j)