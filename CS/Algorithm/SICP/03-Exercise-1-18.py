# This file is translated from SICP exercise 1.18, it's to find
# why we need a state variable c

import typing as T

def fast_multiple(a: int, b: int) -> int :
    """
    This function is the SICP-1.18 exercise python implementation,
    it's to figure out the function of state variable `c`

    Args:
        a: The factor in expression $a \\times b$
        b: The factor in expression $a \\times b$

    Returns:
        The result of expression $a \\times b$
    """

    print("{:<10}  {:<10}  {:<10}".format("a", "b", "c"))

    double: T.Callable[[int], int] = lambda x : x + x
    halve:  T.Callable[[int], int] = lambda x : x // 2

    def fast_multiple_iter(a: int, b: int, c: int) -> int :
        """
        This function is the inner iterator of function `fast_multiple`
        """

        print("{:<10}  {:<10}  {:<10}".format(a, b, c))
        if b == 0 :
            return c
        elif b % 2 == 0 :
            return fast_multiple_iter(double(a), halve(b), c)
        else :
            return fast_multiple_iter(a, b - 1, a + c)

    return fast_multiple_iter(a, b, 0)

if __name__ == "__main__" :
    print(fast_multiple(9, 9))