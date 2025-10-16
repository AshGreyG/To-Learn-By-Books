#include <stdio.h>
#include "word.h"

// int test_variable_header1 = 1;
//
// The extern variable from header file should be declared in the source file.
//
// int test_function_header1(void) {
//
//     return test_variable_header1;
// }

char read_char(void) {
    char ch = getchar();
    if (ch == '\n' || ch == '\t') return ' ';
    return ch;
}

/*!
 * @remark This function reads the input word to variable `word` and its length
 * cannot be greater than `length`
 * @param [out] [word] The 0..length-1 part of `word` is the input word and
 * `word[length]` is the null character `\0`
 */
void read_word(char *word, int length) {
    char ch;
    int position = 0;

    while ((ch = read_char()) == ' ');  // ← Read until encountering non-space.
    while (ch != ' ' && ch != EOF) {
        if (position < length) {
            word[position] = ch;
            position++;
        }
        ch = read_char();
    }
    word[position] = '\0';
}
