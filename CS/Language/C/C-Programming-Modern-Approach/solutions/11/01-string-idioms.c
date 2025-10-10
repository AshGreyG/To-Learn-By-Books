#include <stdio.h>

/*!
 * @param [in] [str] The string that needs to take the length.
 * @return The length of the string.
 * @remark It cannot be used when the array is not initialized. Because the null
 * character `\0` is allocated randomly in the memory.
 */
size_t idiom_strlen(const char *str) {
    size_t length = 0;
    for (const char *p = str; *p != '\0'; ++p)
        length++;

    return length;
}

/*!
 * @param [out] [str1] The copying destination string.
 * @param [in] [str2] The copying source string.
 * @return The pointer to modified destination string.
 * @remark If the destination string doesn't have enough space to copy the source
 * string then this function may raise a SIGSEGV error.
 */
char* idiom_strcpy(char *str1, const char *str2) {
    char *p1 = str1; 
    const char *p2 = str2;

    while (*p2 != '\0') {
        *p1 = *p2;
        p1++;
        p2++;
    }

    return str1;
}

/*!
 * @param [out] [str1] The concatenating destination string.
 * @param [in] [str2] The concatenating source string.
 * @return The pointer to modified destination string.
 * @remark If the destination string doesn't have enough space to contain the
 * source string, then this function may raise SIGSEGV error.
 */
char* idiom_strcat(char *str1, const char *str2) {
    char *p = str1;
    while (*p != '\0') p++;
    while (*str2 != '\0') {
        *p = *str2;
        p++;
        str2++;
    }
    *p = '\0';
    return str1;
}

/*!
 * @param [in] [cmp1] The 1st comparison string.
 * @param [in] [cmp2] The 2nd comparison string.
 * @return If `cmp1` is greater than `cmp2` in dictionary order then the function
 * will return a positive number. If they are equal then the function will
 * return 0. If `cmp1` is less than `cmp2` in dictionary order then the function
 * will return a negative number.
 */
int idiom_strcmp(const char *cmp1, const char *cmp2) {
    int i = 0;
    for (; cmp1[i] == cmp2[i]; ++i) {
        if (cmp1[i] == '\0')
            return 0;
    }
    return cmp1[i] - cmp2[i];
}

int main(void) {
    printf("%d\n", (int)idiom_strlen("This is just a test")); // => 19
    printf("%d\n", (int)idiom_strlen(""));                    // => 0
    printf("%d\n", (int)idiom_strlen("A"));                   // => 1

    char test_idiom_strcpy1[100];
    char test_idiom_strcpy2[] = "This is a test string whose length is greater than 10";

    idiom_strcpy(test_idiom_strcpy1, test_idiom_strcpy2);

    printf(
        "test_idiom_strcpy2: %s\n"
        "test_idiom_strcpy1: %s\n",
        test_idiom_strcpy2,
        test_idiom_strcpy1
    );

    char test_idiom_strcat1[100] = "This is the beginning";
    char test_idiom_strcat2[100] = " append to.";

    idiom_strcat(test_idiom_strcat1, test_idiom_strcat2);

    printf("test_idiom_strcat1: %s\n", test_idiom_strcat1);

    return 0;
}
