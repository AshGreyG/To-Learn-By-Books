#include <stdio.h>

int gcd(int m, int n) {
    while (n != 0) {
        int temp = m % n;
        m = n;
        n = temp;
    }

    return m;
}

void reduce_fraction(int* numerator, int* denominator) {
    if (*denominator == 0) return;
    int common = gcd(*numerator, *denominator);

    *numerator /= common;
    *denominator /= common;

    if (*denominator < 0) {
        *numerator *= -1;
        *denominator *= -1;
    }
}

int main(void) {
    int numerator, denominator;
    printf("Enter a fraction: ");
    scanf("%d/%d", &numerator, &denominator);

    reduce_fraction(&numerator, &denominator);
    printf("In lowest terms: %d/%d", numerator, denominator);

    return 0;
}