#include <stdio.h>

void selection_sort(int a[], int tail) {
    if (tail == 0) return;

    int max = a[tail], temp = a[tail], max_index = tail;
    for (int i = tail; i >= 0; i--) {
        if (a[i] > max) {
            max = a[i];
            max_index = i;
        }
    }
    a[tail] = max;
    a[max_index] = temp;

    selection_sort(a, tail - 1);
}

int main(void) {
    int n;
    printf("Enter the amount of numbers you want to sort: ");
    scanf("%d", &n);

    int input[n];

    printf("Enter the array you want to sort: ");
    for (int i = 0; i < n; ++i)
        scanf("%d", &input[i]);

    selection_sort(input, n - 1);

    printf("After selection sort: ");
    for (int i = 0; i < n; ++i)
        printf("%d ", input[i]);

    return 0;
}
