#include <stdio.h>

int reverse_number(int input) {
    int result = 0;

    do {
        result = input % 10 + result * 10;
        input /= 10;
    } while (input > 0);

    return result;
}

int main(void) {
    int input;
    printf("Enter the number: ");
    scanf("%d", &input);
    printf("Reversed: %d", reverse_number(input));

    return 0;
}