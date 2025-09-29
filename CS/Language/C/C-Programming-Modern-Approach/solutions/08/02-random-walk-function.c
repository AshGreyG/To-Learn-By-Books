#include <locale.h>
#include <wchar.h>
#include <stdbool.h>
#include <stdlib.h>
#include <time.h>

void print_array_wchar_t(
    int square_width,
    int square_height,
    wchar_t board[square_height][square_width]
) {
    for (int i = 0; i < square_height; ++i) {
        for (int j = 0; j < square_width; ++j) {
            wprintf(L"%lc", board[i][j]);
        }
        wprintf(L"\n");
    }
}

/**
 * @param `step_length` The length of total steps, not greater than `square_height`
 *    × `square_width`.
 * @param `square_width` The width of board
 * @param `square_height` The height of board
 * @param `board` The `wchar_t` type array pointer of board.
 */
void generate_random_walk(
    int step_length,
    int square_width,
    int square_height,
    wchar_t board[square_height][square_width]
) {
    srand((unsigned int)time(NULL));
    wchar_t with_margin_board[square_height + 2][square_width + 2];

    for (int i = 0; i < square_height; ++i) {
        for (int j = 0; j < square_width; ++j) {
            with_margin_board[i + 1][j + 1] = U' ';
            board[i][j] = U' '; 
        }
    }

    // Initialize `with_margin_board` center area and `board`

    for (int i = 0; i < square_width + 2; ++i) {
        with_margin_board[0][i] = U'*';
        with_margin_board[square_height + 1][i] = U'*';
    }

    for (int i = 1; i < square_height + 1; ++i) {
        with_margin_board[i][0] = U'*';
        with_margin_board[i][square_width + 1] = U'*';
    }

    int x = 1, y = 1, next_x, next_y, count = 0;
    bool early_finished = false, completed = false;

    while (!early_finished && !completed) {
        bool generated = false;
        while (!generated) {
            if (
                with_margin_board[y + 1][x] != U' ' &&
                with_margin_board[y - 1][x] != U' ' &&
                with_margin_board[y][x + 1] != U' ' &&
                with_margin_board[y][x - 1] != U' '
            ) {
                early_finished = true;
                break;
            }

            int random_direction = rand() % 4;
            wchar_t random_arrow = U' ';

            switch (random_direction) {
                case 0 :  // Left
                    next_x = x - 1;
                    next_y = y;
                    random_arrow = U'←';
                    break;
                case 1 :  // Right
                    next_x = x + 1;
                    next_y = y;
                    random_arrow = U'→';
                    break;
                case 2 :  // Up
                    next_x = x;
                    next_y = y - 1;
                    random_arrow = U'↑';
                    break;
                case 3 :  // Down
                    next_x = x;
                    next_y = y + 1;
                    random_arrow = U'↓';
                    break;
            }

            if (with_margin_board[next_y][next_x] == U' ') {
                with_margin_board[y][x] = random_arrow;
                board[y - 1][x - 1] = random_arrow;
                x = next_x;
                y = next_y;
                generated = true;
                count++;
            }

            if (count == step_length) {
                completed = true;
           }
        }
    }

    wprintf(L"\n\n\n");
    wprintf(L"=========| Random Walk Status |=========\n");
    wprintf(L"=> Completed all steps:   %s\n", completed && !early_finished ? "true" : "false");
    wprintf(L"=> Target steps:          %d\n", step_length);
    wprintf(L"=> Real steps:            %d\n", count);
    wprintf(L"=> Board:\n");
    print_array_wchar_t(square_width + 2, square_height + 2, with_margin_board);
}

int main(void) {
    setlocale(LC_ALL, "");
    int width, height, steps;
    wprintf(L"Enter the board's width: ");
    wscanf(L"%d", &width);
    wprintf(L"Enter the board's height: ");
    wscanf(L"%d", &height);
    wprintf(L"Enter the steps (not greater than %d): ", width * height);
    wscanf(L"%d", &steps);

    wchar_t board[height][width];
    generate_random_walk(steps, width, height, board);

    return 0;
}

// There are two important things we should know:
//   1. The terminal cannot show `char` and `wchar_t` together, and Linux cannot refresh
//      the mode. So if I want to print a wide char array, I should never use `printf`.
//   2. When showing unicode character, we should `setlocale` first. Otherwise some
//      characters cannot be shown properly.
