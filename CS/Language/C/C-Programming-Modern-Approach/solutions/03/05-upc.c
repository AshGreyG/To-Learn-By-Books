#include <stdio.h>

int main(void) {
    char string_input[11];
    printf("Enter the first 11 digits of an UPC code: ");
    scanf("%s", string_input);

    int total = 0;
    for (int i = 0; i < 11; i += 2) {
        total += (string_input[i] - '0');
    }
    total *= 3;
    for (int i = 1; i < 11; i += 2) {
        total += (string_input[i] - '0');
    }
    
    int check_digit = (10 - (total % 10)) % 10;
    printf("Check digit: %d\n", check_digit);
    printf("Complete UPC code: %s%d\n", string_input, check_digit);

    return 0;
}