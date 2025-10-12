#include <stdio.h>

#define LENGTH(a) ((int) (sizeof(a) / sizeof(a[0])))

int main(void) {
    int digits_count[10] = { 0 };

    char digit_input;

    printf("Enter a number: ");
    while ((digit_input = getchar()) != '\n')
        digits_count[digit_input - '0']++;

    printf("Digit:      ");
    for (int i = 0; i <= 9; ++i) {
        printf("%3d", i);
    }
    printf("\n");

    printf("Occurrences:");
    for (int i = 0; i < LENGTH(digits_count); ++i) {
        printf("%3d", digits_count[i]);
    }
    printf("\n");

    return 0;
}
