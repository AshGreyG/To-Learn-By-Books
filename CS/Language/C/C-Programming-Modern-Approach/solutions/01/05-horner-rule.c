#include <stdio.h>

// Notice that the polynomial
//
//      3x⁵+2x⁴-5x³-x²+7x-6 = ((((3x + 2)x - 5)x - 1)x + 7)x - 6
//
// This technique for evaluating polynomials is known as *Horner's Rule*

float horner_polynomial(float base) {
    return ((((3 * base + 2) * base - 5) * base - 1) * base + 7) * base - 6;
}

int main(void) {
    float value;
    printf("Please input the value: ");
    scanf("%f", &value);
    printf(
        "If f(x) = 3x⁵+2x⁴-5x³-x²+7x-6, then f(%f)=%f",
        value,
        horner_polynomial(value)
    );

    return 0;
}