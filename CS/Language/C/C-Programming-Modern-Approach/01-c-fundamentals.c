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

    return 0;
}

// Use `cc <name>.c` to leave the executable program in a file named `a.out` by
// default. `cc` has an option `-o` allowing us to choose the name of the file
// containing the executable program.

// Main function returns a status code that is given to the OS when the program
// terminates.