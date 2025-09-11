#include <stdio.h>

int main(void) {
    char upc[12];
    printf("Enter 12 digits of an UPC code: ");
    scanf("%s", upc);

    int total = 0;
    for (int i = 0; i < 11; i += 2) {
        total += (upc[i] - '0');
    }
    total *= 3;
    for (int i = 1; i < 11; i += 2) {
        total += (upc[i] - '0');
    }
    
    int check_digit = (10 - (total % 10)) % 10;

    if (check_digit == upc[11] - '0') {
        printf("VALID");
    } else {
        printf("NOT VALID");
    }

    return 0;
}