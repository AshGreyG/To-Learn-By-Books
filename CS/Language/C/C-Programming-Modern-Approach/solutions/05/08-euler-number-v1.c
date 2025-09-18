#include <stdio.h>
#include <math.h>

int main(void) {
    int n, width;
    printf("Enter the n to calculate Euler number: ");
    scanf("%d", &n);

    width = (int)(floor(log10(n))) + 1;

    double e = 1.0, tail = 1.0;

    printf("%*s    %17s\n", width, "n", "e");

    for (int i = 1; i <= n; ++i) {
        tail *= 1.0 / i;
        e += tail;
        printf("%*d    %.15lf\n", width, i, e);
    }

    return 0;
}