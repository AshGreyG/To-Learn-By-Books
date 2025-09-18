#include <stdio.h>

int gcd(int m, int n) {
    while (n != 0) {
        int temp = m % n;
        m = n;
        n = temp;
    }

    return m;
}

int main(void) {
    int input1, input2;
    printf("Enter two integers: ");
    scanf("%d %d", &input1, &input2);
    printf("Greatest common divisor: %d", gcd(input1, input2));

    return 0;
}