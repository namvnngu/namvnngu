# Description: Count Negative Numbers in a Sorted Matrix
# Source: https://youtu.be/skc7FmE_gj8
# Date: 04/06/2021

defmodule CodeSnippet do
  def countNegatives(collection) do
    collection
    |> Enum.concat()
    |> Enum.filter(fn x -> x < 0 end)
    |> Enum.count()
  end
end