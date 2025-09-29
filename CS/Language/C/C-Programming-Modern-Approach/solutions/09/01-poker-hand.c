#include <stdbool.h>
#include <stdio.h>

// + NUM_RANKS: The poker card has ranks '2, 3, 4, 5, 6, 7, 8, 9, t, j, q, k, a'
//              Notice 't' represents for '10'.
// + NUM_SUITS: The logo of one poker card, 'clubs, diamonds, hearts, spades'
// + NUM_CARDS: The number of input cards in one round.

#define NUM_RANKS 13
#define NUM_SUITS 4
#define NUM_CARDS 5

// ⟨straight-flush⟩ : ⟨straight⟩ + ⟨flush⟩
// ⟨four-of-a-kine⟩ : four cards of the same rank
// ⟨full-house⟩     : a ⟨three-of-kind⟩ and a ⟨pair⟩
// ⟨flush⟩          : five cards of the same suit
// ⟨straight⟩       : five cards with consecutive ranks
// ⟨three-of-kind⟩  : three cards of the same rank
// ⟨two-pairs⟩
// ⟨pair⟩           : two cards of the same rank
// ⟨high-card⟩      : any other card

static int  num_of_ranks[NUM_RANKS] = { 0 };
static int  num_of_suits[NUM_SUITS] = { 0 };
static bool is_straight             = false;
static bool is_flush                = false;
static bool is_four_kinds           = false;
static bool is_three_kinds          = false;
static int  pairs_count             = 0;

void read_cards(void);
void check_straight(void);
void check_flush(void);
void check_duplicate(void);
void analyze_hand(void);
void print_result(void);
void clear(void);

int main(void) {
    while (true) {
        read_cards();
        analyze_hand();
        print_result();
        clear();
    }
    return 0;
}

/**
 * @remark: This function reads the cards into the external variables
 * `num_of_ranks` and `num_of_suits`; it also checks for bad cards and duplicate
 * cards.
 */
void read_cards(void) {
    bool exists_card[NUM_RANKS][NUM_SUITS] = {{ false }};
    bool invalid_card = false;
    char input_ch, rank_ch, suit_ch;
    int rank, suit, cards_counter = 0;

    while (cards_counter < NUM_CARDS) {
        invalid_card = false;
        printf("Enter a card: ");

        rank_ch = getchar();
        switch (rank_ch) {
            case '2' :            rank = 0;  break;
            case '3' :            rank = 1;  break;
            case '4' :            rank = 2;  break;
            case '5' :            rank = 3;  break;
            case '6' :            rank = 4;  break;
            case '7' :            rank = 5;  break;
            case '8' :            rank = 6;  break;
            case '9' :            rank = 7;  break;
            case 't' : case 'T' : rank = 8;  break;
            case 'j' : case 'J' : rank = 9;  break;
            case 'q' : case 'Q' : rank = 10; break;
            case 'k' : case 'K' : rank = 11; break;
            case 'a' : case 'A' : rank = 12; break;
            default  : 
                invalid_card = true;
                break;
        }

        suit_ch = getchar();
        switch (suit_ch) {
            case 'c' : case 'C' : suit = 0; break;  // => clubs       ♣️
            case 'd' : case 'D' : suit = 1; break;  // => diamonds    ♦️
            case 'h' : case 'H' : suit = 2; break;  // => hearts      ♥️
            case 's' : case 'S' : suit = 3; break;  // => spades      ♠️
            default  :
                invalid_card = true;
                break;
        }

        while ((input_ch = getchar()) != '\n')
            if (input_ch != ' ') invalid_card = true;

        if (invalid_card)
            printf("Invalid card; ignored.\n");
        else if (exists_card[rank][suit])
            printf("Duplicate card; ignored.\n");
        else {
            num_of_ranks[rank]++;
            num_of_suits[suit]++;
            exists_card[rank][suit] = true;
            cards_counter++;
        }
    }
}

void check_straight(void) {
    int i = 0, consecutive_count = 0;
    while (num_of_ranks[i] == 0) i++;

    for (; i < NUM_RANKS && num_of_ranks[i] != 0; ++i)
        consecutive_count++;

    if (consecutive_count == NUM_CARDS)
        is_straight = true;
}

void check_flush(void) {
    for (int i = 0; i < NUM_SUITS; ++i) {
        if (num_of_suits[i] == NUM_CARDS) {
            is_flush = true;
            return;
        }
    }
}

void check_duplicate(void) {
    for (int i = 0; i < NUM_RANKS; ++i) {
        if (num_of_ranks[i] == 4) is_four_kinds = true;
        if (num_of_ranks[i] == 3) is_three_kinds = true;
        if (num_of_ranks[i] == 2) pairs_count++;
    }
}

void analyze_hand(void) {
    check_straight();
    check_flush();
    check_duplicate();
}

void print_result(void) {
    if      (is_straight && is_flush)            printf("|> Straight flush\n");
    else if (is_four_kinds)                      printf("|> Four of kinds\n");
    else if (is_three_kinds && pairs_count == 1) printf("|> Full house\n");
    else if (is_flush)                           printf("|> Flush\n");
    else if (is_straight)                        printf("|> Straight\n");
    else if (is_three_kinds)                     printf("|> Three of kinds\n");
    else if (pairs_count == 2)                   printf("|> Two pairs\n");
    else if (pairs_count == 1)                   printf("|> Pair\n");
    else                                         printf("|> High card\n");

    printf("\n\n");
}

void clear(void) {
    is_straight     = false;
    is_flush        = false;
    is_four_kinds   = false;
    is_three_kinds  = false;
    pairs_count     = 0;

    for (int i = 0; i < NUM_RANKS; ++i) num_of_ranks[i] = 0;
    for (int i = 0; i < NUM_SUITS; ++i) num_of_suits[i] = 0;
}
