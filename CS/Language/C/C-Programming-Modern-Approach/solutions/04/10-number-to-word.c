#include <stdio.h>

typedef struct NumericWordMapping {
    int numeric;
    char word[20];
} NumericWordMapping;

const char* units_place_map[9] = {
    "1-one",    "2-two",
    "3-three",  "4-four",
    "5-five",   "6-six",
    "7-seven",  "8-eight",
    "9-nine"
};

const char* tens_place_map[8] = {
    "2-twenty", "3-thirty",
    "4-forty",  "5-fifty",
    "6-sixty",  "7-seventy",
    "8-eighty", "9-ninety"
};

const char* special_words_map[10] = {
    "10-ten",      "11-eleven",
    "12-twelve",   "13-thirteen",
    "14-fourteen", "15-fifteen",
    "16-sixteen",  "17-seventeen",
    "18-eighteen", "19-nineteen"
};

int main(void) {
    NumericWordMapping units_place[9], tens_place[8], special_words[10];

    for (int i = 0; i < 9; ++i) {
        sscanf(
            units_place_map[i], 
            "%d-%s",
            &units_place[i].numeric, 
            units_place[i].word
        );
    }

    for (int i = 0; i < 8; ++i) {
        sscanf(
            tens_place_map[i],
            "%d-%s",
            &tens_place[i].numeric,
            tens_place[i].word
        );
    }

    for (int i = 0; i < 10; ++i) {
        sscanf(
            special_words_map[i],
            "%d-%s",
            &special_words[i].numeric,
            special_words[i].word
        );
    }
    
    int input, tens_digit, units_digit;
    char input_word[20];

    printf("Enter a two-digit number: ");
    scanf("%2d", &input);

    tens_digit = input / 10;
    units_digit = input % 10;

    switch (tens_digit) {
        case 1 :
            sprintf(input_word, "%s", special_words[input - 10].word);
            break;
        default :
            if (units_digit == 0)
                sprintf(input_word, "%s", tens_place[tens_digit - 2].word);
            else
                sprintf(
                    input_word,
                    "%s-%s",
                    tens_place[tens_digit - 2].word,
                    units_place[units_digit - 1].word
                );
            break;
    }

    printf("You entered the number %s", input_word);

    return 0;
}