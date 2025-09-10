#include <stdio.h>

int main(void) {
    int decimal;
    printf("Enter a number between 0 and 32767: ");
    scanf("%d", &decimal);

    int string_octal[5] = { -1, -1, -1, -1, -1 };
    int index = 0;
    while (decimal != 0) {
        string_octal[index] = decimal % 8;
        decimal /= 8;
        index++;
    }

    printf("In octal, your number is: 0");
    for (int i = 4; i >= 0; i--) {
        if (string_octal[i] != -1) {
            printf("%d", string_octal[i]);
        }
    }

    return 0;
}