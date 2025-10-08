#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("This program has %d argument(s).\n", argc);

    printf("The arguments of this program is: \n");

    for (int i = 0; i < argc; ++i)
        printf("argument %d: %s\n", i, argv[i]);

    return 0;
}
