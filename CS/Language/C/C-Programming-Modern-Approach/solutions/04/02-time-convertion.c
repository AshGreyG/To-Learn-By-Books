#include <stdio.h>

int main(void) {
    int hour, minute;
    printf("Enter a 24-hour time (hh:mm): ");
    scanf("%d:%d", &hour, &minute);

    char result[9];

    if (hour == 24 && minute == 0) {
        sprintf(result, "00:00 AM");
    } else if (hour == 12) {
        sprintf(result, "12:%.2d PM", minute);
    } else if (hour > 12) {
        sprintf(result, "%.2d:%.2d PM", hour - 12, minute);
    } else {
        sprintf(result, "%.2d:%.2d AM", hour, minute);
    }
    
    printf("Equivalent 12-hour time: %s", result);

    return 0;
}