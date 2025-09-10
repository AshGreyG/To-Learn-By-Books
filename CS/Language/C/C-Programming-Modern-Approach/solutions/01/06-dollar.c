#include <stdio.h>

int main(void) {
    int amount;
    printf("Enter a dollar amount: ");
    scanf("%d", &amount);

    int bills[4] = { 20, 10, 5, 1 };
    int num[4] = { 0, 0, 0, 0 };

    int index = 0;
    while (index != 4) {
        if (amount >= bills[index]) {
            num[index] = amount / bills[index];
            amount %= bills[index];
        } else {
            index++;
        }
    }

    for (int i = 0; i < 4; ++i) {
        char string_bill[3];
        sprintf(string_bill, "$%d", bills[i]);
        printf("%3s bills: %d\n", string_bill, num[i]);
    }

    return 0;
}