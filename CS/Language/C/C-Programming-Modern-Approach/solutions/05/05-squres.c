#include <stdio.h>
#include <math.h>

int main(void) {
    int n;
    printf("Enter n we will display the square numbers in 1 ~ n: ");
    scanf("%d", &n);

    for (int i = 2; i <= floor(sqrt(n)); ++i) {
        printf("%d\n", i * i);
    }

    return 0;
}