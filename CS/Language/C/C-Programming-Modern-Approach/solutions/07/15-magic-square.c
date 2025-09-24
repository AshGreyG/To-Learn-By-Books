#include <stdio.h>
#include <stdbool.h>
#include <math.h>

int main(void) {
    printf(">>> This program creates a magic square of a specified size.\n");
    printf(">>> The size must be and odd number between 1 and 99.\n");

    int size = 0;
    while (size % 2 == 0 || size < 1 || size > 99) {
        printf("Enter size of magic square: ");
        scanf("%d", &size);

        if (size % 2 == 0) {
            printf("[Error] : You entered an even number.\n");
        }
        if (size < 1 || size > 99) {
            printf("[Error] : You entered an out-of-range number.\n");
        }
    }

    int magic_square[size][size];

    for (int i = 0; i < size; ++i)
        for (int j = 0; j < size; ++j)
            magic_square[i][j] = 0;

    int x = size / 2, y = 0, count = 1;
    int width = floor(log10(size * size)) + 1;

    bool has_completed = false;

    magic_square[y][x] = count;
    count++;
    while (!has_completed) {
        int next_x = (x + 1) % size;
        int next_y = (y - 1 + size) % size;

        if (magic_square[next_y][next_x] != 0) {
            next_x = x;
            next_y = (y + 1) % size;
            if (magic_square[next_y][next_x] != 0) {
                has_completed = true;
                break;
            }
            x = next_x;
            y = next_y;
            magic_square[y][x] = count;
        } else {
            x = next_x;
            y = next_y;
            magic_square[y][x] = count;
        }
        count++;
    }

    for (int i = 0; i < size; ++i) {
        for (int j = 0; j < size; ++j) {
            printf("%*d ", width + 1, magic_square[i][j]);
        }
        printf("\n");
    }

    return 0;
}