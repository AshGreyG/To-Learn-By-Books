#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

// Because it's reverse polish notation so it doesn't need an operation stack,
// when encountering the operations, we only need to get two operands from
// operands stack and compute them.

void print_repeated(char* repeated, int times) {
    for (int i = 0; i < times; ++i) {
        printf("%s", repeated);
    }
    printf("\n");
}

typedef struct StackNode {
    double num;
    struct StackNode *next;
} StackNode;

typedef struct Stack {
    StackNode *top;
} Stack;

Stack* init_stack(void) {
    Stack *stack = (Stack*)malloc(sizeof(Stack));
    stack->top = NULL;
    return stack;
}

bool is_empty(Stack *stack) {
    return stack->top == NULL;
}

void push_num(Stack *stack, double new) {
    StackNode *node = (StackNode*)malloc(sizeof(StackNode));
    node->next = stack->top;
    node->num = new;
    stack->top = node;
}

double pop_num(Stack *stack) {
    if (is_empty(stack)) return 0.0;

    double temp = stack->top->num;
    stack->top = stack->top->next;
    return temp;
}

void print_stack_num(Stack *stack) {
    StackNode *read = stack->top;

    while (read != NULL) {
        printf("%lf ", read->num);
        read = read->next;
    }
    printf("]");
}

void print_stack_state(Stack *num_stack) {
    print_repeated("\n", 0);
    printf("\n");
    printf("→ Number Stack:    ");
    print_stack_num(num_stack);
    print_repeated("\n", 1);
}

bool is_op(char check) {
    return check == '+' ||
        check == '-' ||
        check == '*' ||
        check == '/';
}

double parse_num(char *input, int *index) {
    double num = 0.0, scale = 1.0;
    bool has_met_dot;

    if (
        input[*index] == '-' &&
        (*index == 0 || input[*index - 1] == '(')
    ) {
        (*index)++;
        num = -parse_num(input, index);
        return num;
    }

    while (
        input[*index] != '\0' &&
        (isdigit(input[*index]) || input[*index] == '.')
    ) {
        if (input[*index] == '.') {
            has_met_dot = true;
            (*index)++;
            continue;
        }

        if (has_met_dot) {
            scale *= 0.1;
            num += (input[*index] - '0') * scale;
        } else {
            num = num * 10 + (input[*index] - '0');
        }

        (*index)++;
    }

    return num;
}

double calculate(double a, double b, char op) {
    switch (op) {
        case '+' : return a + b;
        case '-' : return a - b;
        case '*' : return a * b;
        case '/' : 
            if (b == 0.0) {
                printf("[Error] : Division by zero.\n");
                return 0.0;
            }
            return a / b;
        default  : return 0.0;
    }
}

double evaluate_rpn_expression(char expr[]) {
    Stack *num_stack = init_stack();

    int len = strlen(expr);
    int i = 0;

    while (i < len) {
        if (expr[i] == ' ') {
            i++;
            continue;
        }

        if (isdigit(expr[i]) || expr[i] == '.') {
            double num = parse_num(expr, &i);
            push_num(num_stack, num);
            print_stack_state(num_stack);

            // When encountering dot . / minus - or a digit, begin
            // parsing the number and push it to the number stack.
        } else if (is_op(expr[i])) {
            double a = pop_num(num_stack);
            double b = pop_num(num_stack);
            push_num(num_stack, calculate(b, a, expr[i]));
            print_stack_state(num_stack);
        }
        i++;
    }

    double res = pop_num(num_stack);
    if (!is_empty(num_stack)) {
        printf("[Error] : Not enough operators in expressions.\n");
    }
    return res;
}

int main(void) {
    char expression[100];
    while (true) {
        printf("Enter an RPN expression: ");
        scanf("%[^\n]", expression);
        printf("Value of expression: %f\n", evaluate_rpn_expression(expression));

        char input;
        while ((input = getchar()) != '\n');
    }

    return 0;
}
