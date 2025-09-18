#include <stdio.h>

int main(void) {
    double max, temp;
    do {
        printf("Enter a number: ");
        scanf("%lf", &temp);

        if (temp > max) max = temp;
    } while (temp != 0);

    printf("The largest number entered was %f", max);

    return 0;
}