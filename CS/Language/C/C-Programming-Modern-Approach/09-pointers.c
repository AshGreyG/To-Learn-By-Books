#include <stdio.h>

#define MULTIPLE_ROWS 10
#define MULTIPLE_COLS 20

// In most modern computers, main memory is divided into bytes, with each byte
// capable of storing *eight bits* of information.
//
// Each byte has a unique *address* to distinguish it from other bytes. If
// there are n bytes in memory, we can think of addresses as numbers that range
// from 0 to n - 1.
//
// The address of the first byte is said to be the address of the variable.
// Although addresses are represented by numbers, their range of values may
// differ from that of integers, so we can't necessarily store them in ordinary
// integer variables. We can store them in special *pointer variables*.
//
// C requires that every pointer variable point only to objects of a particular
// type (the referenced type).

// C passes arguments by value, if we want the function be able to modify the
// variable, we should use pointer parameters. Array parameters actually are
// pointer parameters. If we don't want to change the value of object that
// pointers point to, we can use `const` keyword

double not_changing_value(const int *array) {
    // array[0] = 1; // uncomment here // Read-only variable is not assignable
    int temp;
    array = &temp;  // Allowed.
    return 0.0;
}

double not_changing_pointer(int* const array) {
    array[0] = 1;
    int temp;
    // array = &temp;  // uncomment here
                    // Cannot assign a variable 'array' with const-qualified
                    // type 'int *const'
    return 0.0;
}

// We can return the pointer too (notice: never return a pointer to an automatic
// local variable, that will cause producing a wild pointer).

int* find_middle(int array[], int length) {
    return &array[length / 2];
}

int main(void) {
    int *wild_pointer;
    printf("Now accessing to an uninitialized pointer: %p\n", wild_pointer);
    printf("Now accessing to an         empty pointer: %p\n", (void*)0);
    printf("Now accessing to an         empty pointer: %p\n", NULL);

    // They are both (nil). NULL is defined as (void*)0

    // This declaration states that `wild_pointer` is a pointer variable capable
    // of pointing to *objects* of type `int`. Use *objects* rather than
    // *variables*, because pointers can point to an area of memory.

    // To find the address of a variable, we use the & address operator. If `x`
    // is a variable, then `&x` is the address of `x` in memory. To gain access
    // to the object that a pointer points to, we use the * indirection operator
    // If `p` is a pointer, then `*p` represents the object to which `p`
    // currently points.

    int points_to = 3;
    int *normal_pointer = &points_to;
    printf("Now accessing to a normal pointer: %p\n", normal_pointer);
    printf("The value of this  normal pointer: %d\n", *normal_pointer);

    // Attempted to apply the indirection operator to an uninitialized pointer
    // variable can lead to an undefined behavior.

    // Pointer can point to an array element and it can be applied *pointer
    // arithmetic* or *address arithmetic*.

    int array[10] = { 0 };
    for (int i = 0; i < 10; ++i) array[i] = i + 1;

    int *array_pointer = &array[0];
    printf(
        "Accessing pointer pointing to the head plus 3: %d\n",
        *(array_pointer + 3) // => 4
    );

    // Integers used in pointer arithmetic are scaled depending on the type of
    // the pointer. If `p` is of type `int *`, then `p + j` typically adds
    // `4 × j` to address of `p`.

    // The compiler treats `i[a]` as `*(i + a)` which is the same as `*(a + i)`
    // So at most time `i[a]` is same with `a[i]`.

    // We can compare pointers using the relational operators (<, <=, >, >=)
    // and the equality operators 

    printf(
        "&array[0] < &array[1]: %s\n",
        &array[0] < &array[1] ? "true" : "false"  // => true
    );

    // Compound literal is a C99 feature that can be used to create an array
    // with no name:

    int *compound_literal_pointer = (int[]){ 1, 2, 3 };

    for (int *i = &array[0]; i < &array[10]; ++i) {
        printf("%p : %d\n", i, *i);
    }

    // Let us see pointers and multiple-dimension arrays:

    int multi_dim[MULTIPLE_ROWS][MULTIPLE_COLS] = {{ 0 }};

    for (int *p = &multi_dim[0][0]; p <= &multi_dim[MULTIPLE_ROWS - 1][MULTIPLE_COLS - 1]; ++p) {
        *p = 1;
    }

    for (int *p = multi_dim[0]; p <= multi_dim[MULTIPLE_ROWS - 1]; ++p) {
        p[0] = 1;
    }

    // Since for any two-dimensional array `a`, the expression `a[i]` is a
    // pointer to the first element in row `i`. And the name of this two-
    // dimensional array cannot be considered as a pointer to the `a[0][0]`
    // but the pointer to `a[0]`.

    // Pointers are allowed to point to elements of variable-length arrays (VLA)
    // An ordinary pointer variable would be used to point to an element of a
    // one dimensional VLA

    int n1;
    int vla1[n1];
    int *pointer_vla1 = vla1; // => type: int *

    int n2, n3;
    int vla2[n2][n3];
    int (*pointer_vla2)[n3] = vla2; // => type: int (*)[n3]

    // Since the type of `pointer_vla2` depends on `n`, which isn't constant,
    // `pointer_vla2` is said to have a *variably modified type*.

    return 0;
}
