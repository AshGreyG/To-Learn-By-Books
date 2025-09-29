#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <ctype.h>
#include <string.h>

void print_repeated(char* repeated, int times) {
    for (int i = 0; i < times; ++i) {
        printf("%s", repeated);
    }
    printf("\n");
}

typedef struct StackNode {
    union {
        char op;
        double num;
    } data;
    struct StackNode *next;
} StackNode;

typedef struct Stack {
    StackNode *top;
} Stack;

Stack* init_stack() {
    Stack *stack = (Stack*)malloc(sizeof(Stack));
    stack->top = NULL;
    return stack;
}

bool is_empty(Stack *stack) {
    return stack->top == NULL;
}

void push_op(Stack *stack, char op) {
    StackNode *new_node = (StackNode*)malloc(sizeof(StackNode));
    new_node->data.op = op;
    new_node->next = stack->top;
    stack->top = new_node;
}

void push_num(Stack *stack, double num) {
    StackNode *new_node = (StackNode*)malloc(sizeof(StackNode));
    new_node->data.num = num;
    new_node->next = stack->top;
    stack->top = new_node;
}

char pop_op(Stack *stack) {
    if (is_empty(stack)) return EOF;

    StackNode *temp = stack->top;
    char temp_data = temp->data.op;
    stack->top = stack->top->next;

    free(temp);
    temp = NULL;

    return temp_data;
}

double pop_num(Stack *stack) {
    if (is_empty(stack)) return 0.0;

    StackNode *temp = stack->top;
    double temp_data = temp->data.num;
    stack->top = stack->top->next;

    free(temp);
    temp = NULL;

    return temp_data;
}

void print_stack_op(Stack *stack) {
    StackNode *read = stack->top;

    while (read != NULL) {
        printf("%c ", read->data.op);
        read = read->next;
    }
    printf("]");
}

void print_stack_num(Stack *stack) {
    StackNode *read = stack->top;

    while (read != NULL) {
        printf("%lf ", read->data.num);
        read = read->next;
    }
    printf("]");
}

void clear(Stack *stack) {
    stack->top = NULL;
}

char getchar_stacktop(Stack *stack) {
    return is_empty(stack) ? EOF : stack->top->data.op;
}

bool is_op(char check) {
    return check == '+' ||
        check == '-' ||
        check == '*' ||
        check == '/' ||
        check == '(' ||
        check == ')';
}

int get_priority(char op) {
    switch (op) {
        case '(' :
            return 0;
        case '+' :
        case '-' :
            return 1;
        case '*' :
        case '/' :
            return 2;
        default :
            return -1;
    }
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

void print_stack_state(Stack *op_stack, Stack *num_stack) {
    print_repeated("\n", 0);
    printf("→ Operation Stack: ");
    print_stack_op(op_stack);
    printf("\n");
    printf("→ Number Stack:    ");
    print_stack_num(num_stack);
    print_repeated("\n", 1);
}

double calculate_expression(char *expr) {
    Stack *op_stack = init_stack();
    Stack *num_stack = init_stack();

    int i = 0;
    int len = strlen(expr);

    while (i < len) {
        if (expr[i] == ' ') {
            i++;
            continue;
        }

        if (isdigit(expr[i]) || expr[i] == '.') {
            double num = parse_num(expr, &i);
            push_num(num_stack, num);

            print_stack_state(op_stack, num_stack);
        } else if (is_op(expr[i])) {
            // Meet operations or ()

            if (expr[i] == '(') {
                push_op(op_stack, expr[i]);
                i++;

                print_stack_state(op_stack, num_stack);
            } else if (expr[i] == ')') {
                while (getchar_stacktop(op_stack) != '(') {
                    if (is_empty(op_stack)) {
                        printf("[Error] : Lack left parenthesis\n");
                        return 0.0;
                    }
                    double b = pop_num(num_stack);
                    double a = pop_num(num_stack);
                    char op = pop_op(op_stack);
                    push_num(num_stack, calculate(a, b, op));

                    print_stack_state(op_stack, num_stack);
                }
                pop_op(op_stack);

                print_stack_state(op_stack, num_stack);
                i++;
            } else {
                while (
                    !is_empty(op_stack) &&
                    get_priority(getchar_stacktop(op_stack)) >= get_priority(expr[i])
                ) {
                    double b = pop_num(num_stack);
                    double a = pop_num(num_stack);
                    char op = pop_op(op_stack);
                    push_num(num_stack, calculate(a, b, op));

                    print_stack_state(op_stack, num_stack);
                }
                push_op(op_stack, expr[i]);

                print_stack_state(op_stack, num_stack);
                i++;
            }
        } else {
            printf("[Error] : Invalid character %c\n", expr[i]);
            return 0.0;
        }
    }

    while (!is_empty(op_stack)) {
        double b = pop_num(num_stack);
        double a = pop_num(num_stack);
        char op = pop_op(op_stack);
        push_num(num_stack, calculate(a, b, op));

        print_stack_state(op_stack, num_stack);
    }

    double res = pop_num(num_stack);

    free(op_stack);
    free(num_stack);

    return res;
}

int main(void) {
    char expression[100];
    printf("Enter an expression: ");
    scanf("%[^\n]", expression);

    double res = calculate_expression(expression);

    printf("Value of expression: %lf", res);

    return 0;
}
