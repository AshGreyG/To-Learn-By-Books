#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

struct Time12Hour {
    unsigned int hour;
    unsigned int minute;
    bool am;
};

typedef struct Flight {
    struct Time12Hour departure_time;
    struct Time12Hour arrival_time;
} Flight;

typedef struct MinutesFormFlight {
    int departure_minutes;
    int arrival_minutes;
} MinutesFormFlight;

const char* flights_time_range[8] = {
    "08:00a.m.~10:16a.m.",
    "09:43a.m.~11:52a.m.",
    "11:19a.m.~01:31p.m.",
    "12:47p.m.~03:00p.m.",
    "02:00p.m.~04:08p.m.",
    "03:45p.m.~05:55p.m.",
    "07:00a.m.~09:20p.m.",
    "09:45p.m.~11:58p.m.",
};

int time12hour_to_minutes(struct Time12Hour* time) {
    if (time->am)
        return time->hour * 60 + time->minute;
    else if (time->hour == 12)
        return time->hour * 60 + time->minute;
    else
        return (time->hour + 12) * 60 + time->minute;
}

int main(void) {
    Flight flights[8];
    MinutesFormFlight minutes_form_flights[8];

    for (int i = 0; i < 8; ++i) {
        int  temp_departure_hour,    temp_departure_minute,
             temp_arrival_hour,      temp_arrival_minute;
        char temp_departure_morning, temp_arrival_morning;

        sscanf(
            flights_time_range[i],
            "%2d:%2d%c.m.~%2d:%2d%c.m.",
            &temp_departure_hour,
            &temp_departure_minute,
            &temp_departure_morning,
            &temp_arrival_hour,
            &temp_arrival_minute,
            &temp_arrival_morning
        );

        flights[i].departure_time.hour   = temp_departure_hour;
        flights[i].departure_time.minute = temp_departure_minute;
        flights[i].departure_time.am     = temp_departure_morning == 'a';
        flights[i].arrival_time.hour     = temp_arrival_hour;
        flights[i].arrival_time.minute   = temp_arrival_minute;
        flights[i].arrival_time.am       = temp_arrival_morning == 'a';

        minutes_form_flights[i].departure_minutes
            = time12hour_to_minutes(&flights[i].departure_time);

        minutes_form_flights[i].arrival_minutes
            = time12hour_to_minutes(&flights[i].arrival_time);
    }

    int input_hour, input_minute;
    printf("Enter a 24-hour time: ");
    scanf("%d:%d", &input_hour, &input_minute);

    int minutes_form_input = 60 * input_hour + input_minute;
    int min_distance = 24 * 60;
    int min_distance_index = 0;

    for (int i = 0; i < 8; ++i) {
        if (
            min_distance > abs(minutes_form_input - minutes_form_flights[i].departure_minutes)
        ) {
            min_distance = abs(minutes_form_input - minutes_form_flights[i].departure_minutes);
            min_distance_index = i;
        }
    }

    printf(
        "Closestr departure time is %.2d:%.2d %c.m., arriving at %.2d:%.2d %c.m.",
        flights[min_distance_index].departure_time.hour,
        flights[min_distance_index].departure_time.minute,
        flights[min_distance_index].departure_time.am ? 'a' : 'p',
        flights[min_distance_index].arrival_time.hour,
        flights[min_distance_index].arrival_time.minute,
        flights[min_distance_index].arrival_time.am ? 'a' : 'p'
    );

    return 0;
}