#include <stdio.h>
#include <ctype.h>

int main(void) {
    int vowel_count = 0;
    char input;
    printf("Enter a sentence: ");

    while ((input = getchar()) != '\n') {
        switch (toupper(input)) {
            case 'A' : case 'E' : case 'I' : case 'O' :
            case 'U' :
                vowel_count++;
                break;
        }
    }

    printf("Your sentence contains %d vowels", vowel_count);

    return 0;
}