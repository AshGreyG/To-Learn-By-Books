#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct StackNode {
    char content;
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

void push(Stack *stack, char new_content) {
    StackNode *node = (StackNode*)malloc(sizeof(StackNode));
    node->content = new_content;
    node->next = stack->top;
    stack->top = node;
}

char pop(Stack *stack) {
    char temp = stack->top->content;
    stack->top = stack->top->next;
    return temp;
}

char get_top(Stack *stack) {
    return stack->top->content;
}

int main(void) {
    Stack *parentheses = init_stack();
    char input;
    bool valid = true;

    printf("Enter the parentheses and/or braces: ");
    while ((input = getchar()) != '\n') {
        switch (input) {
            case '(' : case '[' : case '{' :
                push(parentheses, input);
                break;
            case ')' : case ']' : case '}' :
                if (
                    get_top(parentheses) == '(' && input == ')' ||
                    get_top(parentheses) == '[' && input == ']' ||
                    get_top(parentheses) == '{' && input == '}'
                ) {
                    (void) pop(parentheses);
                } else {
                    valid = false;
                }
        }
    }

    printf("Parentheses/braces are %snested properly", valid ? "" : "not ");
    return 0;
}
