#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

int main(void) {
    int len;
    printf("The number of train you want to enter: ");
    scanf("%d", &len);

    int departure[len], arrival[len];

    for (int i = 0; i < len; ++i) {
        int departure_hour,
            departure_minute,
            arrival_hour,
            arrival_minute;
        printf("Enter %d train's departure time (24-hour format): ", i + 1);
        scanf("%d:%d", &departure_hour, &departure_minute);

        printf("Enter %d train's arrival time (24-hour format):   ", i + 1);
        scanf("%d:%d", &arrival_hour, &arrival_minute);

        departure[i] = departure_hour * 60 + departure_minute;
        arrival[i] = arrival_hour * 60 + arrival_minute;
    }

    int target, target_hour, target_minute;
    printf("Enter your target arrival time: ");
    scanf("%d:%d", &target_hour, &target_minute);

    target = target_hour * 60 + target_minute;

    int min = INT_MAX, index;
    for (int i = 0; i < len; ++i) {
        if (min > abs(arrival[i] - target)) {
            min = abs(arrival[i] - target);
            index = i;
        }
    }
    printf(
        "The closest arrival time train is %d: %2d:%2d - %2d:%2d",
        index,
        departure[index] / 60,
        departure[index] % 60,
        arrival[index] / 60,
        arrival[index] % 60
    );

    return 0;
}