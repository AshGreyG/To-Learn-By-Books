# This file is translated from SICP exercise 1.16, it's to find
# why we need a state variable a

def exercise_exponent(b: int, n: int) -> int :
    """
    This function is the SICP-1.16 exercise python implementation,
    it's to figure out the function of state variable `a`

    Args:
        b: The base of $b^n$
        n: The power of $b^n$

    Returns:
        The result of expression $b^n$
    """

    print("{:<20}  {:<20}  {:<10}".format("a", "b", "n"))

    def exercise_exponent_iter(a: int, b: int, n: int) -> int :
        """
        This function is the inner iterator of function `exercise_exponent`.
        """
        print("{:<20}  {:<20}  {:<10}".format(a, b, n))
        if n == 0 :
            return a
        elif n % 2 == 0 :
            return exercise_exponent_iter(a, b * b, n // 2)
        else :
            return exercise_exponent_iter(a * b, b, n - 1)

    return exercise_exponent_iter(1, b, n)

if __name__ == "__main__" :
    print(exercise_exponent(4, 20))