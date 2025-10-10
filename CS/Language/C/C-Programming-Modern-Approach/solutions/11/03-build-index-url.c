#include <stdio.h>
#include <string.h>

const char PREFIX[] = "http://www.";
const char SUFFIX[] = "/index.html";
const unsigned int DOMAIN_MAX_LENGTH = 80;
const unsigned int RESULT_MAX_LENGTH = 104;

void build_index_url(const char *domain, char *result);

int main(void) {
    char domain[DOMAIN_MAX_LENGTH];
    char result[RESULT_MAX_LENGTH];
    printf("Enter the domain: ");
    scanf("%s", domain);
    build_index_url(domain, result);
    printf("%s", result);

    return 0;
}

void build_index_url(const char *domain, char *result) {
    strcat(result, PREFIX);
    strcat(result, domain);
    strcat(result, SUFFIX);
}
