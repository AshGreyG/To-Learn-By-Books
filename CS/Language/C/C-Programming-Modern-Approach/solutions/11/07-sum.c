#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    double result = 0;
    for (int i = 1; i < argc; ++i) {
        double a = atof(argv[i]);
        result += a;
    }
    printf("Sum is %lf", result);
    return 0;
}
