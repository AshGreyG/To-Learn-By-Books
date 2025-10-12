#include <stdio.h>

// The `printf` function is designed to display the contents of a string, known
// as the **format string**, with values possibly inserted at specified points
// in the string. When it's called, `printf` must be supplied with the format
// string, followed by any values that are to be inserted into the string during
// printing.

// The format string may contain both ordinary characters and **conversion 
// specifications**, which begin with the % character. Compilers aren't required
// to check that a conversion specification is appropriate for the type of item
// being printed. If the programmer uses an incorrect specification, the program
// will simply produce meaningless output.

int main(void) {
    // printf("%d %d\n", 12);  // uncomment here
    // More conversion specifications than data arguments.

    printf("This is a meaningless output %d\n", 12.12);   // => 1104174952, meaningless

    // More generally, a conversion specification can have the form `%m.pX` or
    // `%-m.pX`, where `m` and `p` are integer constants and `X` is a letter.
    // Both `m` and `p` are optional; if `p` is omitted, the period that separates
    // `m` and `p` is also dropped. `%-m.pX` is left-justified.

    // - `m` is the **minimum field width**, specifies the minimum number of characters
    //   to print. If the value to be printed requires fewer than `m` characters,
    //   the value is right-justified within the field (Extra spaces precede the value).

    // - `p` is the **precision** depends on the choice of `X`. `X` indicates which 
    //   conversion should be applied to the value before it's printed. The most common
    //   conversion specification are:
    //
    //   - `d`: displays an integer in **decimal** (base 10). Extra zeros are added to
    //     the beginning of the number if necessary. If `p` is omitted, it is assumed
    //     to have the value 1. In other words, `%d` is the same as `%.1d`.

    printf("`d` is showed as %.3d\n", 1234);    // => 1234
    printf("`d` is showed as %.6d\n", 1234);    // => 001234

    //   - `e`: displays a floating-point number in exponential format, `p` indicates how
    //     many digits should appear after the decimal point. If `p` is 0, the decimal
    //     point is not displayed.

    printf("`e` is showed as %.3e\n", 12345.123); // => 1.235e+04
    printf("`e` is showed as %.3e\n", 0.01287);   // => 1.287e-02

    //   - `f`: displays a floating-point number in fixed decimal format, without an
    //     exponent. `p` has the same meaning as for the `e` specifier.

    printf("`f` is showed as %.9f\n", 1234.2351);   // => 1234.235100000
    printf("`f` is showed as %.3f\n", 1234.2351);   // => 1234.235

    //   - `g`: displays a floating-point number in either exponential format or fixed
    //     decimal format, depending on the number's size. Unlike the `f` conversion,
    //     the `g` conversion won't show trailing zeros.

    int test_input_integer_1, test_input_integer_2;
    float test_input_float;

    scanf("%d %d %f\n", &test_input_integer_1, &test_input_integer_2, &test_input_float);

    // We must use `&` to read to a pointer. Professional C programmers avoid `scanf`,
    // instead reading all data in character form and converting it to numeric form
    // later.

    // `scanf` function ignores **white-space characters** (the space, horizontal and
    // vertical tab, form-feed and new-line characters). As a result, numbers can be
    // put on a single line or spread out over several lines. `scanf` peeks at the
    // final new-line character without actually reading it. This new-line character
    // will be the first character read by the next call of `scanf`.

    // In a `printf` format string, there is no difference between `%i` and `%d`. In
    // a `scanf` format string, `%d` can only match an integer written in decimal (base
    // 10 form), while `%i` can match an integer expressed in octal (base 8), decimal
    // and hexadecimal (base 16)

    printf(
        "There is no difference between %%i and %%d: %i (%%i) ~ %d (%%d) at `printf`\n",
        12, // decimal base
        0xc // hexadecimal base
    );

    int test_input_integer_3, test_input_integer_4;

    scanf(
        "%d %i\n",
        &test_input_integer_3,
        &test_input_integer_4
    );
    printf(
        "There is difference between %%i and %%d: %i (%%i) ~ %d (%%d) at `scanf`\n",
        test_input_integer_3,
        test_input_integer_4
    );

    // If `printf` encounters two consecutive `%` characters in a format string, it prints
    // a single `%` character.

    return 0;
}
