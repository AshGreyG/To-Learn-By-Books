#include <stdio.h>
#include <stdbool.h>
#include <ctype.h>

int main(void) {
    char input;
    int sum = 0, count = 0, length = 0;
    bool has_met_word = false;

    printf("Enter a sentence: ");

    while ((input = getchar()) != '\n') {
        if (isalpha(input)) {
            if (!has_met_word) has_met_word = true;
            length++;
        } else if (has_met_word && length != 0) {
            sum += length;
            count++;
            length = 0;
        }
    }

    if (length != 0) {
        sum += length;
        count++;
    }

    printf ("Average word length: %.1lf", sum * 1.0 / count);

    return 0;
}