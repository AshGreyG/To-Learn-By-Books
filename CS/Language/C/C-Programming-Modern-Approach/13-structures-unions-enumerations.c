#include <stdio.h>

#define LENGTH(a) (int)(sizeof(a) / sizeof(a[0]))

// The elements of a structure (its *members*, in C parlance) aren't required to
// have the same type and the members of a structure have names

struct {
    int number;
    char *name;
    int on_hand;
} test_anonymous_struct1;

struct {
    int number;
    float weight;
} test_anonymous_struct2 = { 1, 12.08 },
  test_anonymous_struct3 = { .number = 2, .weight = 13.12 };

// The combination of the period and the member name is called a *designator*.

struct {
    int array[10];
} test_compatible_struct1, test_compatible_struct2;

struct StructuredTag {
    int id;
    char *name;
};

typedef struct StructuredType {
    int id;
    char *name;
} StructuredType;

// struct { ... } specifies a type, while `test_anonymous_struct1(2)` are
// variables of that type. The members of a structure are stored in the order
// in which they're declared.

void print_content_structured_tag(struct StructuredTag st) {
    printf(
        "<function print_content_structured_tag called>\n  %d\n  %s\n"
        "  Address of parameter: %p\n",
        st.id,
        st.name,
        &st
    );
}

void print_content_structured_type(StructuredType st) {
    printf(
        "<function print_content_structured_type called>\n  %d\n  %s\n"
        "  Address of parameter: %p\n",
        st.id,
        st.name,
        &st
    );
}

StructuredType return_structured_type(void) {
    StructuredType st = { .id = 0, .name = "undefined" };
    printf(
        "<function return_structured_type called>\n"
        "  Address of returned StructuredType: %p\n",
        &st
    );
    return st;
}

// A *union* consists of one or more members possibly of different types.
// However the compiler allocates only enough space for the largest of the
// members, which overlay each other within this space.

typedef struct CatalogItem {
    int stock_number;
    double price;
    int item_type;

    union {
        struct {
            char title[100];
            char author[30];
            int num_pages;
        } book;

        struct {
            char design[100];
        } mug;

        struct {
            char design[100];
            int colors;
            int sizes;
        } shirt;
    } item;
} CatalogItem;

// In many programs, we'll need variables that have only a small set of
// meaningful values. C provides a special kind of type designed specially for
// variables that have a small number of possible values. An *enumerated type*
// is a type whose values are listed by the programmer.

enum {
    GREEN,
    RED,
    BLUE
} color;

enum UnionNumberType {
    INTEGER,
    DOUBLE
};

// C treats enumeration variables and constants as integers. By default the
// compiler assigns the integers 0, 1, 2, ... to the constants in a particular
// enumeration. We're free to choose different values for enumeration constants
// if we like.

int main(void) {
    test_anonymous_struct1.name = "AshGrey";
    test_anonymous_struct1.number = 1;

    printf(
        "`test_anonymous_struct1` is\n"
        "  number: %d\n"
        "  name: %s\n",
        test_anonymous_struct1.number,
        test_anonymous_struct1.name
    );

    printf(
        "`test_anonymous_struct2` is\n"
        "  number: %d\n"
        "  weight: %f\n",
        test_anonymous_struct2.number,
        test_anonymous_struct2.weight
    );

    printf(
        "`test_anonymous_struct3` is\n"
        "  number: %d\n"
        "  weight: %f\n",
        test_anonymous_struct3.number,
        test_anonymous_struct3.weight
    );

    test_compatible_struct1 = test_compatible_struct2;

    // The `=` operator can be used only with structures of compatible types.
    // Two structures declared at the same time are compatible.

    struct StructuredTag test_structued_tag = { .name = "test", .id = 10233 };

    // After defining a name for structure, we should use `struct <structure-name>`
    // to define the new instance of this structure.
    //
    // After using `typedef` to define the type of a structure, we can drop the
    // `struct` in `struct <structure-name>` but use `<structure-type>` to define
    // the new instance.

    StructuredType test_structured_type = { .name = "Ash", .id = 123 };

    printf("Address of `test_structured_type`: %p\n", &test_structured_type);
    print_content_structured_type(test_structured_type);

    StructuredType test_return_struct = return_structured_type();
    printf("Address of `test_return_struct`: %p\n", &test_return_struct);

    // The address of `test_structured_type` and parameter `st` in function
    // `print_content_structured_type` is different because passing a structure
    // to a function and returning a structure from a function both require
    // making a copy of all members in the structure.
    //
    // To avoid this overhead, we can pass a pointer to a structure instead of
    // passing the structure itself.

    // Compound literals can be also used in structure

    print_content_structured_tag((struct StructuredTag){ .name = "Koka", .id = 182 });

    // A compound literal may fail to provide full initialization in which case
    // any uninitialized members default to zero.

    union {
        int id;
        long newId;
    } user_with_union_id;

    // The members of structure are stored at *different* address in memory,
    // while the members of union are stored at the *same* address

    {
        user_with_union_id.id = 0x1eef;
        printf(
            "Address of field `id` in `user_with_union_id`:    %p\n",
            &user_with_union_id.id
        );
    }
    {
        user_with_union_id.newId = 0xa78bbc41;
        printf(
            "Address of field `newId` in `user_with_union_id`: %p\n",
            &user_with_union_id.newId
        );
    }

    // Thus if we store a value in `user_with_union_id.id` then the value of
    // `user_with_union_id.newId` will be lost. `union` is often used to save
    // space.

    // Union have another important application: creating data structures that
    // contain a mixture of data of different types

    typedef struct {
        enum UnionNumberType kind; // Tag field
    
        union {
            int number_int;
            double number_double;
        } value;
    } Number;

    Number union_number_array[10];

    for (int i = 0; i < LENGTH(union_number_array); ++i) {
        if (i % 2 == 0) {
            union_number_array[i].kind = INTEGER;
            union_number_array[i].value.number_int = i;
        } else {
            union_number_array[i].kind = DOUBLE;
            union_number_array[i].value.number_double = (double)(i * 0.1);
        }
    }
    for (int i = 0; i < LENGTH(union_number_array); ++i) {
        if (union_number_array[i].kind == INTEGER)
            printf("%d ",  union_number_array[i].value.number_int);
        else
            printf("%lf ", union_number_array[i].value.number_double);
    }

    return 0;
}
