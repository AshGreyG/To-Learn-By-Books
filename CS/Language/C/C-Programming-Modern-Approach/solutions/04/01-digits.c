#include <math.h>
#include <stdio.h>

int main(void) {
    int input;
    printf("Enter a number: ");
    scanf("%d", &input);
    printf(
        "The number %d has %d digits",
        input,
        (int)(floor(log10(input)) + 1)
    );

    return 0;
}