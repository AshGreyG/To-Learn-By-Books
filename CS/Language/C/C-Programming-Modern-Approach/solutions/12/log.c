#include "log.h"

#include <stdarg.h>
#include <stdio.h>
#include <string.h>
#include <time.h>

FILE *log_file = NULL;

void log_init(const char *log_filename) {
    log_file = fopen(log_filename, "a");
    if (!log_file) {
        fprintf(stderr, "ERROR: Cannot open a log file!\n");
    }
}

void log_close(void) {
    if (log_file) fclose(log_file);
}

void log_message(LogLevel level, const char *format, ...) {
    time_t now;
    time(&now);
    char *time_str = ctime(&now);
    time_str[strlen(time_str) - 1] = '\0';

    const char *level_str;

    switch (level) {
        case LOG_INFO     : level_str = "info";     break;
        case LOG_WARNING  : level_str = "warning";  break;
        case LOG_ERROR    : level_str = "error";    break;
    }

    char header[256];
    snprintf(header, sizeof(header), "[%s] [%s] ", time_str, level_str);

    va_list args;

    if (log_file) {
        fprintf(log_file, "%s", header);
        va_start(args, format);
        vfprintf(log_file, format, args);
        va_end(args);
        fprintf(log_file, "\n");
        fflush(log_file);
    }
}
