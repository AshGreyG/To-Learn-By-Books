#include <stdio.h>

int main(void) {
    // When both of `/`'s operands are integers, the `/` operator truncates the
    // result by dropping the fractional part.

    printf("Both operands are integer: 5 / 2 = %d\n", 5 / 2);           // => 2
    printf("One operand is floating-pont: 5.0 / 2 = %f\n", 5.0 / 2);    // => 2.500000

    // The `%` operator requires integer operands; if either operand is not an
    // integer, the program won't compile.

    // Using 0 as the right operand of either `/` or `%` causes undefined behavior
    // (UB). Describing the result when `/` and `%` are used with negative operands
    // are tricky. They are **implementation-defined behavior** in C89.

    // In many language, assignment is a statement, but in C, assignment is an operator,
    // just like `+`. In other words, the act of assignment produces a result, just
    // as adding two numbers produces a result. The value of an assignment
    //                      <variable> = <expression> 
    // is <variable>.

    // Most C operators don't modify their operands, but some do. We say that these
    // operators have **side effects**, since they do more than just compute a value.

    // Since assignment is an operator, several assignments can be chained together:

    int chain_1, chain_2, chain_3;
    chain_1 = chain_2 = chain_3 = 43;
    printf("The assignment `=` is an operator: %d %d %d\n", chain_1, chain_2, chain_3);

    // Most C operands allow their operands to be variables, constants, or expressions
    // containing other operators. The assignment operator, however, requires an
    // `lvalue` as its left operand.

    // An lvalue represents an object stored in computer memory, not a constant or the
    // result of a computation. Variables are lvalue, expressions like 10 or 2 * i 
    // are not.

    // C also has `rvalue` but we call it as "expression".

    // 10 = chain_1;   // uncomment here [Expression is not assignable]

    // C's **compound assignment** operators allow us to shorten this statement and
    // others like it. Using the `+=` `-=` operators:

    chain_1 -= 2;   // => 41
    chain_2 += 3;   // => 46
    chain_3 *= 2;   // => 86

    // C allows increments and decrements to be shortened even further: using the `++`
    // (increment) and `--` (decrement) operators. These operators can also be tricky,
    // both of them can be used as **prefix operators** and **postfix operators**:

    chain_1--;  // => 40
    --chain_1;  // => 39
    chain_2++;  // => 47
    ++chain_2;  // => 48

    // `++i` means "increment i immediately", while `i++` means "use the old value of i
    // for now, but increment i later". But the C standard doesn't specify a precise
    // time for when the i will be incremented later.

    printf("The value of chain_1 (prefix)   when decrement: %d\n", --chain_1);   // => 38
    printf("The value of chain_1 (prefix)  after decrement: %d\n", chain_1);     // => 38

    printf("The value of chain_1 (postfix)  when decrement: %d\n", chain_1--);   // => 38
    printf("The value of chain_1 (postfix) after decrement: %d\n", chain_1);     // => 37

    // According to the C standard, statements such as `c = (b = a + 2) - (a = 1)` and
    // `j = i * i++` cause *undefined behavior*

    // C has the unusual rule that any expression can be used as a statement. That is, any
    // expression (regardless of its type or what it computes) can be turned into a
    // statement by appending a semicolon.

    chain_1 * chain_1;  // Expression result unused

    // Decrement and increment expression has side effects but a "do-nothing" expression
    // statements may be warned by LSP or compiler.

    return 0;
}
