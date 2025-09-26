#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

#define length(a) ((int) (sizeof(a) / sizeof(a[0])))

// This is the *return type* of this function
// ↓
double average(double a, double b) {
    //                ↑         ↑
    // Those identifiers are the *parameters* of function

    // Every function has an executable part called the *function body*,
    // which is enclosed in braces.

    return (a + b) / 2;
}

// When a function doesn't return anything, we should annotate the return
// type as `void`

void print_count(int n) {
    printf("T minus %d and counting\n", n);
}

// Some functions have no parameters at all. Consider:

void print_hello(void) {
    printf("Just always print Hello World.\n");
}

// <return-type> <function-name> ( <param-type> <param-identifiers>, ... ) {
//   <declarations>
//   <statements>
// }

// If the return type is omitted in C89, the function is presumed to return
// a value of type `int`. In C99 it's illegal to omit the return type of a
// function.

// In fact, C89 doesn't require that the definition of a function precede its
// calls. When the compiler first encounters a function in `main` function,
// it doesn't know how many parameters this function has, what the types
// of these parameters are, or what kind of value the function returns. 
// Instead of producing an error message, the compiler assumes that this
// function returns an `int` value. We say that the compiler has created an
// *implicit declaration* of this function.

// Now C99 doesn't support implicit function declaration. We can declare the
// function before `main` function but implement it like:

double before_main_declaration(void);

// Function declarations of the kind we've been discussing are known as
// *function prototypes*. A prototype provides a complete description of how
// to call a function, actually, a function prototype doesn't have to specify
// the names of the parameters

double prototype_param_no_name(double, double);

// When a function parameter is a one-dimensional array, the length of the
// array can be left unspecified. Unfortunately, C doesn't provide any
// easy way for a function to determine the length of an array passed to
// it:

void array_param(int arr[]) {
    printf("The length of passed-in is: %d\n", length(arr));

    // Sizeof array function parameter will return size of `int*` not `int[]`.
}

void function_vla(int n, int vla[n]);

// These two parameters cannot exchange their positions because when compiler
// encounters the `vla[n]` it doesn't know what `n` is.

// If the function prototype omits the parameter name but still wants to use
// VLA parameter, we can use `*` notation:

void function_vla_without_param_name(int, int [*]);

// C99 allows the use of the keyword `static` in the declaration of array
// parameters. Putting `static` keyword in front of number n of array length
// indicates the length of this array is guaranteed to be at least n:

void static_arr_length(int n, int a[static n]);
void static_arr_length_two_dimension(int m, int n, int a[static m][n]);

// Using `static` in this way has no effect on the behavior of the program.
// The presence of `static` is merely a "hint" that may allow a C compiler
// to generate faster instructions for accessing the array.
// If an array parameter has more than one dimension, `static` can be used
// only in the first dimension

// A function is *recursive* if it calls itself. In practice, recursion often
// arises naturally as a result of an algorithm design technique called
// *divide-and-conquer*, in which a large problem is divided into smaller
// pieces that are then tackled by the same algorithm.

// Quick sort:

// 1. Choose an array element e (the partitioning element), then rearrange
//    the array so that elements 1, ... ,i - 1 are less than or equal to e,
//    element i contains e, and elements i + 1, ... ,n are greater than or
//    equal to e.
// 2. Sort elements 1, ..., i - 1 by using Quick sort recursively
// 3. Sort elements i + 1, ..., n by using Quick sort recursively

// The detailed operations of step 1:

// procedure Quick-Sort(arr, low, high)
// 
// temp_low ← low
// temp_high ← high
// 
// while true
//   while low < high and arr[high] ≥ temp
//     high ← high - 1
//   if low ≥ high
//     break
//   arr[low] ← arr[high]
//   low ← low + 1
//
//   while low < high and arr[low] ≤ temp
//     low ← low + 1
//   if low ≥ high
//     break
//   arr[high] ← arr[low]
//   high ← high - 1
// 
// Quick-Sort(arr, temp_low, high - 1)
// Quick-Sort(arr, high, temp_high)

int split_array(int a[], int low, int high) {
    int part_element = a[low];

    while (true) {
        while (low < high && a[high] >= part_element)
            high--;
        if (low >= high) break;
        a[low++] = a[high];

        while (low < high && a[low] <= part_element)
            low++;
        if (low >= high) break;
        a[high--] = a[low];
    }

    a[high] = part_element;
    return high;
}

void quick_sort(int a[], int low, int high) {
    if (low >= high) return;
    int middle = split_array(a, low, high);
    quick_sort(a, low, middle - 1);
    quick_sort(a, middle + 1, high);
}

int main(void) {
    double average_return = average(2.0, 1.3);
    // We should use the return value of functions which has return value

    print_count(3);
    // Instead, `void` return type function must appear in a statement by
    // itself.

    // To make it clear that we're deliberately discarding the return value
    // we can use (void) to 

    (void) printf("This is a discarding statement.\n");

    // double receive_after_main = after_main_function(); // uncomment
    //                                    ↑
    // Call to undeclared function 'after_main_function'; ISO C99 and later 
    // do not support implicit function declarations
    // 
    // ==> clang(-Wimplicit-function-declaration)

    double receive_before_main = before_main_declaration();
    printf("%lf\n", receive_before_main);

    int test_array_param[3] = { 1, 2, 3 };
    array_param(test_array_param);  // => 2

    // The only problem with this arrangement is that `test_array_param`
    // is declared as a variable , but in C99, we can avoid this annoyance
    // by using a *compound literal*: an unnamed array that's created by
    // simply specifying which elements it contains:

    array_param((int [ ]){ 1, 2, 3 });
    array_param((int [3]){ 1, 2, 3 });

    // Notice, a compound literal is like an initializer, it can also has
    // designated elements.

    int sorting_length;
    printf("How many elements you want to sort?: ");
    scanf("%d", &sorting_length);

    int arr[sorting_length];
    printf("Enter %d numbers to be sorted: ", sorting_length);
    for (int i = 0; i < sorting_length; ++i)
        scanf("%d", &arr[i]);

    quick_sort(arr, 0, sorting_length - 1);

    for (int i = 0; i < sorting_length; ++i)
        printf("%d ", arr[i]);

    exit(EXIT_SUCCESS);
}

// The value returned by `main` is a status code: in some operating system
// it can be tested when the program terminates. `main` should return 0
// if the program terminates normally.

// The argument passed to `exit` has the same meaning as `main`'s return
// value.

double after_main_function(void) {
    return 1.0;
}

double before_main_declaration(void) {
    return 1.0;
}