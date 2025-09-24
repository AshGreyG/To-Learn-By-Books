#include <stdio.h>

#define length(a) ((int) (sizeof(a) / sizeof(a[0])))

int main(void) {
    int digits_count[10] = { 0 };
    int input = 1;

    while (input > 0) {
        printf("Enter a number: ");
        scanf("%d", &input);

        int temp = input;
        while (temp > 0) {
            digits_count[temp % 10]++;
            temp /= 10;
        }
    }

    printf("Digit:      ");
    for (int i = 0; i <= 9; ++i) {
        printf("%3d", i);
    }
    printf("\n");

    printf("Occurrences:");
    for (int i = 0; i < length(digits_count); ++i) {
        printf("%3d", digits_count[i]);
    }
    printf("\n");

    return 0;
}