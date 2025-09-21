#include <stdio.h>

int main(void) {
    printf("%lu\n", sizeof(signed char));        // 1
    printf("%lu\n", sizeof(unsigned char));      // 1
    printf("%lu\n", sizeof(short));              // 2
    printf("%lu\n", sizeof(unsigned short));     // 2
    printf("%lu\n", sizeof(int));                // 4
    printf("%lu\n", sizeof(unsigned int));       // 4
    printf("%lu\n", sizeof(long));               // 8
    printf("%lu\n", sizeof(unsigned long));      // 8
    printf("%lu\n", sizeof(long long));          // 8
    printf("%lu\n", sizeof(unsigned long long)); // 8
    printf("%lu\n", sizeof(float));              // 4
    printf("%lu\n", sizeof(double));             // 8
    printf("%lu\n", sizeof(long double));        // 16

    return 0;
}