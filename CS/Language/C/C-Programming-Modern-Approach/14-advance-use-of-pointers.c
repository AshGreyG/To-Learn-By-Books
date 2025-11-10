#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// C's data structures are normally fixed in size. The number of elements in
// an array is fixed once the program has been compiled. In C99 the VLA is
// determined at run time but it remains fixed for the rest of the array's
// lifetime. Fixed size data structures can be a problem.
//
// C supports *dynamic storage allocation*: the ability to allocate storage
// during program execution.
//
// To allocate storage dynamically we'll need to call one of the three memory
// allocation functions declared in the <stdlib.h> header:
//
//   [+] malloc:  Allocates a block of memory but doesn't initialize it;
//   [+] calloc:  Allocates a block of memory and cleas it;
//   [+] realloc: Resizes a previously allocated block of memory

// When we call a memory allocation function to request a block of memory, the
// function has no idea what type of data we're planning to store in the block,
// so it can't return a pointer to an ordinary type such as `int` or `char`.
// Instead the function returns a value of type `void *` (just a memory address)
//
// When a memory allocation function is called there's always a possibility that
// it won't be able to locate a block of memory large enough to satisfy our
// request. If that should happen the function will return a *null pointer*.

// Use `malloc` to allocate memory for a string
//
// C guarantees that a `char` value requires exactly one byte of storage (sizeof
// (char) is 1). Notice we need to allocate room for null character
// Dynamic storage allocation makes it possible to write functions that return
// a pointer to a new string - a string that didn't exist before the function
// was called.

char* concat(const char *s1, const char *s2) {
    char *result;
    result = (char *)malloc(strlen(s1) + strlen(s2) + 1);
    if (result == NULL) {
        printf("[Error] : malloc failed in <function:concat>\n");
        exit(EXIT_FAILURE);
    }
    strcpy(result, s1);
    strcat(result, s2);
    return result;
}

// Dynamically allocated arrays have the same advantages as dynamically allocated
// strings

// Functions with dynamically allocating storage must be used with care. When
// the value function returns is no longer needed we'll want to call the free
// function to release the space that the string occupies.

// We can use `malloc` to allocate space for an array in much the same way
// we used it to allocate space for a string. The primary difference is that the
// elements of an arbitrary array won't necessarily be *one byte* long. As a
// result we'll need to use the `sizeof` operator to calculate the amount of 
// space 

// The function prototype of `calloc` is
//   void* calloc(size_t nmemb, size_t size);

// Since `calloc` clears the memory that it allocates but `malloc` doesn't we
// may occasionally want to use `calloc` to allocate space for an object other
// than an array.

// Once we've allocated memory for an array we may later find that it's too
// large or too small. The `realloc` function can resize the array to better
// suit our needs
//   void* realloc(void *ptr, size_t size);
// Be sure that a pointer passed to `realloc` came from a previous call of
// `malloc`, `calloc` or `realloc`
//
//   [+] When it expands a memory block, `realloc` doesn't initialize the bytes
//       are added to the block
//   [+] If `realloc` can't enlarge the memory block as required, it returns
//       a null pointer the data in the bold memory block is unchanged.
//   [+] If `realloc` is called with a null pointer as its first argument, it
//       behaves like `malloc`
//   [+] If `realloc` is called with 0 as its second argument, it frees the
//       memory block.

// `malloc` and the other memory allocation functions obtain memory blocks from
// a storage pool known as the *heap*.
//
//    p = malloc(...);
//    q = malloc(...);
//    p = q;
//
// Now after q is assigned to pointer p, both pointer variables point to the
// second memory block (which is q's). There are no pointers to the first block
// so we'll never be able to use it again.
//
// A block of memory that's no longer accessible to a program is said to be
// *garbage*. A program that leaves garbage behind has a *memory leak*. Some
// languages provide a *garbage collector (gc)* that automatically locates and
// recycles garbage, but C doesn't.
//
// Instead, each C program is responsible for recycling it's own garbage by
// calling the `free` function a release unneeded memory.
//
// `free` function has the following prototype:
//    void free(void *ptr);

// Although the `free` function allow us to reclaim memory that's no longer
// needed. Using it leads to a new problem: *dangling pointers*. The call
// `free(p)` deallocates the memory block that `p` points to, but doesn't change
// `p` itself. If we forget that `p` no longer points to a valid memory block,
// chaos may ensue.

struct Point {
    float x;
    float y;
};

// A linked list consists of a chain of structures (called *nodes*), with each
// node containing a pointer to the next node in the chain.
//
// Accessing a node in a linked list is fast if the node is close to the
// beginning of the list, slow if it's near the end.

struct Node {
    int value;
    struct Node *next;
};

struct LinkedList {
    struct Node *first;
};

struct LinkedList* linked_list_init(void) {
    struct LinkedList *linked_list = 
        (struct LinkedList *)malloc(sizeof(struct LinkedList));
    linked_list->first = NULL;

    // Accessing a member of a structure using a pointer is so common that C
    // provides 

    return linked_list;
}

void linked_list_append(struct LinkedList *list, int new_value) {
    struct Node *new_node = 
        (struct Node *)malloc(sizeof(struct Node));
    new_node->value = new_value;
    new_node->next  = NULL;
    list->first->next = new_node;
    list->first = new_node;
}

int main(void) {
    char *test_allocation = (char *)malloc(10 + 1);

    if (test_allocation == NULL)
        printf("Allocating for `test_allocation` failed.\n");
    else
        printf(
            "Allocating for `test_allocation` succeeded and its address: %p\n",
            &test_allocation
        );

    int *test_malloc_array = (int *)malloc(10 * sizeof(int));
    int *test_calloc_array = (int *)calloc(10,  sizeof(int));
    struct Point *test_calloc_object =
        (struct Point *)calloc(1, sizeof(struct Point));
    printf("Address of test_malloc_array:  %p\n", test_malloc_array);
    printf("Address of test_calloc_array:  %p\n", test_calloc_array);
    printf("Address of test_calloc_object: %p\n", test_calloc_object);

    void *test_free_block1 = malloc(10 * sizeof(int));
    void *test_free_block2 = malloc(10 * sizeof(int));

    printf("Address of test_free_block1: %p\n", test_free_block1);
    printf("Address of test_free_block2: %p\n", test_free_block2);

    free((void *)test_free_block1);
    test_free_block1 = test_free_block2;

    printf("Address of test_free_block1 (after free): %p\n", test_free_block1);
    printf("Address of test_free_block2:(after free): %p\n", test_free_block2);

    // And now the address of them are the same

    return 0;
}
