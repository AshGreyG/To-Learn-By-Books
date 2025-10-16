#ifndef LOG_H
#define LOG_H

typedef enum {
    LOG_INFO,
    LOG_WARNING,
    LOG_ERROR
} LogLevel;

void log_init(const char *log_filename);
void log_close(void);
void log_message(LogLevel level, const char *format, ...);

#endif
