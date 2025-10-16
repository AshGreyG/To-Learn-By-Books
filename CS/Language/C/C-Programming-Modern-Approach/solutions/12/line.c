#include "line.h"
#include <stdio.h>
#include <string.h>

// To run the program from a UNIX-like a Windows operating system, when we enter
//
// justify < quote
//
// The `<` symbol informs the operating system that `justify` will read from
// the file `quote` instead of accepting input from the keyboard. This features
// supported by operating system is called *input redirection*.
//
// When we enter
//
// justify < quote > new_quote
//
// The `>` symbol is called *output redirection*.

#define MAX_LINE_LENGTH 60

char line[MAX_LINE_LENGTH + 1];
int line_length = 0;
int num_of_words = 0;

void clear_line(void) {
    line[0] = '\0';
    line_length = 0;
    num_of_words = 0;
}

void add_word(const char *word) {
    if (num_of_words > 0) {
        line[line_length] = ' ';
        line[line_length + 1] = '\0';
    }
    strcat(line, word);
    if (num_of_words == 0) {
        line_length += strlen(word);
    } else {
        line_length += (strlen(word) + 1);
    }
    num_of_words++;
}

// strcat("", "This") => "This" | line_length = 4
//   line[4] = ' ', line[5] = '\0'
// strcat("This ", "is") => "This is" | line_length = 4 + (2 + 1) = 7

int space_remaining(void) {
    return MAX_LINE_LENGTH - line_length;
}

void write_line(void) {
    int extra_spaces, spaces_to_insert;
    extra_spaces = MAX_LINE_LENGTH - line_length;

    for (int i = 0; i < line_length; ++i) {
        if (line[i] != ' ')
            putchar(line[i]);
        else {
            spaces_to_insert = extra_spaces / (num_of_words - 1);
            for (int j = 1; j <= spaces_to_insert + 1; ++j)
                putchar(' ');
            extra_spaces -= spaces_to_insert;
            num_of_words--;
        }
    }
    putchar('\n');
}

void flush_line(void) {
    if (line_length > 0) puts(line);
}
