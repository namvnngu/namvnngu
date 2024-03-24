//  Description: Swapping
//  Source: https://www.instagram.com/p/CPTWQyojtYc/
//  Date: 26/05/2021

#include <stdio.h>

int main() {
  int a = 3, b = 5;
  (a ^= b), (b ^= a), (a ^= b);
  printf("After Swapping: %d %d", a, b);

  return 0;
}
