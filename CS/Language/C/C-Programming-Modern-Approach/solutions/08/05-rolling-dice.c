#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void rolling_dice_round(int *win, int *lose) {
    srand((unsigned int)time(NULL));
    int point = (rand() % 6 + 1) + (rand() % 6 + 1);
    printf("You rolled %d\n", point);
    printf("Your point is %d\n", point);

    switch (point) {
        case 7 :
        case 11 :
            printf("You win!\n");
            (*win)++;
            return;
        case 2 :
        case 3 :
        case 12 :
            printf("You lose!\n");
            (*lose)++;
            return;
    }

    int current_rolled = 0;
    while (current_rolled != point) {
        current_rolled = (rand() % 6 + 1) + (rand() % 6 + 1);
        printf("You rolled %d\n", current_rolled);

        if (current_rolled == 7) {
            printf("You lose!\n");
            (*lose)++;
            return;
        } else if (current_rolled == point) {
            printf("You win!\n");
            (*win)++;
            return;
        }
    }
}

int main(void) {
    int win_times = 0, lose_times = 0;
    char input;

    printf("Ready to play? (y/n): ");
    while ((input = getchar()) != 'n') {
        printf("\n");
        rolling_dice_round(&win_times, &lose_times);
        printf("\n");
        printf("Play again? (y/n): ");

        char consume;
        while ((consume = getchar()) != '\n');
    }
    printf("Wins: %d  Losses: %d", win_times, lose_times);

    return 0;
}
