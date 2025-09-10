#include <stdio.h>

int main(void) {
    int input;
    printf("Enter a three-digit number: ");
    scanf("%3d", &input);
    printf(
        "The reversal is: %d",
        input / 100 + (input / 10 % 10) * 10 + (input % 10) * 100
    );

    return 0;
}