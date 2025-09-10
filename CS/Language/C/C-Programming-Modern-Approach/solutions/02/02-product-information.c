#include <stdio.h>

int main(void) {
    int item_number;
    float unit_price;
    int date_day, date_month, date_year;

    printf("Enter item number: ");
    scanf("%d", &item_number);
    printf("Enter unit price: ");
    scanf("%f", &unit_price);
    printf("Enter purchase date (mm/dd/yyyy): ");
    scanf("%2d/%2d/%4d", &date_month, &date_day, &date_year);

    printf("Item\tUnit\tPurchase\n");
    printf("\tPrice\tDate\n");
    printf(
        "%d\t$%.2f\t%2d/%2d/%4d",
        item_number,
        unit_price,
        date_month,
        date_day,
        date_year
    );

    // We can use tab and fixed length to output a table.

    return 0;
}