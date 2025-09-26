#include <stdio.h>
#include <string.h>

#define length(a) ((int) (sizeof(a) / sizeof(a[0])))

void print_repeated(char* repeated, int times) {
    for (int i = 0; i < times; ++i) {
        printf("%s", repeated);
    }
}

int main(void) {
    // *Scalar*: capable of holding a single data item . C also supports
    // *aggregate* variables, which can store collections of values.
    // There are two kinds of aggregates in C: *arrays* and *structures*.

    // An array is a data structure containing a number of data values, all
    // of which have the same type. These values, known as *elements*. The
    // simplest kind of array has just one dimension:

    int one_dimension[10];

    for (int i = 0; i < 10; ++i) printf("%p\n", &one_dimension[i]);

    // To access a particular element of an aray, we write the array name
    // followed by an integer value in square brackets (this is referred
    // to as *subscripting* or *indexing* the array). Array elements are
    // always numbered starting from 0.

    // Expressions of the form `a[i]` are lvalues, so they can be used in
    // the same way as ordinary variables

    one_dimension[0] = 1;
    printf("The first element of one_dimension is %d\n", one_dimension[0]);

    // C doesn't require that subscript bounds be checked; if a subscript
    // goes out of range, the program's behavior is undefined.

    // An array can be given an initial value at the time it's declared.

    int array_initialization[4] = { 0, 1, 2, 3 };

    // If the initializer is shorter than the array, the remaining elements
    // of the array are given the value 0. Using this feature we can initialize
    // an array to all zeros:

    int all_zero_initialization[10] = { 0 };

    // If an initializer is present the length of the array may be omitted.

    int without_length[] = { 1, 2, 3, 4 };

    // It's often the case that relatively few elements of an array need to be
    // initialized explicitly; the other elements can be given default values.
    // C99's *designated initializers* can be used to solve this problem:
    // (Each number in brackets is said to be a *designator*)

    int designated_initialization[10] = { [2] = 2, [8] = 16 };

    // An initializer may use both the older (element-by-element) technique 
    // and the newer (designated) technique.

    int mixed_initialization[10] = { 1, [3] = -1, 9, [1] = 1, 2, };

    // Every indexes after designator assigns from the designator index.
    // 
    // { 1, [3] = -1, 9, ... }            => [1, _, _, -1, 9, ...]
    // { 1, [3] = -1, 9, [1] = 1, 2, ...} => [1, 1, 2, -1, 9, ...]
    //                                                  ↑
    // If the index continues to grow, the element-by-element assignment will
    // override the first designator index 3. And linter will give an error:
    //
    // Initializer overrides prior initialization of this subobject
    //   ==> clang(-Winitializer-overrides)

    for (int i = 0; i < 10; ++i) printf("%d ", mixed_initialization[i]);
    // => 1 1 2 -1 9 0 0 0 0 0
    printf("\n");

    // The `sizeof` operator can determine the size of an array (in bytes).
    // If `a` is an array of 10 integers, then `sizeof(a)` is typically
    // 40 bytes.

    printf("Size of a 10-elements int array: %lu\n", sizeof(one_dimension));  // => 40

    // We can also use `sizeof` to measure the size of an array element:

    printf(
        "Length of ⟨without_length⟩: %lu\n",
        sizeof(without_length) / sizeof(without_length[0])
    );
    // => 4

    for (int i = 0; i < length(without_length); ++i) {
        printf("%d ", without_length[i]);   // => 1, 2, 3, 4
    }
    printf("\n");

    // An array may have any number of dimensions:

    int two_dimensions[5][9];

    // This array has 5 rows and 9 columns, both rows and columns are indexed from 0.
    // C stores arrays in row-major order:

    print_repeated("=", 134);
    printf("\n");
    for (int i = 0; i < length(two_dimensions); ++i) {
        for (int j = 0; j < length(two_dimensions[0]); ++j) {
            printf("%p ", &two_dimensions[i][j]);
        }
        printf("\n");
    }
    print_repeated("=", 134);

    // ...00 ...04 ...08 ...0c ...10 ...14 ...18 ...1c ...20  -> two_dimensions[0]
    // ...24 ...28 ...2c ...30 ...34 ...38 ...3c ...40 ...44  -> two_dimensions[1]
    // ...48 ...4c ...50 ...54 ...58 ...5c ...60 ...64 ...68  -> two_dimensions[2]
    // ...6c ...70 ...74 ...78 ...7c ...80 ...84 ...88 ...8c  -> two_dimensions[3]
    // ...90 ...94 ...98 ...9c ...a0 ...a4 ...a8 ...ac ...b0  -> two_dimensions[4]

    // +----------------+----------------+----⋅⋅+----------------+----------------+----⋅⋅+
    // | 0x7ffc06091600 | 0x7ffc06091604 | ⋅⋅⋅  | 0x7ffc06091624 | 0x7ffc06091628 | ⋅⋅⋅  |
    // +----------------+----------------+----⋅⋅+----------------+----------------+----⋅⋅+
    // ↑    a[0][0]           a[0][1]           ↑     a[1][0]          a[1][1]           ↑
    // |-                a[0]                  -|-                a[1]                  -|

    int two_dim_initialization[3][4] = {
        { 1, 2, 3, 4 },
        { 0, 1, 1, 2 },
        { 0, 8, 1, 1 },
    };

    // + If an initializer isn't large enough to fill a multidimensional 
    //   array the remaining elements are given the value 0.
    // + If an inner list isn't long enough to fill a row, the remaining
    //   elements in the row are initialized 0.

    int two_dim_without_brackets_initialization[3][4] = {
        1, 2, 3, 4,
        0, 1, 1, 2,
        0, 8, 1, 1,
    };

    // Once the compiler has seen enough values to fill one row, it begins
    // filling the next.

    double two_dim_designated_initialization[2][2] = { [0][0] = 2.0, [0][1] = 1.0 };

    // Before C99, the length of an array variable must be specified by
    // a constant expression. In C99, it's sometimes possible to use an
    // expression that's not constant.

    print_repeated("\n", 3);
    print_repeated("=", 30);
    printf(" Started Reverse Array ");
    print_repeated("=", 30);
    printf("\n");

    int length_input;
    printf("How many numbers do you want to reverse? ");
    scanf("%d", &length_input);

    int var_length_arr[length_input];

    printf("Enter %d numbers: ", length_input);

    for (int i = 0; i < length_input; ++i)
        scanf("%d", &var_length_arr[i]);

    printf("In reverse order :");
    for (int i = length_input - 1; i >= 0; i--)
        printf("%d ", var_length_arr[i]);

    printf("\n");
    print_repeated("=", 83);
    printf("\n");

    // The array in this program is an example of a *variable-length-arrray*
    // or VLA for short. The length of a VLA is computed when the program is
    // executed not when the program is compiled.

    // If we want to copy an array into another, we can't use assignment.
    // Actually programmers often use `memcpy` function to do so (it's from
    // <string.h> header and is quite loe-level):

    int copy_from[30], copy_to[30];

    for (int i = 0; i < length(copy_from); ++i)
        copy_from[i] = (i + 1) * (i + 1);

    memcpy(copy_to, copy_from, sizeof(copy_to));

    for (int i = 0; i < length(copy_to); ++i)
        printf("%d ", copy_to[i]);

    return 0;
}