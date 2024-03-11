//  Description: Swapping
//  Source: https://www.instagram.com/p/CPTWQyojtYc/
//  Date: 26/05/2021

class Swap {
  public static void main(String[] args) {
    int a = 3, b = 5;
    a = a ^ b ^ (b = a);

    System.out.println("After swapping: " + a + " " + b);
  }
}
