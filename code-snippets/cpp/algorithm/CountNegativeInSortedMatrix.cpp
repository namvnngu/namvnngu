// Description: Count Negative Numbers in a Sorted Matrix
// Source: https://youtu.be/skc7FmE_gj8
// Date: 04/06/2021
#include <iostream>
#include <ranges>
#include <algorithm>

namespace rv = std::ranges::views;
namespace hs = std::string;

auto countNegatives(std::vector<std::vector<int>> const& grid) -> int {
  return grid
      | rv::join
      | rv::filter([](auto e) { return e < 0; })
      | hs::length();
}