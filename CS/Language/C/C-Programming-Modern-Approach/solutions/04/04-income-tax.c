#include <stdio.h>

int main(void) {
    double income, tax;
    printf("Enter your income: $");
    scanf("%lf", &income);

    if (income < 750) {
        tax = income * 0.01;
    } else if (income >= 750 && income < 2250) {
        tax = 7.5 + 0.02 * (income - 750);
    } else if (income >= 2250 && income < 3750) {
        tax = 37.5 + 0.03 * (income - 2250);
    } else if (income >= 3750 && income < 5250) {
        tax = 82.5 + 0.04 * (income - 3750);
    } else if (income >= 5250 && income < 7000) {
        tax = 142.5 + 0.05 * (income - 5250);
    } else {
        tax = 230.0 + 0.06 * (income - 7000);
    }

    printf("The tax of your income is: %.2lf", tax);

    return 0;
}