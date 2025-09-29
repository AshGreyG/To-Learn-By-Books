#include <ctype.h>
#include <stdio.h>

#define MAX_DIGITS 20

void print_repeated(char* repeated, int times) {
    for (int i = 0; i < times; ++i) {
        printf("%s", repeated);
    }
}

const int nums_display[10][9] = {
//    0  1  2  3  4  5  6  7  8
    { 0, 1, 0, 1, 0, 1, 1, 1, 1 },  // 0
    { 0, 0, 0, 0, 0, 1, 0, 0, 1 },  // 1
    { 0, 1, 0, 0, 1, 1, 1, 1, 0 },  // 2
    { 0, 1, 0, 0, 1, 1, 0, 1, 1 },  // 3
    { 0, 1, 0, 0, 1, 1, 0, 1, 1 },  // 4
    { 0, 1, 0, 1, 1, 0, 0, 1, 1 },  // 5
    { 0, 1, 0, 1, 1, 0, 1, 1, 1 },  // 6
    { 0, 1, 0, 0, 0, 1, 0, 0, 1 },  // 7
    { 0, 1, 0, 1, 1, 1, 1, 1, 1 },  // 8
    { 0, 1, 0, 1, 1, 1, 0, 1, 1 },  // 9
};

static const char segments_char[9] = {
    ' ', '_', ' ', '|', '_', '|', '|', '_', '|'
};

//  _   012
// |_|  345
// |_|  678

int main(void) {
    int input_nums[MAX_DIGITS] = { 0 };
    int count = 0;
    char input;

    printf("Enter a number, any other characters will be ignore: ");
    while ((input = getchar()) != '\n') {
        if (count == MAX_DIGITS) {
            printf("[Error] : Too many digits!\n");
            break;
        }
        if (isdigit(input)) {
            input_nums[count] = input - '0';
            count++;
        }
    }

    char segments_matrix[3][count * 3 + (count - 1)];

    // Notice that the segments matrix needs gaps between different numbers.

    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < count; ++j) {
            for (int k = 0; k < 3; ++k) {
                segments_matrix[i][j * 4 + k] =
                nums_display[input_nums[j]][i * 3 + k] == 1
                    ? segments_char[i * 3 + k]
                    : ' ';

                // segments_matrix: The representation of finally output
                //
                // |_| |_| |_|
                //     ↑   ↑
                //     4   8 => 4 * j + k for a number.
            }
            segments_matrix[i][4 * j + 3] = ' ';
        }
    }

    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 4 * count - 1; ++j) {
            printf("%c", segments_matrix[i][j]);
        }
        printf("\n");
    }

    return 0;
}
