#include <stdio.h>

float integer_power(float base, int exponent) {
    float result = 1;
    for (int i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
}

float problem_polynomial(float base) {
    return 3 * integer_power(base, 5)
        + 2 * integer_power(base, 4)
        - 5 * integer_power(base, 3)
        - 2 * integer_power(base, 2)
        + 7 * integer_power(base, 1)
        - 6;
}

int main(void) {
    float value;
    printf("Please input value: ");
    scanf("%f", &value);
    printf(
        "If f(x) = 3x⁵+2x⁴-5x³-x²+7x-6, then f(%f)=%f",
        value,
        problem_polynomial(value)
    );

    return 0;
}