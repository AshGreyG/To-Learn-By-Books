// For many years, the C language lacked a proper Boolean type, and there is
// none defined in the C89 standard. One way to work around this limitation
// of C89 is to declare an `int` variable and then assign it either 0 or 1.

#include <stdio.h>
#include <stdbool.h>

#define TRUE 1
#define FALSE 0
#define BOOL int

int main(void) {
    BOOL c89_boolean = TRUE;
    if (c89_boolean) {
        printf("We can use 0 and 1 to simulate boolean value.");
    }

    // C99 Provides the `_Bool` type, in this version of C, a Boolean variable
    // can be declared by writing: `_Bool` is still an alias of `int`

    _Bool c99_boolean = 1;

    // C99 also provides a new header `<stdbool.h>`, this header provides a
    // macro `bool` to stand for `_Bool`. And the header also provides macro names
    // `true` and `false`.

    bool c99_header_boolean = true;

    return 0;
}