#include <stdio.h>

int main(void) {
    int days, starting_day;

    printf("Enter number of days in month: ");
    scanf("%d", &days);
    printf("Enter starting day of the week (1=Sun. 7=Sat.): ");
    scanf("%d", &starting_day);

    for (int i = 1; i <= days + starting_day - 1; ++i) {
        if (i < starting_day) {
            printf("  ");
        } else {
            printf("%2d", i - starting_day + 1);
        }
        printf(" ");
        if (i % 7 == 0) {
            printf("\n");
        }
    }

    return 0;
}