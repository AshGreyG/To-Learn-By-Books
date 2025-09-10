#include <stdio.h>

#define PI 3.14159265

int main(void) {
    float radius;
    scanf("%f", &radius);
    printf(
        "The volume of a sphere with %f as radius is %f",
        radius,
        4.0f / 3.0f * PI * radius * radius * radius
    );

    return 0;
}