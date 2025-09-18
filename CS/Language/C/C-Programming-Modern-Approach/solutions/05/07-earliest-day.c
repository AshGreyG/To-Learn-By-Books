#include <stdio.h>

typedef struct Date {
    int year;
    int month;
    int day;
} Date;

int main(void) {
    printf("When you enter 0/0/0 the loop will terminate.\n");

    Date earliest = {
        .year = 9999,
        .month = 99,
        .day = 99
    };

    Date temp = {
        .year = -1,
        .month = -1,
        .day = -1
    };

    do {
        printf("Enter a date (mm/dd/yy): ");
        scanf("%d/%d/%d", &temp.month, &temp.day, &temp.year);

        if (
            temp.year == 0 &&
            temp.month == 0 &&
            temp.day == 0
        ) break;

        if (temp.year >= 26) {
            temp.year += 1900;
        } else {
            temp.year += 2000;
        }

        if (
            temp.year < earliest.year ||
            (temp.year == earliest.year && temp.month < earliest.month) ||
            (temp.year == earliest.year && temp.month == earliest.month && temp.day < earliest.day)
        ) {
            earliest.year = temp.year;
            earliest.month = temp.month;
            earliest.day = temp.day;
        }
    } while (1);

    printf(
        "%d/%d/%.2d is the earliest date",
        earliest.month,
        earliest.day,
        earliest.year % 100
    );

    return 0;
}