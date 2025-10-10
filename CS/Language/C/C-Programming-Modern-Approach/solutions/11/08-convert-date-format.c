#include <stdio.h>

const char *MONTH_NAME[12] = {
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
};

int main(void) {
    int month, day, year;
    printf("Enter a date (mm/dd/yyyy): ");
    scanf("%d/%d/%4d", &month, &day, &year);

    printf(
        "You entered the date %s %d, %d",
        MONTH_NAME[month - 1],
        day,
        year
    );

    return 0;
}
