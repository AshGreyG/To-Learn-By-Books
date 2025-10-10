#include <ctype.h>
#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <stdint.h>

#define min(a, b) a > b ? b : a

const unsigned int FILENAME_MAX_LEN = 300;
const unsigned int EXTENSION_MAX_LEN = 10;

void get_filename_extension(const char *filename, char *extension);
bool test_extension(const char *filename, const char *extension);

int main(void) {
    char filename[FILENAME_MAX_LEN];
    char extension[EXTENSION_MAX_LEN];

    printf("Enter the filename: ");
    scanf("%s", filename);
    printf("Enter the extension: ");
    scanf("%s", extension);
    printf(
        "%s", 
        test_extension(filename, extension) 
            ? "The extension is right"
            : "The extension is not right"
    );

    return 0;
}

void get_filename_extension(const char *filename, char *extension) {
    const char *last_dot = filename;
    while (*last_dot != '\0') last_dot++;
    while (*last_dot != '.' && last_dot != filename) last_dot--;

    if (last_dot == filename) {
        extension[0] = '\0';
        return;
    }

    for (const char *p = last_dot + 1; *p != '\0'; ++p) {
        *extension = *p;
    }
}

bool test_extension(const char *filename, const char *extension) {
    char real_extension[EXTENSION_MAX_LEN];
    get_filename_extension(filename, real_extension);

    for (int i = 0; i < (min(strlen(real_extension), strlen(extension))); ++i) {
        if (toupper(real_extension[i]) != toupper(extension[i]))
            return false;
    }
    return true;
}
