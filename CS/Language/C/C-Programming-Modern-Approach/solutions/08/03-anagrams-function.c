#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>

#define ALPHABET 26

void read_word(int counts[ALPHABET]) {
    for (int i = 0; i < ALPHABET; ++i)
        counts[i] = 0;

    char input; 
    printf("Please enter the word: ");
    while ((input = getchar()) != '\n')
        counts[tolower(input) - 'a']++;
}

bool equal_array(int counts1[ALPHABET], int counts2[ALPHABET]) {
    for (int i = 0; i < ALPHABET; ++i) {
        if (counts1[i] != counts2[i])
            return false;
    }
    return true;
}

int main(void) {
    int counts1[ALPHABET], counts2[ALPHABET];
    read_word(counts1);
    read_word(counts2);

    if (equal_array(counts1, counts2))
        printf("They are anagrams");
    else
        printf("They are not anagrams");

    return 0;
}
