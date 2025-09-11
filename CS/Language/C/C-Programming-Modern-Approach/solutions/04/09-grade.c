#include <stdio.h>

int main(void) {
    int grade, ten_digit;
    char letter_grade;

    printf("Enter numerical grade: ");
    scanf("%d", &grade);

    if (grade > 100) {
        printf("You entered an illegal numerical grade.");
        return 1;
    }

    ten_digit = grade / 10;

    switch (ten_digit) {
        case 10 :
        case 9 :
            letter_grade = 'A';
            break;
        case 8 :
            letter_grade = 'B';
            break;
        case 7 :
            letter_grade = 'C';
            break;
        case 6 :
            letter_grade = 'D';
            break;
        default :
            letter_grade = 'F';
            break;
    }

    printf("Letter grade: %c", letter_grade);

    return 0;
}