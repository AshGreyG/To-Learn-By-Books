#include <stdio.h>
#include <math.h>

void print_repeated(char* repeated, int times) {
    for (int i = 0; i < times; ++i) {
        printf("%s", repeated);
    }
    printf("\n");
}

int main(void) {
    long long n;
    printf("Enter n we will display the square numbers in 1 ~ n: ");
    scanf("%lld", &n);

    int width = floor(log10(n)) + 1;

    print_repeated("=", width);
    for (int i = 2; i <= floor(sqrt(n)); ++i) {
        if (i % 24 == 0) {
            printf("Press Enter to continue...");
            while (getchar() != '\n');
        }

        printf("%hd\n", i * i);

        // When the type of i is:
        // + short -> n < 32767 * 32767
        // + int   -> n < 2147483647 * 2147483647
    }
    print_repeated("=", width);

    return 0;
}