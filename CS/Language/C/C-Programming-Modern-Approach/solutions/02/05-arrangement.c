#include <stdio.h>

int main(void) {
    int input[16] = { 0 };
    printf("Enter the numbers from 1 to 16 in any order: \n");
    for (int i = 0; i < 16; ++i) {
        scanf("%d", &input[i]);
    }

    for (int i = 0; i < 16; ++i) {
        printf("%2d ", input[i]);
        if ((i + 1) % 4 == 0) {
            printf("\n");
        }
    }

    printf("\nRow sums: ");
    for (int i = 0; i < 16; i += 4) {
        int row_sum = 0;
        for (int j = 0; j < 4; ++j) {
            row_sum += input[i + j];
        }
        printf("%d ", row_sum);
    }

    printf("\nColumn sums: ");
    for (int i = 0; i < 4; ++i) {
        int column_sum = 0;
        for (int j = 0; j < 16; j += 4) {
            column_sum += input[i + j];
        }
        printf("%d ", column_sum);
    }

    printf("\nDiagonal sums: ");
    int main_diagonal = 0, sub_diagonal = 0;
    for (int i = 0; i < 4; ++i) {
        main_diagonal += input[i * 4 + i];
        sub_diagonal += input[i * 4 + (3 - i)];
    }
    printf("%d %d", main_diagonal, sub_diagonal);

    return 0;
}