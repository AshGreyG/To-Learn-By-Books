#include <stdio.h>

// A variable declared in the body of a function is said to be *local*
// to the function. By default, local variables have the following
// properties:
//
// + Automatic storage duration, the storage duration or extent of a variable
//   is the portion of program execution during which storage for the variable
//   exists. Storage for a local variables is automatically allocated when the
//   enclosing function is called and de-allocated when the function returns.
//   So the variable is said to have *automatic storage duration*
//
// + Black scope. The scope of a variable is the portion of the program text
//   in which the variable can be referenced. A local variable has *block
//   scope*: it is visible from its point of declaration to the end of the
//   enclosing function body.

void automatic_storage_duration(void) {
    int a = 1;
    printf("The address of automatic storage variable is %p\n", &a);
    printf("The value   of automatic storage variable is %d\n", a);
    a++;
}

// Putting the keyword `static` in the declaration of a local variable causes
// it to have *static storage duration* instead of automatic storage duration.
// A variable with static storage duration has a permanent storage location,
// so it retains its value throughout the execution of the program

void static_storage_duration(void) {
    static int i = 1;
    // For static storage duration variable, it only has once initializer.
    // Other initializers cannot change the value.

    printf("The address of static storage variable is %p\n", &i);
    printf("The value   of static storage variable is %d\n", i);
    i++;
}

// Parameters have the same properties, automatic storage duration and block
// scope.

// Functions can also communicate through *external variables* - variables that
// are declared outside the body of any function.

// The properties of external variable (or *global variable*) are:
// 
// + Static storage duration.
// + File scope. It is visible from its point of declaration to the end of the
//   enclosing file.

static int external_variable = 1;

// We use *block* to describe such a compound statement : {}. By default, the
// storage of a variable declared in a block is automatic: it's de-allocated
// when the block is exited. And the variable has block scope.

int main(void) {
    automatic_storage_duration(); // 0x7ffedbd17384 1
    automatic_storage_duration(); // 0x7ffedbd17384 1
    static_storage_duration();    // 0x55bf29e48020 1
    static_storage_duration();    // 0x55bf29e48020 2

    printf("The value of external variable is %d", external_variable);

    return 0;
}
