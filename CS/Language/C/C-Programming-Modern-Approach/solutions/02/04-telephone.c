#include <stdio.h>

int main(void) {
    int part1, part2, part3;
    printf("Enter phone number [(xxx) xxx-xxxx]: ");
    scanf("(%d) %d-%d", &part1, &part2, &part3);
    printf("You entered %d.%d.%d", part1, part2, part3);

    return 0;
}