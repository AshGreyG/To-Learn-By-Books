#include <stdio.h>

const unsigned int FILENAME_MAX_LEN = 300;
const unsigned int EXTENSION_MAX_LEN = 10;

void get_filename_extension(const char *filename, char *extension);

int main(void) {
    char filename[FILENAME_MAX_LEN];
    char extension[EXTENSION_MAX_LEN];

    printf(
        "Enter the filename (notice it cannot contain space of other"
        "white-spaces): "
    );
    scanf("%s", filename);
    get_filename_extension(filename, extension);

    if (extension[0] == '\0') {
        printf("The entered file name doesn't have an extension.");
    } else {
        printf("The extension of entered file name is '%s'", extension);
    }

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
