#include <stdio.h>
#include <string.h>
#include <stdbool.h>

const unsigned int WORD_MAX_LENGTH = 20;

int main(void) {
    char smallest[WORD_MAX_LENGTH], largest[WORD_MAX_LENGTH];
    printf("This program will finish when you enter a four-letter word.\n");
    printf("Enter word: ");
    scanf("%s", smallest);
    strcpy(largest, smallest);

    while (true) {
        char temp[WORD_MAX_LENGTH];
        printf("Enter word: ");
        scanf("%s", temp);

        if (strcmp(smallest, temp) > 0) strcpy(smallest, temp);
        if (strcmp(largest,  temp) < 0) strcpy(largest,  temp);
        if (strlen(temp) == 4) break;
    }

    printf(
        "\n"
        "Smallest word: %s\n"
        "Largest word: %s\n",
        smallest,
        largest 
    );

    return 0;
}
