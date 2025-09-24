#include <stdio.h>

#define length(a) ((int) (sizeof(a) / sizeof(a[0])))

int main(void) {
    int digits_count[10] = { 0 };

    char digit_input;

    printf("Enter a number: ");
    while ((digit_input = getchar()) != '\n')
        digits_count[digit_input - '0']++;

    printf("Repeated digit(s): ");
    for (int i = 0; i < length(digits_count); ++i) {
        if (digits_count[i] > 1) {
            printf("%d ", i);
        }
    }

    return 0;
}