#include <stdio.h>
#include <limits.h>
#include <float.h>
#include <complex.h>

// Working at compile-time, from
// https://stackoverflow.com/a/28897994/23178151

#define TYPENAME(var) _Generic((var),               \
    char: "char",                                   \
    unsigned char: "unsigned char",                 \
    short int: "short",                             \
    unsigned short int: "unsigned short",           \
    int: "int",                                     \
    unsigned int: "unsigned int",                   \
    long int: "long",                               \
    unsigned long int: "unsigned long",             \
    long long int: "long long",                     \
    unsigned long long int: "unsigned long long",   \
    float: "float",                                 \
    double: "double",                               \
    long double: "long double",                     \
    char*: "char* (string)",                        \
    void*: "void*",                                 \
    default: "unknown type"                         \
)

void print_repeated(char* repeated, int times) {
    for (int i = 0; i < times; ++i) {
        printf("%s", repeated);
    }
    printf("\n");
}

int main(void) {
    // The leftmost bit of a signed integer (known as *sign bit*) is 0 if the
    // number is *positive or 0*, 1 if it's *negative*.
    //
    // 0111111111111111 which has the value 32767 (2^15 - 1). An integer with
    // no sign bit (the left most bit is considered part of the number's 
    // magnitude) is said to be unsigned. The largest 16bit unsigned integer
    // is 65535 (2^16 - 1). By default the integer variables are signed in
    // C, the leftmost bit is reserved for the sign. To tell the compiler that
    // a variable has no sign bit, we declare it to be `unsigned`.

    unsigned int   unsigned_int_variable;
    unsigned short unsigned_short_variable;
    unsigned long  unsigned_long_variable;

    // Omitting `int` is a widespread practice among C programmers.

    print_repeated("=", 76);
    printf("The range of char, short, int, long, long long and their unsigned version: \n");
    print_repeated("-", 76);
    printf("%-22s  |  %22s  |  %22s\n", "Type", "Smallest Value", "Largest Value");
    print_repeated("-", 76);
    printf("%-22s  |  %22hhd  |  %22hhd\n", "signed char",            SCHAR_MIN, SCHAR_MAX);
    printf("%-22s  |  %22hhu  |  %22hhu\n", "unsigned char",          0,         UCHAR_MAX);
    printf("%-22s  |  %22hd  |  %22hd\n",   "short int",              SHRT_MIN,  SHRT_MAX);
    printf("%-22s  |  %22hu  |  %22hu\n",   "unsigned short int",     0,         USHRT_MAX);
    printf("%-22s  |  %22d  |  %22d\n",     "int",                    INT_MIN,   INT_MAX);
    printf("%-22s  |  %22u  |  %22u\n",     "unsigned int",           0U,        UINT_MAX);
    printf("%-22s  |  %22ld  |  %22ld\n",   "long int",               LONG_MIN,  LONG_MAX);
    printf("%-22s  |  %22lu  |  %22lu\n",   "unsigned long int",      0UL,       ULONG_MAX);
    printf("%-22s  |  %22lld  |  %22lld\n", "long long int",          LLONG_MIN, LLONG_MAX);
    printf("%-22s  |  %22llu  |  %22llu\n", "unsigned long long int", 0ULL,      ULLONG_MAX);
    print_repeated("=", 76);

    // Type                    |          Smallest Value  |           Largest Value
    // signed char             |                    -128  |                     127
    // unsigned char           |                       0  |                     255
    // short int               |                  -32768  |                   32767
    // unsigned short int      |                       0  |                   65535
    // int                     |             -2147483648  |              2147483647
    // unsigned int            |                       0  |              4294967295
    // long int                |    -9223372036854775808  |     9223372036854775807
    // unsigned long int       |                       0  |    18446744073709551615
    // long long int           |    -9223372036854775808  |     9223372036854775807
    // unsigned long long int  |                       0  |    18446744073709551615

    print_repeated("\n", 3);

    int integer_decimal = 12;
    int integer_octal = 012;
    int integer_hexadecimal = 0x12;
    printf("Integer(decimal):     %d\n", integer_decimal);      // => 12
    printf("Integer(octal):       %d\n", integer_octal);        // => 10
    printf("Integer(hexadecimal): %d\n", integer_hexadecimal);  // => 18
    
    print_repeated("\n", 3);

    // Reading integer inputs:
    // - %u  -> unsigned decimal
    // - %d  -> decimal      base 10
    // - %o  -> octal        base 8
    // - %x  -> hexadecimal  base 16
    // - %hh -> char
    // - %h  -> short
    // - %l  -> long
    // - %ll -> long long

    // float       Single-precision floating-point
    // double      Double-precision floating-point
    // long double Extended-precision floating-point

    // Most modern computers follow the specifications in IEEE Standard 754.
    // Numbers are stored in a form of scientific notation, with each number
    // having three parts: a *sign*, an *exponent* and a *fraction*.
    // 
    // + exponent determines how large numbers can be
    // + the number of bits in the fraction determines the precision
    //
    // + single-precision: exponents 8-bit, fraction 23-bit, with sign 32-bit
    //   As a result, a single-precision number has a maximum value of
    //   approximately 3.40 × 10³⁸, with a precision of about 6 decimal digits.

    print_repeated("=", 88);
    printf(
        "%-12s  |  %30s  |  %20s  |  %10s\n", 
        "Type",
        "Smallest Positive Value",
        "Largest Value",
        "Precision"
    );
    print_repeated("-", 88);
    printf("%-12s  |  %30e  |  %20e  |  %10d\n",   "float",       FLT_MIN,  FLT_MAX,  FLT_DIG);
    printf("%-12s  |  %30e  |  %20e  |  %10d\n",   "double",      DBL_MIN,  DBL_MAX,  DBL_DIG);
    printf("%-12s  |  %30Le  |  %20Le  |  %10d\n", "long double", LDBL_MIN, LDBL_MAX, LDBL_DIG);
    print_repeated("=", 88);

    // Type          |  Smallest Positive Value  |  Largest Value  |   Precision
    // -------------------------------------------------------------------------
    // float         |             1.175494e-38  |   3.402823e+38  |           6
    // double        |            2.225074e-308  |  1.797693e+308  |          15
    // long double   |           3.362103e-4932  | 1.189731e+4932  |          18

    print_repeated("\n", 3);

    // The `float`, `double`, `long double` are called the *real floating types*.
    // The `float _Complex`, `double _Complex` and `long double _Complex` are called
    // the *complex floating types*.

    complex int complex_integer = 1 + 2i;
    complex float complex_float = 1.0 + 2.0i;
    complex double complex_double;
    complex long double complex_long_double;

    printf(
        "complex_integer_variable = %lf + %lfi",
        creal(complex_integer),
        cimag(complex_integer)
    );

    print_repeated("\n", 3);

    // C treats characters as small integers, in ASCII, characters are encoded
    // from 0000000 to 1111111. So `signed char` can be assigned negative values.
    // The C standard doesn't specify whether ordinary `char` is a signed or
    // an unsigned type.

    // Don't assume that `char` is either signed or unsigned by default. If it
    // matters, use `signed char` or `unsigned char` instead of `char`.

    // We can use and `getchar` function to read single character, and use
    // `putchar` to write a single character:

    putchar(65);    // 'A' is displayed in the terminal.
    putchar(66);    // 'B' is displayed after 'A', it won't create a new line.
    putchar('\n');

    printf("Enter the character, it will be accepted by getchar function: ");
    
    char ch_input = getchar();

    printf("Its code is %d\n", (int)ch_input);  // <: getchar :>
    while (getchar() != '\n');

    char ch_max = -1, ch_temp = -1;
    printf("The next loop will not stop until you enter <Return>: ");

    while ((ch_temp = getchar()) != '\n') { // <: loop_getchar :>
        if (ch_temp > ch_max) ch_max = ch_temp;
    }
    printf("The max character of your input is %c", ch_max);

    // Notice, if at label <: getchar :> user enters the <Return> then the
    // loop will not start because the last `\n` in IO buffer will meet
    // the `getchar` function in <: loop_getchar :>

    print_repeated("\n", 3);

    // Compilers will convert different types automatically like 1 + 1.0,
    // it will convert the `int` type to `float`. Because the compiler handles
    // these conversions automatically, without the programmer's involvement,
    // they're known as *implicit conversions*. C also allows the programmer
    // to perform *explicit conversions*.

    // + When the operands in an arithmetic or logical expression don't have
    //   the same type. C performs what are known as the *usual arithmetic
    //   conversions*.
    // + When the type of the expression on the right side of an assignment
    //   doesn't match the type of the variable on the left side.
    // + When the type of an argument in a function call doesn't match the
    //   type of the corresponding parameter.
    // + When the type of the expression in a `return` statement doesn't
    //   match the function's return type.

    // An integer can always be converted to float, so if `f` has float type
    // and `i` has int type, then `f + i` will produce a float type value.

    // The strategy behind the usual arithmetic conversions is to convert
    // operands to the narrowest type that will safely accommodate both values.
    // Roughly speaking, one type is narrower than another if it requires fewer
    // bytes to store. The types of the operands can often be made to match by
    // converting the operand of the narrower type to the type of the other
    // operand, this act is known as *promotion*.

    char test_char;
    short int test_short;
    int test_int;
    unsigned int test_unsigned_int;
    long int test_long;
    unsigned long int test_unsigned_long;
    float test_float;
    double test_double;
    long double test_long_double;

    printf("%-20s + %-20s = %-20s\n", "char",          "short int",     TYPENAME(test_char + test_short));
    printf("%-20s + %-20s = %-20s\n", "int",           "char",          TYPENAME(test_int + test_char));
    printf("%-20s + %-20s = %-20s\n", "int",           "short int",     TYPENAME(test_int + test_short));
    printf("%-20s + %-20s = %-20s\n", "unsigned int",  "int",           TYPENAME(test_unsigned_int + test_int));
    printf("%-20s + %-20s = %-20s\n", "long",          "unsigned int",  TYPENAME(test_long + test_unsigned_int));
    printf("%-20s + %-20s = %-20s\n", "unsigned long", "long",          TYPENAME(test_unsigned_long + test_long));
    printf("%-20s + %-20s = %-20s\n", "float",         "unsigned long", TYPENAME(test_float + test_unsigned_long));
    printf("%-20s + %-20s = %-20s\n", "double",        "float",         TYPENAME(test_double + test_float));
    printf("%-20s + %-20s = %-20s\n", "long double",   "double",        TYPENAME(test_long_double + test_double));
    
    // char                 + short int            = int                 
    // int                  + char                 = int                 
    // int                  + short int            = int                 
    // unsigned int         + int                  = unsigned int        
    // long                 + unsigned int         = long                
    // unsigned long        + long                 = unsigned long       
    // float                + unsigned long        = float               
    // double               + float                = double              
    // long double          + double               = long double         

    // We can use expression like `(<type>) <variable>` to explicitly convert
    // types of a variable:

    test_float = (float)test_int;
    test_unsigned_long = (unsigned long)test_int;

    return 0;
}
