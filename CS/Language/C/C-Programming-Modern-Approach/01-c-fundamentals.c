#include <stdio.h>

// Necessary to "include" information about C's standard I/O library. The
// program's executable code goes inside `main` function.

// + Preprocessing: The program is first given to a *preprocessor*, which
//   obeys commands that begin with `#` (known as *directives*). A preprocessor
//   is a bit like an editor; it can add things to the program and make
//   modifications.

// + Compiling: The modified program now goes to a *compiler*, which translates
//   it into machine instructions. The program isn't quite ready to run yet.

// + Linking: In the final step, a *linker* combines the object code produced
//   by the compiler with any additional code needed to yield a complete 
//   executable program. This additional code includes library functions that
//   are used in program.

#define THIS_IS_CONSTANT 134

// `#define` is a preprocessing directive, just as `#include` is, so there's
// no semicolon at the end of the line. When a program is compiled, the
// preprocessor replaces each macro by the value that it represents.

// int weight = THIS_IS_CONSTANT * 3 + THIS_IS_CONSTANT - 1 =>
// int weight = 134 * 3 + 134 - 1

int main(void) {
    printf("To C, or not to C: that is the question.\n");

    int height = 3;
    printf("Height: %d\n", height);

    // `%d` is a placeholder indicating where the value of `height` is to be
    // filled in during printing. `%d` works only for `int` variable, to print
    // a `float` variable, we'd use `%f` instead. By default, `%f` displays
    // a number with six digits after the decimal point. To force `%f` to
    // display p digits after the decimal point, we can put .p between `%`
    // and `f`:

    float distance = 3.12987;
    printf("Distance: %f (Default format)\n", distance);    // => 3.129870
    printf("Distance: %.2f (2 digits)\n", distance);        // => 3.13
    printf("Distance: %.9f (9 digits)\n", distance);        // => 3.129869938

    // Some variables are automatically set to zero when a program begins to
    // execute, but most are not. A variable that doesn't have a default value
    // and hasn't yet been assigned a value by the program is said to be
    // *uninitialized*.

    // To obtain input, we'll use the `scanf` function (f stands for formatted),
    // both `printf` and `scanf` require the use of a *format string* to specify
    // the appearance of the input or output data.

    int input_integer;
    scanf("%d", &input_integer);
    printf("Input is %d", input_integer);

    return 0;
    // Return statement in main function is equivalent to `exit(...)`.
}

// Use `cc <name>.c` to leave the executable program in a file named `a.out` by
// default. `cc` has an option `-o` allowing us to choose the name of the file
// containing the executable program.

// Main function returns a status code that is given to the OS when the program
// terminates..