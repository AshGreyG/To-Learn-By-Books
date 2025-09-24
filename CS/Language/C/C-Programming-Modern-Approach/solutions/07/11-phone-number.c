#include <stdio.h>
#include <ctype.h>

#define length(a) ((int) (sizeof(a) / sizeof(a[0])))

int main(void) {
    char phone_number[15];
    char input;

    printf("Enter phone number: ");
    scanf("%s", phone_number);

    printf("In numeric form: ");
    for (int i = 0; i < length(phone_number); ++i) {
        if (isalpha(phone_number[i])) {
            phone_number[i] = (phone_number[i] - 'A') / 3 + 2 + '0';
        }
        printf("%c", phone_number[i]);
    }

    return 0;
}