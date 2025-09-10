#include <stdio.h>

int main(void) {
    int input;
    printf("Enter a three-digit number: ");
    scanf("%3d", &input);

    char string_input[3];
    sprintf(string_input, "%d", input);

    printf("The reversal is: ");
    for (int i = 2; i >= 0; i--) {
        printf("%c", string_input[i]);
    }

    return 0;
}