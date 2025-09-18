#include <stdio.h>

int main(void) {
    double e = 1.0, tail = 1.0, epsilon;
    int i = 1;
    printf("Enter the ϵ so that program terminates when tail < ϵ: ");
    scanf("%lf", &epsilon);

    printf("%2s    %17s\n", "n", "e");

    while (tail >= epsilon) {
        tail *= 1.0 / i;
        i++;
        e += tail;
        printf("%2d    %.15lf\n", i, e);
    }

    return 0;
}