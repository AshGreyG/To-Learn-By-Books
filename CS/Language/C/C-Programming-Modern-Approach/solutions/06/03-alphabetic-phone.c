#include <stdio.h>

int main(void) {
    printf("Enter phone number: ");

    char alphabet;
    while ((alphabet = getchar()) != '\n') {
        if (alphabet >= 'A' && alphabet <= 'Z') {
            printf("%d", (alphabet - 'A') / 3 + 2);
        } else {
            printf("%c", alphabet);
        }
    }

    return 0;
}