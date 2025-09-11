#include <stdio.h>

int main(void) {
    int max, min;
    printf("Enter four integers: ");
    scanf("%d", &max);
    min = max;

    for (int i = 0; i < 3; ++i) {
        int temp;
        scanf("%d", &temp);

        if (temp > max) max = temp;
        if (temp < min) min = temp;
    }

    printf("Largest: %d\n", max);
    printf("Smallest: %d\n", min);

    return 0; 
}