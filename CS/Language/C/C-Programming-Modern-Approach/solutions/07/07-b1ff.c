#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

const int exclamations = 10;

typedef struct Vector {
    char* elements;
    int capacity;
    int size;
} Vector;

Vector* init_vector() {
    Vector *vec = (Vector*)malloc(sizeof(Vector));

    if (vec == NULL) {
        perror("Malloc for vector failed.");
        return NULL;
    }

    vec->capacity = 10;
    vec->size = 0;
    vec->elements = (char*)malloc(vec->capacity * sizeof(char));

    if (vec->elements == NULL) {
        perror("Malloc for vector's elements array failed.");
        return NULL;
    }
    return vec;
}

void expand_capacity(Vector *vec) {
    vec->capacity *= 2;
    char *temp = (char*)realloc(vec->elements, vec->capacity * sizeof(char));

    if (temp == NULL) {
        perror("Realloc for vector's elements array failed.");
        vec->capacity /= 2;
        return;
    }

    vec->elements = temp;
}

void push(Vector *vec, char new) {
    if (vec->size >= vec->capacity) {
        expand_capacity(vec);
    }
    vec->elements[vec->size] = new;
    vec->size++;
}

int main(void) {
    Vector *b1ff_speak = init_vector();

    if (b1ff_speak == NULL) return 1;

    char input;

    printf("Enter message: ");
    while ((input = getchar()) != '\n') {
        switch (input) {
            case 'e' :
            case 'E' :
                push(b1ff_speak, '3');
                break;
            case 'i' :
            case 'I' :
                push(b1ff_speak, '1');
                break;
            case 'A' :
            case 'a' :
                push(b1ff_speak, '4');
                break;
            case 'O' :
            case 'o' :
                push(b1ff_speak, '0');
                break;
            case 'B' :
            case 'b' :
                push(b1ff_speak, '8');
                break;
            case 'S' :
            case 's' :
                push(b1ff_speak, '5');
                break;
            default :
                if (isalpha(input)) {
                    push(b1ff_speak, toupper(input));
                } else {
                    push(b1ff_speak, input);
                }
                break;
        }
    }

    for (int i = 0; i < exclamations; ++i)
        push(b1ff_speak, '!');

    printf("In B1FF-speak: ");
    for (int i = 0; i < b1ff_speak->size; ++i)
        printf("%c", b1ff_speak->elements[i]);

    return 0;
}