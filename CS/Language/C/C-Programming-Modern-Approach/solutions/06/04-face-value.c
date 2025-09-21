#include <stdio.h>
#include <ctype.h>

int rarity(char alphabet) {
    switch (alphabet) {
        case 'A' : case 'E' : case 'I' : case 'L' :
        case 'N' : case 'O' : case 'R' : case 'S' :
        case 'T' : case 'U' :
            return 1;
        case 'D' : case 'G' :
            return 2;
        case 'B' : case 'C' : case 'M' : case 'P' :
            return 3;
        case 'F' : case 'H' : case 'V' : case 'W' :
        case 'Y' :
            return 4;
        case 'K' :
            return 5;
        case 'J' : case 'X' :
            return 8;
        case 'Q' : case 'Z' :
            return 10;
        default :
            return 0;
    }
}

int main(void) {
    printf("Enter a world: ");

    int face_value = 0;
    char input;
    while ((input = getchar()) != '\n') {
        face_value += rarity(toupper(input));
    }

    printf("Scrabble value: %d", face_value);

    return 0;
}