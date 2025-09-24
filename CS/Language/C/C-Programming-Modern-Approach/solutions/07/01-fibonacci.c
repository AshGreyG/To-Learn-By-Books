#include <stdio.h>

#define length(a) ((int) (sizeof(a) / sizeof(a[0])))

int main(void) {
    int fibonacci[40] = { 0, 1 };

    printf("%d\n%d\n", fibonacci[0], fibonacci[1]);
    for (int i = 2; i < length(fibonacci); ++i) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
        printf("%d\n", fibonacci[i]);
    }

    return 0;
}