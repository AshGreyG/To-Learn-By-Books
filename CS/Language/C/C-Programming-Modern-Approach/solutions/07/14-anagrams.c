#include <stdio.h>
#include <stdbool.h>

#define length(a) ((int) (sizeof(a) / sizeof(a[0])))

int main(void) {
    while (true) {
        int count_distance[26] = { 0 };
        char input;

        printf("Enter first word: ");
        while ((input = getchar()) != '\n') {
            if (input >= 'a' && input <= 'z') {
                count_distance[input - 'a']++;
            } else if (input >= 'A' && input <= 'Z') {
                count_distance[input - 'A']++;
            }
        }

        printf("Enter second word: ");
        while ((input = getchar()) != '\n') {
            if (input >= 'a' && input <= 'z') {
                count_distance[input - 'a']--;
            } else if (input >= 'A' && input <= 'Z') {
                count_distance[input - 'A']--;
            }
        }

        int i;
        for (i = 0; i < length(count_distance); ++i) {
            if (count_distance[i] != 0) {
                printf("The words are not anagrams.\n\n");
                break;
            }
        }

        if (i == length(count_distance)) {
            printf("The words are anagrams.\n\n");
        }
    }

    return 0;
}