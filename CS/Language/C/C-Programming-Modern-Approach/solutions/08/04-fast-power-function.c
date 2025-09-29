#include <stdio.h>

double fast_power(double base, int exponent) {
    if (exponent % 2 == 0) {
        double a = fast_power(base, exponent / 2);
        return a * a;
    } else if (exponent != 1) {
        return fast_power(base, exponent - 1);
    } else {
        return base;  // => Recursive function should have a bound.
    }
}

int main(void) {
    double base;
    int exponent;
    printf("Enter the base (double format): ");
    scanf("%lf", &base);
    printf("Enter the exponent (integer format): ");
    scanf("%d", &exponent);

    printf("Result is %lf", fast_power(base, exponent));

    return 0;
}
