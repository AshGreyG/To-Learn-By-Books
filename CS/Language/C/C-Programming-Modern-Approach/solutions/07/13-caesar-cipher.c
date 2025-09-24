#include <stdio.h>

#define MSG_MAX_LEN 300

int main(void) {
    char message[MSG_MAX_LEN] = { 0 };
    int shift;

    printf("Enter message to be encrypted: ");
    scanf("%[^\n]", message);
    printf("Enter shift amount (1-25): ");
    scanf("%d", &shift);

    printf("Encrypted message: ");
    for (int i = 0; i < MSG_MAX_LEN; ++i) {
        if (message[i] >= 'A' && message[i] <= 'Z') {
            printf("%c", (message[i] + shift - 'A') % 26 + 'A');
        } else if (message[i] >= 'a' && message[i] <= 'z') {
            printf("%c", (message[i] + shift - 'a') % 26 + 'a');
        } else {
            printf("%c", message[i]);
        }
    }

    return 0;
}