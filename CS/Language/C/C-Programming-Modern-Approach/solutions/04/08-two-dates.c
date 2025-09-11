#include <stdio.h>

typedef struct Date {
    unsigned int month;
    unsigned int day;
    unsigned int year;
} Date;

int main(void) {
    Date date1, date2;

    printf("Enter first date (mm/dd/yy): ");
    scanf("%d/%d/%2d", &date1.month, &date1.day, &date1.year);

    printf("Enter second date (mm/dd/yy): ");
    scanf("%d/%d/%2d", &date2.month, &date2.day, &date2.year);

    char string_date1[8], string_date2[8];
    sprintf(string_date1, "%d/%d/%.2d", date1.month, date1.day, date1.year);
    sprintf(string_date2, "%d/%d/%.2d", date2.month, date2.day, date2.year);

    if (date1.year < date2.year)
        printf("%s is earlier than %s", string_date1, string_date2);
    else if (date1.year > date2.year)
        printf("%s is earlier than %s", string_date2, string_date1);
    else if (date1.month < date2.month)
        printf("%s is earlier than %s", string_date1, string_date2);
    else if (date1.month > date2.month)
        printf("%s is earlier than %s", string_date2, string_date1);
    else if (date1.day < date2.day)
        printf("%s is earlier than %s", string_date1, string_date2);
    else if (date1.day > date2.day)
        printf("%s is earlier than %s", string_date2, string_date1);
    else
        printf("%s is the same date with %s", string_date1, string_date2);

    return 0;
}