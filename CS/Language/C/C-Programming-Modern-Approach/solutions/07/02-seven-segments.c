#include <stdio.h>

void print_repeated(char* repeated, int times) {
    for (int i = 0; i < times; ++i) {
        printf("%s", repeated);
    }
}

const int segments[10][7] = {
    { 1, 1, 1, 1, 1, 1, 0 },    // 0
    { 0, 1, 1, 0, 0, 0, 0 },    // 1
    { 1, 1, 0, 1, 1, 0, 1 },    // 2
    { 1, 1, 1, 1, 0, 0, 1 },    // 3
    { 0, 1, 1, 0, 0, 1, 1 },    // 4
    { 1, 0, 1, 1, 0, 1, 1 },    // 5
    { 1, 0, 1, 1, 1, 1, 1 },    // 6
    { 1, 1, 1, 0, 0, 0, 0 },    // 7
    { 1, 1, 1, 1, 1, 1, 1 },    // 8
    { 1, 1, 1, 1, 0, 1, 1 },    // 9
};

const char* displays(const int* segment) {
    static char str[13];
    sprintf(
        str,
        " %c \n%c%c%c\n%c%c%c\n",
        segment[0] ? '_' : ' ',
        segment[5] ? '|' : ' ',
        segment[6] ? '_' : ' ',
        segment[1] ? '|' : ' ',
        segment[4] ? '|' : ' ',
        segment[3] ? '_' : ' ',
        segment[2] ? '|' : ' '
    );
    return str;
}

int main(void) {
    for (int i = 0; i <= 9; ++i) {
        printf("%s", displays(segments[i]));
        print_repeated("\n", 2);
    }
    return 0;
}