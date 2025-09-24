#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>

#define N 10

int main(void) {
    srand((unsigned int)time(NULL));

    char board[N][N];
    char with_margin_board[N + 2][N + 2];

    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j)
            board[i][j] = '.';

    for (int i = 1; i < N + 1; ++i)
        for (int j = 1; j < N + 1; ++j)
            with_margin_board[i][j] = '.';
    
    for (int i = 0; i < N + 2; ++i)
        with_margin_board[0][i] = '+';

    for (int i = 0; i < N + 2; ++i)
        with_margin_board[N + 1][i] = '+';

    for (int i = 1; i < N + 1; ++i)
        with_margin_board[i][0] = '+';

    for (int i = 1; i < N + 1; ++i)
        with_margin_board[i][N + 1] = '+';

    int x = 0, y = 0, count = 1;
    bool finished = true;

    board[y][x] = 'A' + count - 1;
    with_margin_board[y + 1][x + 1] = 'A' + count - 1;
    count++;

    for (; count <= 26; ++count) {
        bool movable = false;
        while (!movable) {
            if (
                with_margin_board[(y + 1) - 1][(x + 1)] != '.' &&
                with_margin_board[(y + 1) + 1][(x + 1)] != '.' &&
                with_margin_board[(y + 1)][(x + 1) - 1] != '.' &&
                with_margin_board[(y + 1)][(x + 1) + 1] != '.'
            ) {
                finished = false;
                break;
            }

            int next_x = x, next_y = y;

            switch (rand() % 4) {
                case 0 : // Down
                    next_y += 1;
                    break;
                case 1 : // Right
                    next_x += 1;
                    break;
                case 2 : // Up
                    next_y -= 1;
                    break;
                case 3 : // Left
                    next_x -= 1;
                    break;
            }

            if (
                next_x >= 0 && next_x <= N - 1 &&
                next_y >= 0 && next_y <= N - 1 &&
                board[next_y][next_x] == '.'
            ) {
                movable = true;
                x = next_x;
                y = next_y;
                board[y][x] = 'A' + count - 1;
                with_margin_board[y + 1][x + 1] = board[y][x];
            }
        }
    }

    for (int i = 0; i < N; ++ i) {
        for (int j = 0; j < N; ++j) {
            printf("%c ", board[i][j]);
        }
        printf("\n");
    }
    if (!finished) printf("Trapped\n");
    for (int i = 0; i < N + 2; ++i) {
        for (int j = 0; j < N + 2; ++j) {
            printf("%c ", with_margin_board[i][j]);
        }
        printf("\n");
    }

    return 0;
}