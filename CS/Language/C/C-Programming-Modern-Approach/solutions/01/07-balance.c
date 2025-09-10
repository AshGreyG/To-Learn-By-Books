#include <stdio.h>

int main(void) {
    float amount, interest_rate, monthly_payment;

    printf("Enter amount of loan: ");
    scanf("%f", &amount);
    printf("Enter interest rate: ");
    scanf("%f", &interest_rate);
    printf("Enter monthly payment: ");
    scanf("%f", &monthly_payment);

    float monthly_rate = interest_rate / 1200;

    for (int i = 1; i <= 4; ++i) {
        amount = amount * (1 + monthly_rate) - monthly_payment;
        printf("Balance remaining after %d payment: $%.2f\n", i, amount);
    }

    return 0;
}