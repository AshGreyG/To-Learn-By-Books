#include <stdio.h>

#define MAX_LENGTH 100

int main(void) {
    char message[MAX_LENGTH];
    char input;
    int count = 0;
    printf("Enter a message: ");

    while ((input = getchar()) != '\n') {
        message[count] = input;
        count++;
    }

    printf("Reversal is (index   version): ");
    for (int i = count - 1; i >= 0; i--) {
        printf("%c", message[i]);
    }
    printf("\n");

    printf("Reversal is (pointer version): ");
    for (char *p = message + count - 1; p >= message; p--) {
        printf("%c", *p);
    }
    printf("\n");

    return 0;
}
