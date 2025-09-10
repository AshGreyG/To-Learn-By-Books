#include <stdio.h>

int main(void) {
    char string_input[12];
    printf("Enter the first 12 digits of an EAN code: ");
    scanf("%s", string_input);

    int total = 0;
    for (int i = 1; i < 12; i += 2) {
        total += (string_input[i] - '0');
    }
    total *= 3;
    for (int i = 0; i < 12; i += 2) {
        total += (string_input[i] - '0');
    }

    int check_digit = 9 - (total - 1) % 10;
    printf("Check digit: %d\n", check_digit);
    printf("Complete EAN code: %s%d\n", string_input, check_digit);

    return 0;
}