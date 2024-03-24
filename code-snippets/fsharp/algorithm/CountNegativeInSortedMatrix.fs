// Description: Count Negative Numbers in a Sorted Matrix
// Source: https://youtu.be/skc7FmE_gj8
// Date: 04/06/2021

let countNegatives grid = 
  grid
  |> List.reduce List.append
  |> List.filter (fun x -> x < 0)
  |> List.length