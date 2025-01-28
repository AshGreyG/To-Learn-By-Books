import matplotlib.pyplot as plt

from math import *

def cantor_print(end: int) -> None :
    """
    Print the Cantor's proof to the console and use matplotlib
    to print a SVG image.

    Args:
        end: The end sequence number of Cantor's proof
    """

    count = current_n = current_d = direction = 1

    # 0 is the first rational number in Cantor's proof.
    # direction is the delta-n and delta-d in Cantor's proof

    while True :  # To simulate the do-while
        if gcd(current_n, current_d) == 1 :
            count += 1
            print("{:<{}}: {:^8} / {:^8}".format(
                count, 
                floor(log10(end) + 1),
                current_n, 
                current_d
            ))
            plt.scatter(
                current_n, 
                current_d,
                marker = "o",
                s = 10,        # The size of scatter dots.
                c = "#89c9c8", # The color of scatter dots.
            )
            # current_n / current_d is a irreducible fraction

        if count == end :
            break

        if current_d == 1 and direction == 1 :
            current_n += 1
            direction = -1
        elif current_n == 1 and direction == -1 :
            current_d += 1
            direction = 1
        else :
            current_n += direction
            current_d += direction * (-1)

    plt.axis("square")
    plt.savefig("Cantor.svg", format="svg")


def cantor_Q2N(x: str) -> int | None :
    """
    The one-to-one function used in Cantor's proof, mapping rational
    numbers to integers.

    Args:
        x: A string representation of a rational number, the format 
          should be "numerator/denominator", where numerator and 
          denominator must be positive integer, like "3/4". Spaces
          in the string are allowed, for example. "2  / 5" is also
          a valid input. $cantor_Q2N: QQ+ |-> NN$
    Returns:
        + If the input rational number is an irreducible fraction, 
          it returns the sequence number of the rational number in
          the sequence of rational numbers in Cantor's proof.
        + If the input is a reducible fraction, it returns None, 
          indicating that the rational number is not in this one-
          to-one correspondence sequence.
    """

    parts = x.replace(" ", "").split("/")

    if len(parts) != 2 : return None
    # Input string is not a valid fraction presentation
    try :
        n = int(parts[0])   # n: numerator
        d = int(parts[1])   # d: denominator
    except ValueError :
        # Numerator or denominator is not integer
        return None
    if d == 0 : return None
    # Denominator is 0
    if n == 0 : return 0
    # Numerator is 0, 0 is the first rational number in Cantor's proof
    if n < 0 or d < 0 : return None
    # Numerator or denominator is negative
    if gcd(n, d) != 1 : return None
    # Fraction n/d is a reducible fraction

    count = 0
    current_n = current_d = direction = 1
    # 0 is the first rational number (sequence number 0) in Cantor's proof.
    # direction is the delta-n and delta-d in Cantor's proof

    while True :  # To simulate the do-while
        if gcd(current_n, current_d) == 1 :
            count += 1
            # current_n / current_d is a irreducible fraction

        if current_n == n and current_d == d :
            break

        if current_d == 1 and direction == 1 :
            current_n += 1
            direction = -1
        elif current_n == 1 and direction == -1 :
            current_d += 1
            direction = 1
        else :
            current_n += direction
            current_d += direction * (-1)

    return count

def cantor_N2Q(x: int) -> str :
    """
    The one-to-one function used in Cantor's proof, mapping integers
    to rational numbers.

    Args:
        x: The sequence number of desired rational number in Cantor's
          proof. $cantor_N2Q: NN |-> QQ+$
    """

    count = 0
    current_n = current_d = direction = 1
    # 0 is the first rational number (sequence number 0) in Cantor's proof.
    # direction is the delta-n and delta-d in Cantor's proof

    while True :  # To simulate the do-while
        if gcd(current_n, current_d) == 1 :
            count += 1
            # current_n / current_d is a irreducible fraction

        if count == x :
            return "{}/{}".format(current_n, current_d)

        if current_d == 1 and direction == 1 :
            current_n += 1
            direction = -1
        elif current_n == 1 and direction == -1 :
            current_d += 1
            direction = 1
        else :
            current_n += direction
            current_d += direction * (-1)