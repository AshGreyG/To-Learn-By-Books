#include <stdio.h>
#include <math.h>

int main(void) {
    double x, y = 1.0, epsilon = 0.00001, old_y;
    printf("Enter a positive number: ");
    scanf("%lf", &x);

    while (fabs(old_y - y) >= epsilon) {
        old_y = y;
        y = (y + x / y) / 2;
    }

    printf("Square root: %lf", y);

    return 0;
}