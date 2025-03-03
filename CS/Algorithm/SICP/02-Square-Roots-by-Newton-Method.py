# This Python code file is translated from the Scheme code file with
# same name and it's to explain why the 'is-good-enough' function
# doesn't adequate for very small and large numbers.

def self_defined_sqrt(x: float) -> float :
    """
    This function is the self-defined sqrt function, using Newton's
    method. There are a number we guessed, named 'guess' and a number
    we need to apply sqrt function, which is the parameter of this 
    function, 'x'. 

    Args:
        x: The number we need to apply sqrt function.

    Returns:
        The square root of x.
    """

    EPSILON = 0.001

    print("{:<22}  {:<22}  {:<22}  {:<8}".format(
        "guess", 
        "distance", 
        "percent", 
        "epsilon"
    ))

    def _square(x: float) -> float : 
        return x * x

    def _abs(x: float) -> float : 
        if x < 0 :
            return -x
        else :
            return x
    
    def _average(x: float, y: float) -> float :
        return (x + y) / 2

    def _is_good_enough(guess: float, x: float) -> bool :
        return _abs(_square(guess) - x) < EPSILON
    
    def _improve(guess: float, x: float) -> float :
        return _average(guess, x / guess)
    
    def _sqrt_iter(guess: float, x: float) -> float :
        print("{:<22}  {:<22}  {:<22}  {:<8}".format(
            guess, 
            _abs(_square(guess) - x),
            str(_abs(_square(guess) - x) / x * 100) + "%",
            EPSILON
        ))
        if _is_good_enough(guess, x) :
            return guess
        else :
            return _sqrt_iter(_improve(guess, x), x)
    
    return _sqrt_iter(1.0, x)

if __name__ == "__main__" :
    self_defined_sqrt(0.001)