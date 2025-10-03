#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>

#define MAX_LENGTH 100

int main(void) {
    char message[MAX_LENGTH] = { EOF }, 
         without_punc_message[MAX_LENGTH] = { EOF };
    int alpha_count = 0;
    bool is_palindrome = true;

    printf("Enter a message: ");
    scanf("%[^\n]", message);

    for (int i = 0; i < MAX_LENGTH; ++i) {
        if (isalpha(message[i])) {
            without_punc_message[i] = message[i];
            alpha_count++;
        }
    }

    for (int i = 0; i < alpha_count / 2 ; ++i) {
        if (without_punc_message[i] != without_punc_message[alpha_count - i - 1]) {
            is_palindrome = false;
        }
    }

    printf(
        "Index   judge result: %s\n",
        is_palindrome ? "Palindrome" : "Not a palindrome"
    );

    for (char *p = without_punc_message; p < without_punc_message + alpha_count / 2; ++p) {
        if (*p != *(without_punc_message + alpha_count - 1 - (p - without_punc_message))) {
            is_palindrome = false;
        }
    }
    printf(
        "Pointer judge result: %s\n",
        is_palindrome ? "Palindrome" : "Not a palindrome"
    );

    return 0;
}
