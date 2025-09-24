#include <stdio.h>
#include <ctype.h>
#include <stdbool.h>

#define N 5

int main(void) {
    int matrix[N][N] = { { 0, }, };

    for (int i = 0; i < N; ++i) {
        printf("Enter row %d: ", i + 1);
        char input;
        int num = 0, j = 0;
        bool begin_parsing = false;

        while ((input = getchar()) != '\n' && j <= N - 1) {
            if (isdigit(input)) {
                num = num * 10 + input - '0';
                if (!begin_parsing) begin_parsing = true;
            } else if (begin_parsing) {
                begin_parsing = false;
                matrix[i][j] = num;
                num = 0;
                j++;
            }
        }

        if (num != 0 && input == '\n') {
            matrix[i][j] = num;
            num = 0;
            j++;
        }

        // Notice that the input may be end with a number and `\n` but no other
        // characters like space between them, so the last one will be omitted
        // from parsing.
    }

    printf("The matrix is: \n");
    for (int i = 0; i < N; ++i) {
        for (int j = 0; j < N; ++j) {
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }

    printf("Row totals: ");
    for (int i = 0; i < N; ++i) {
        int sum = 0;
        for (int j = 0; j < N; ++j) {
            sum += matrix[i][j];
        }
        printf("%d ", sum);
    }

    printf("\n");

    printf("Column totals: ");
    for (int i = 0; i < N; ++i) {
        int sum = 0;
        for (int j = 0; j < N; ++j) {
            sum += matrix[j][i];
        }
        printf("%d ", sum);
    }

    return 0;
}