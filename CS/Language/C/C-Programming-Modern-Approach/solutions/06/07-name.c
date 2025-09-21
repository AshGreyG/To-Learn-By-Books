#include <stdio.h>
#include <stdbool.h>
#include <ctype.h>

int main (void) {
    char name_input, firstname_first_char;
    bool has_met_word = false, first_word_finished = false;
    printf ("Enter a first and last name: ");

    while ((name_input = getchar()) != '\n') {
        if (
            (name_input >= 'a' && name_input <= 'z') ||
            (name_input >= 'A' && name_input <= 'Z')
        ) {
            if (!has_met_word) {
                has_met_word = true;
                firstname_first_char = toupper(name_input);
            } else if (first_word_finished) {
                printf("%c", name_input);
            }
        } else if (has_met_word && name_input == ' ') {
            first_word_finished = true;
        }
    }
    printf(", %c.", firstname_first_char);

    return 0;
}