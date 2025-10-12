#include <stdio.h>
#include <string.h>

#define LENGTH(a) (int)(sizeof(a) / sizeof(a[0]))

void print_repeated(const char *repeated, int times) {
    for (int i = 0; i < times; ++i)
        printf("%s", repeated);
}

void string_header_test(void) {
    char test_strcpy1[20], test_strcpy2[20];
    print_repeated("\n", 3);
    print_repeated("=", 30);
    printf("\n");
    printf(
        "Now begin to test `strcpy` function: \n"
        "Please input a string (which is assigned to `test_strcpy1`): "
    );
    fgets(test_strcpy1, sizeof(test_strcpy1), stdin);
    strcpy(test_strcpy2, test_strcpy1);
    printf(
        "`test_strcpy1` is copied to `test_strcpy2`:\n"
        "`test_strcpy2`: %s",
        test_strcpy2
    );
    print_repeated("=", 30);

    // `strncpy` is similar to `strcpy` but has a third argument that limits
    // the number of characters that will be copied,

    char test_strncpy1[20], test_strncpy2[10];
    print_repeated("\n", 3);
    print_repeated("=", 30);
    printf("\n");
    printf(
        "Now begin to test `strncpy` function: \n"
        "Please input a string (which is assigned to `test_strncpy1`): "
    );
    fgets(test_strncpy1, sizeof(test_strncpy1), stdin);
    strncpy(test_strncpy2, test_strncpy1, sizeof(test_strncpy2));
    printf(
        "`test_strncpy1` is copied to `test_strncpy2`:\n"
        "`test_strncpy2`: %s",
        test_strncpy2
    );
    print_repeated("=", 30);

    printf("\n%d\n", (int)strlen("Test for string length"));

    // The return type of `strlen` function is `size_t`, which is the type alias
    // of `unsigned long`.

    char test_strcat1[100] = "There is";
    char test_strcat2[] = " a content concatenated.";

    printf("Test for `strcat` function: %s\n", strcat(test_strcat1, test_strcat2));

    char test_strncat1[100] = "There is a test string";
    char test_strncat2[] = " for `strncat` function.";

    printf(
        "Test for `strncat` function: %s\n",
        strncat(
            test_strncat1,
            test_strncat2,
            (size_t)(sizeof(test_strncat1) / sizeof(test_strncat1[0]) - strlen(test_strncat1) - 1)
        )
    );

    // The `strcmp` function compares the strings `s1` and `s2`, returning a
    // value less than, equal to, or greater than 0

    char test_strcmp1[] = "abc";
    char test_strcmp2[] = "abc";
    char test_strcmp3[] = "abb";
    char test_strcmp4[] = "abd";
    printf(
        "If a = \"abc\", b = \"abc\", c = \"abb\", d = \"abd\", then: \n"
        "  a == b: %s\n"
        "  a <  c: %s\n"
        "  c >  d: %s\n",
        strcmp(test_strcmp1, test_strcmp2) == 0 ? "true" : "false",
        strcmp(test_strcmp1, test_strcmp3) <  0 ? "true" : "false",
        strcmp(test_strcmp3, test_strcmp4) >  0 ? "true" : "false"
    );
}

int main(void) {
    // If we find that a string literal is too long to fit conveniently on a single
    // line, C allows us to continue it on the next line, provided that we end the
    // first line with a backslash character '\'

    printf("\
// If we find that a string literal is too long to fit conveniently on a single\n\
// line, C allows us to continue it on the next line, provided that we end the\n\
// first line with a backslash character '\\'\n"
    );

    // The '\' technique has one drawback: the string must continue at the
    // beginning of the next line, thereby wrecking the program's indented
    // structure. There is a better way to deal with long string literals,
    // when two or more string literals are adjacent (separated only by white
    // spaces), the compiler will join them into a single string.

    printf(
        "// The '\\' technique has one drawback: the string must continue at the\n"
        "// beginning of the next line, thereby wrecking the program's indented\n"
        "// structure. There is a better way to deal with long string literals,\n"
        "// when two or more string literals are adjacent (separated only by white\n"
        "// spaces), the compiler will join them into a single string.\n"
    );
    // C treats string literals as character arrays, when a C compiler encounters
    // a string literal of length `n` in a program, it sets aside `n + 1` bytes
    // of memory for the string. This area of memory will contain the characters
    // in the string, plus one extra character `\0` (*null character*). The null
    // character is a byte whose bits are all zero.

    char first_of_string_literal = "This is a test"[0];
    printf("%c\n", first_of_string_literal);

    char string_variable[20] = "This is a test";
    printf("%s\n", string_variable);

    // Although `"This is a test"` appears to be a string literal, C compiler
    // considers it as a special array initializer.

    char string_variable_array[] = "Automatically compute the length";
    printf("%d\n", LENGTH(string_variable_array)); // => 33

    string_variable_array[2] = '&';
    printf("Change string (array   version): %s\n", string_variable_array);

    char *string_variable_pointer = "Automatically compute the length";
    // string_variable_pointer[2] = '&'; // uncomment here
    // There is a serious problem: modifying string literal is an undefined
    // behavior, in some system it will cause SIGSEGV

    printf("Change string (pointer version): %s\n", string_variable_pointer);

    // `printf` writes the characters in a string one by one until it encounters
    // a null character.

    puts("This string is printed by `puts` function.");

    // `puts` has only one argument but after writing the string, `puts` function
    // always writes an additional new-line character.

    // By default, `scanf` function reads the input until encountering a white
    // -space character. To read an entire line of input we use `gets` function.
    // However, `gets` function is removed in C11, because it has serious buffer
    // overflow bug.

    char read_input_from_fgets[20];
    printf("Try to input a sentence with white-space characters: ");
    fgets(read_input_from_fgets, sizeof(read_input_from_fgets), stdin);
    printf("The sentence you input: %s\n", read_input_from_fgets);

    string_header_test();

    return 0;
}

// When we run a program, we'll often need to supply it with information:
// Command-line information is available to all programs, to obtain access to
// these *command-line arguments* (*program arguments*), we must define `main`
// function with two parameters:

// int main(int argc, char *argv[]);
//
// + argc: *argument count*, is the number of command-line arguments (including
//   the name of the program itself)
// + argv: *argument vector*, is an array of pointers to the name of the program
//   it has one additional element, `argv[argc]` which is always a *null pointer*
//   a special pointer that points to nothing
