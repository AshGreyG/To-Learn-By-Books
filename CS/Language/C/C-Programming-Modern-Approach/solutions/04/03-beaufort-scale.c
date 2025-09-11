#include <stdio.h>

int main(void) {
    unsigned int speed;
    printf("Enter the speed of Beaufort: ");
    scanf("%u", &speed);

    if (speed < 1) {
        printf("Description: Calm");
    } else if (speed >= 1 && speed <= 3) {
        printf("Description: Light air");
    } else if (speed >= 4 && speed <= 27) {
        printf("Description: Breeze");
    } else if (speed >= 28 && speed <= 47) {
        printf("Description: Gale");
    } else if (speed >= 48 && speed <= 63) {
        printf("Description: Storm");
    } else {
        printf("Description: Hurricane");
    }

    return 0;
}