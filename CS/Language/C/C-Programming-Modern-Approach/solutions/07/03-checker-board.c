#include <stdio.h>

#define LENGTH(a) ((int) (sizeof(a) / sizeof(a[0])))

int main(void) {
    char checker_board[8][8];

    for (int i = 0; i < LENGTH(checker_board); ++i) {
        for (int j = 0; j < LENGTH(checker_board[j]); ++j) {
            if ((i + j + 2) % 2 == 0) {
                checker_board[i][j] = 'B';
                printf("B");
            } else {
                checker_board[i][j] = 'R';
                printf("R");
            }
        }
        printf("\n");
    }

    return 0;
}
