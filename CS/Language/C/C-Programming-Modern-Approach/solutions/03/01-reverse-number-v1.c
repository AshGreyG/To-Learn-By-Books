#include <stdio.h>

int main(void) {
    int input;
    printf("Enter a two digit number: ");
    scanf("%2d", &input);
    printf("The reversal is: %d", input / 10 + input % 10 * 10);

    return 0;
}