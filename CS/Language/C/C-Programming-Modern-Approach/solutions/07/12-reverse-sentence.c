#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

#define MAX_WORDS 50
#define MAX_WORD_LEN 30
#define MAX_SENTENCE 1500

bool is_terminating(char check) {
    return check == '!' ||
        check == '?' ||
        check == '.' ||
        check == ',';
}

int split_sentence_to_words(char *sentence, char words[MAX_WORDS][MAX_WORD_LEN]) {
    int word_count = 0;
    int sentence_length = strlen(sentence);
    bool start_parsing_word = false,
        start_parsing_terminating = false;

    int word_start = 0, word_length = 0;

    for (int i = 0; i < sentence_length; ++i) {
        if (isalpha(sentence[i]) || sentence[i] == '\'') {
            if (!start_parsing_word) {
                start_parsing_word = true;
                word_start = i;
            }
            word_length++;
        } else if (isspace(sentence[i])) {
            if (start_parsing_word) {
                start_parsing_word = false;

                if (word_length > MAX_WORD_LEN - 1)
                    word_length = MAX_WORD_LEN - 1;

                strncpy(words[word_count], sentence + word_start, word_length);
                words[word_count][word_length] = '\0';

                word_count++;
                word_start = 0;
                word_length = 0;
            }
            if (start_parsing_terminating) {
                start_parsing_terminating = false;

                if (word_length > MAX_WORD_LEN - 1)
                    word_length = MAX_WORD_LEN - 1;

                strncpy(words[word_count], sentence + word_start, word_length);
                words[word_count][word_length] = '\0';

                word_count++;
                word_start = 0;
                word_length = 0;
            }
        } else if (is_terminating(sentence[i])) {
            if (start_parsing_word) {
                start_parsing_word = false;

                if (word_length > MAX_WORD_LEN - 1)
                    word_length = MAX_WORD_LEN - 1;

                strncpy(words[word_count], sentence + word_start, word_length);
                words[word_count][word_length] = '\0';

                word_count++;
                word_start = 0;
                word_length = 0;
            }
            if (!start_parsing_terminating) {
                start_parsing_terminating = true;
                word_start = i;
            }
            word_length++;
        }
    }

    if (word_length != 0) {
        if (word_length > MAX_WORD_LEN - 1)
            word_length = MAX_WORD_LEN - 1;

        strncpy(words[word_count], sentence + word_start, word_length);
        words[word_count][word_length] = '\0';

        word_count++;
        word_start = 0;
        word_length = 0;
    }

    return word_count;
}

int main(void) {
    char sentence[MAX_SENTENCE];
    char words[MAX_WORDS][MAX_WORD_LEN];

    printf(">>> Length of sentence < 1500\n");
    printf(">>> Max length of words < 30, or the last characters will be omitted.\n");
    printf(">>> Words count, including terminating character, < 50\n");

    printf("Enter a sentence: ");
    scanf("%[^\n]", sentence);

    int count = split_sentence_to_words(sentence, words);
    int index = count;

    if (is_terminating(words[count - 1][0])) index--;

    printf("Reversal of sentence: ");
    for (int i = index - 1; i >= 0; --i) {
        printf("%s ", words[i]);
    }
    printf("%s", words[count - 1]);

    return 0;
}