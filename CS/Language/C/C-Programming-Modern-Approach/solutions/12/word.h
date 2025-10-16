#ifndef WORD_H
#define WORD_H

// If a source file includes the same header file twice, compilation errors
// may result. This problem is common when header files include other header
// files, so use #define and #ifndef and together is to avoid this problem.
//
// extern int test_variable_header1;
//
// Use `extern` keyword to share variables between different source files.
//
// int test_function_header1(void);

/*!
 * @param [out] [word] Reads the next word from the input and stores it in `word`.
 * Makes word empty if no word could be read because of end-of-file. Truncates
 * the word if its length exceeds `length`.
 */
void read_word(char *word, int length);

#endif
