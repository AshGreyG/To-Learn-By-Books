#include <stdbool.h>
#include <string.h>

// C compilers usually provide some method of specifying the value of a macro
// at the time a program is compiled. This ability makes it easy to change the
// value of a macro without editing any of the program's files.
//
// Most compilers support the -D option, which allows the value of a macro to
// be specified on the command line.
//
// gcc -DDEBUG=1 foo.c   (that's to write `#define DEBUG 1`)

#include "line.h"
#include "word.h"
#include "log.h"

#define MAX_WORD_LENGTH 20

int main(void) {
    log_init("a.log");
    char word[MAX_WORD_LENGTH + 2];
    int word_length;

    clear_line();

    while (true) {
        read_word(word, MAX_WORD_LENGTH + 1);
        word_length = strlen(word);
        log_message(LOG_INFO, "Read word \"%s\"", word);

        if (word_length == 0) {
            flush_line();
            log_close();
            return 0;
        }
        if (word_length > MAX_WORD_LENGTH) word[MAX_WORD_LENGTH] = '*';
        // Notice word[MAX_WORD_LENGTH] = '*' and word[MAX_WORD_LENGTH + 1] = '\0'

        if (word_length + 1 > space_remaining()) {
            write_line();
            clear_line();
        }

        add_word(word);
    }

    log_close();
    return 0;
}
