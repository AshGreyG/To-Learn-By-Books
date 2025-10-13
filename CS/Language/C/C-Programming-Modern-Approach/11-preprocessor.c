#include <stdbool.h>
#include <stdio.h>

// The behavior of the preprocessor is controlled by *preprocessing directives*:
// commands that begin with a `#` character. When the #define macro is used
// later in the program, the preprocessor expands the macro, replacing it by
// its defined value or expression.
//
// The #include directives tell the preprocessor to open a particular file and
// includes its contents as part of the file being compiled.

// C program --------------> Modified C program ---------> Object code
//            preprocessor                       compiler

// The definition of parameterized macro, also known as a function-like macro
//
// #define <identifier>(x1, x2, ... , xn) <replacement-list>
//
// There must be no spaces between the macro name and the left parenthesis. If
// space is left, the preprocessor will assume that we're defining a simple
// macro, it will treat (x1, x2, ... , xn) as part of the replacement list.

#define LENGTH(a) (int)(sizeof(a) / sizeof(a[0]))
#define MAX(a, b) (a > b ? a : b)
#define TOUPPER(c) ('a' <= (c) && 'z' >= (c) ? (c) - 'a' + 'A' : (c))

// Parameterized macros often serve as simple functions. Notice we should use
// parenthesis to wrap the expression to avoid order problem.

// Macro definitions may contain two special operators `#` and `##`. Neither
// operator is recognized by the compiler; instead, they're executed during
// preprocessing. The `#` operator converts a macro argument into a string
// literal; it can appear only in the replacement list of a parameterized macro

#define PRINT_IDENTIFIER_MAP(n) printf(#n " = %d\n", n)

// The `##` operator can paste two tokens (identifiers) together to form a single
// token the `##` operation is called "token-pasting". If one of the operands
// is a macro parameter, pasting occurs after the parameter has been replaced
// by the corresponding argument:

#define PREFIX_ID(n) prefix_argument##n

#define _GENERIC_MAX(type)          \
type type##_max(type x, type y)  {  \
    return x > y ? x : y;           \
}

_GENERIC_MAX(float)
_GENERIC_MAX(int)

//   identifier => value
//  #identifier => name as string
// ##identifier => name as a part of another identifier

// Instead of using the comma operator in the definition of a macro, we could
// have enclosed the calls of statements in braces to form a compound statement

#define ECHO_V1(s) { s = getchar(); putchar(s); }

#define ECHO_V2(s)                                                              \
do {                                                                            \
    printf(                                                                     \
        "Now we're entering the macro compound statements generation...\n"      \
        "Please enter a character: "                                            \
    );                                                                          \
    s = getchar();                                                              \
    printf("Your input is: ");                                                  \
    putchar(s);                                                                 \
    putchar('\n');                                                              \
} while(0)

// In C89, a macro must have a fixed number of arguments, if it has any at all
// C99 loosens things up a bit, allowing macros that take an unlimited number
// of arguments:

#define TEST_UNLIMITED_ARGS(condition, ...)       \
((condition)                                      \
    ? printf("Passed test is: %s\n", #condition)  \
    : printf(__VA_ARGS__))

// The ... token, known as *ellipsis*, goes at the end of a macro's parameter
// list, preceded by ordinary parameters. `__VA_ARGS__` is a special identifier
// that can appear only in the replacement list of a macro with a variable number
// of arguments.

#define FUNCTION_CALLED() printf("<function called> %s\n", __func__);
#define FUNCTION_RETURN() printf("<function return> %s\n", __func__);

int test_function_macro(void) {
    FUNCTION_CALLED();
    FUNCTION_RETURN();
    return 1;
}

#define CONCAT_NAME(x, y) x##y

// Notice `CONCAT_NAME` cannot be nested like
//
// CONCAT_NAME(a, CONCAT_NAME(b, c))
//
// because it is expanded as `aCONCAT_NAME(b, c)` first and identifier
// `aCONCAT_NAME` is not found.

int main(void) {
    // C has predefined macros like __LINE__, __FILE__, __DATE__, __TIME__ and __STDC__

    printf("This file is compiled on %s at %s\n", __DATE__, __TIME__);
    printf("This file is compiled on C standard %d\n", __STDC_VERSION__);

    int test_for_stringify = 11;
    PRINT_IDENTIFIER_MAP(12);                 // => 12 = 12
    PRINT_IDENTIFIER_MAP(test_for_stringify); // => test_for_stringify = 11

    int PREFIX_ID(1) = 3;
    PRINT_IDENTIFIER_MAP(prefix_argument1);   // => prefix_argument1 = 3

    printf("%f\n", float_max(3.2, 1.2));
    printf("%d\n", int_max(1, 2));

    // char input;
    // if (false)
    //     ECHO_V1(input);
    // else
    //  ↑
    //  unexpected expression
    //     input = getchar();
    //
    // because it's expanded to the expression below:
    //
    // char input;
    // if (false)
    //     { input = getchar(); putchar(input) }; ← Notice this semicolon
    // else
    //     input = getchar();

    char input;
    if (true)
        ECHO_V2(input);
    else 
        printf("Wrong...Jump to the wrong branch\n");

    TEST_UNLIMITED_ARGS(1 > 0, "%d > %d is %s\n", 1, 0, 1 > 0 ? "true" : "false");
    TEST_UNLIMITED_ARGS(1 < 0, "%d < %d is %s\n", 1, 0, 1 < 0 ? "true" : "false");

    test_function_macro();

#define DEBUG_IN_MAIN_FUNCTION 1

// The C preprocessor recognizes a number of directives that support conditional
// compilation:
//
// The `#if` and `#endif` directives

#if DEBUG_IN_MAIN_FUNCTION
    printf("It's a message from debug mode in main function.\n");
#else
    printf("It's a message from un-debug mode in main function.\n");
#endif

#if defined(DEBUG_IN_MAIN_FUNCTION)
    printf("DEBUG_IN_MAIN_FUNCTION is defined in %s:%d.\n", __FILE__, __LINE__);
#endif

#undef DEBUG_IN_MAIN_FUNCTION

#if !defined(DEBUG_IN_MAIN_FUNCTION)
    printf("DEBUG_IN_MAIN_FUNCTION is not defined in line %s:%d.\n", __FILE__, __LINE__);
#endif

    // Notice we can also use `#if !DEBUG_IN_MAIN_FUNCTION`.
    //
    // `#if define` is equal to preprocessor directive `#ifdef`, and `#if !define`
    // is equal to `#ifndef`, and there are also `#elifdef` and `#elifndef`

#ifdef DEBUG_IN_MAIN_FUNCTION
    printf("DEBUG_IN_MAIN_FUNCTION is defined in %s:%d.\n", __FILE__, __LINE__);
#endif

#ifndef DEBUG_IN_MAIN_FUNCTION
    printf("DEBUG_IN_MAIN_FUNCTION is not defined in line %s:%d.\n", __FILE__, __LINE__);
// #error DEBUG_IN_MAIN_FUNCTION is not defined  // uncomment here
#endif

    // `#error` directive is used to terminate when compiling

    return 0;
}

// Macros may be "undefined" by the `#undef` directive:

#undef _GENERIC_MAX
