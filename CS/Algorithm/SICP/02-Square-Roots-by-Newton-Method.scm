; We define the square-root function as
;
; $ \sqrt{x} = the y such that y \geq 0 and y^2 = x $
;
; We could use it to recognize whether one number is the square root of
; another. The contrast between function and procedure is a reflection
; of the general distinction between describing properties of things and
; describing how to do things.

; (define (sqrt x)
;   (the y (and (>= y 0)
;               (= (square y) x))))

; The most common way is to use Newton's method of successive approximations,
; which says that whenever we have a guess y for the value of the square 
; root of a number x, we can perform a simple manipulation to get a better
; guess (one closer to the actual square root) by averaging y with x / y
;
;                         y -> (x / y + y) / 2
;
; This square-root algorithm is actually a special case of Newton's method.

; (define (sqrt-iter guess x)
;   (if (is-good-enough guess x)
;       guess
;       (sqrt-iter (improve guess x) x)))

; A guess is improved by averaging it with the quotient of the radicand and
; the old guess.

; (define (improve guess x)
;   (average guess (/ x guess)))

; (define (average x y)
;   (/ (+ x y) 2))

; But what is the 'is-good-enough'? The idea is to improve the answer until it 
; is close enough so that its square differs from the radicand by less than a 
; predetermined tolerance 'epsilon'

; (define (is-good-enough guess x)
;   (< (abs (- (square guess) x)) epsilon))

(define epsilon 0.001)

(define (square x) (* x x))

(define (abs x) (if (< x 0) (- x) x))

(define (average x y) (/ (+ x y) 2))

(define (is-good-enough guess x)
  (< (abs (- (square guess) x)) epsilon))

(define (improve guess x)
  (average guess (/ x guess)))

(define (sqrt-iter guess x)
  (if (is-good-enough guess x)
      guess
      (sqrt-iter (improve guess x) x)))

(sqrt-iter 1.0 2)   ; 1.4142156862745097
(sqrt-iter 1.0 3)   ; 1.7321428571428572
(sqrt-iter 4.0 3)   ; 1.7320520571470122

(define (self-defined-sqrt x) (sqrt-iter 1.0 x))

; Observe that we express our initial guess as 1.0 rather than 1. This would
; not make any difference in many Lisp implementation. Guile, however,
; distinguishes between exact integers and decimal values, and dividing two
; integers produces a rational number rather than a decimal.

; (/ 10 6)      => show 5/3
; (/ 10.0 6.0)  => show 1.6666666666666667

(sqrt-iter 1 2)     ; 577/408
(sqrt-iter 1 3)     ; 97/56
(sqrt-iter 4 3)     ; 679095199777/392075513536

; ---------------- Exercise 1.6 ----------------

(define (new-if predicate then-clause else-clause)
  (cond (predicate then-clause)
        (else else-clause)))

(new-if (= 2 3) 0 5)    ; 5
(new-if (= 1 1) 0 5)    ; 0

; The original 'if' is a special form, it will only evaluate the predicate first, but not 
; evaluate all the clause.

(define (sqrt-iter-new-if-version guess x)
  (new-if (is-good-enough guess x)
          guess
          (sqrt-iter-new-if-version (improve guess x) x)))

; Because we use 'cond' to define 'new-if', each clause will be evaluated
; at the beginning. And as we know, 'sqrt-iter-new-if-version' is a
; recursive function, so it will cause a infinite recursive.

; ----------------------------------------------

; ---------------- Exercise 1.7 ----------------

; Test for very close or small numbers. If (< (abs (- (square guess) x)) epsilon) 
; evaluates 'true' at the first step, we will never calculate the square root of 
; this small number accurately.

(self-defined-sqrt 1.001)   ; 1.0   ; acceptable
(sqrt 1.001)                ; 1.000499875062461 ; 'sqrt' is built-in function

(self-defined-sqrt 0.001)   ; 0.04124542607499115
(sqrt 0.001)                ; 0.03162277660168379

(self-defined-sqrt 0.0001)  ; 0.03230844833048122
(sqrt 0.0001)               ; 0.01

; And this is because when the guess number gets closer and closer to the real
; square root, (abs (- (square guess) x)) is very small, the 'epsilon' is not
; adequate for the very small numbers.

; guess                   distance                percent                 epsilon 
; 1.0                     0.999                   99900.0%                0.001   
; 0.5005                  0.24950024999999992     24950.02499999999%      0.001   
; 0.251249000999001       0.062126060502996       6212.606050299601%      0.001   
; 0.12761455816345907     0.015285475455254875    1528.5475455254875%     0.001   
; 0.06772532736082602     0.0035867199661310497   358.67199661310497%     0.001   
; 0.04124542607499115     0.0007011851721075595   70.11851721075595%      0.001   

; Test for very large numbers.

(self-defined-sqrt 999999999999999999999999999999999999999)

; This result is 3.162277660168379e19, because in real computers, arithmetic
; operations are almost always performed with limited precision.

(define ratio-epsilon 0.005)

(define (better-is-good-enough guess x)
  (< (/ (abs (- (square guess) x)) x) ratio-epsilon))

(define (better-sqrt-iter guess x)
  (if (better-is-good-enough guess x)
      guess
      (better-sqrt-iter (improve guess x) x)))

(define (better-self-defined-sqrt x)
  (better-sqrt-iter 1.0 x))

; Here we use percent epsilon (or ratio epsilon) instead of absolute
; epsilon. Now for the very small numbers, this sqrt function is
; acceptable.

(better-self-defined-sqrt 0.001)    ; 0.031642015868650786
(sqrt 0.001)                        ; 0.03162277660168379

(better-self-defined-sqrt 0.0001)   ; 0.010120218365353947
(sqrt 0.0001)                       ; 0.01

; ----------------------------------------------

; ---------------- Exercise 1.7 ----------------

(define (cube x) (* x x x))

(define (better-is-good-enough-cube-version guess x)
  (< (/ (abs (- (cube guess) x)) x) ratio-epsilon))

(define (improve-cube-root guess x)
  (/ (+ (/ x (square guess)) (* 2 guess)) 3))

(define (better-cube-root-iter guess x)
  (if (better-is-good-enough-cube-version guess x)
      guess
      (better-cube-root-iter (improve-cube-root guess x) x)))

(define (better-self-defined-cube-root x)
  (better-cube-root-iter 1.0 x))

; ----------------------------------------------

; Notice that the definition of 'self-defined-sqrt' is *recursive*, that
; is the procedure is defined in terms of itself. 

; The entire 'self-defined-sqrt' program can be viewed as a cluster of
; procedures that mirrors the decomposition of the problem into sub-problems.
; Each procedure accomplishes an identifiable task that can be used as
; a module in defining other procedures.

(define (square x) (* x x))
(define (square y) (* y y))

; These two procedures should not be distinguishable.
; A formal parameter of a procedure has a very special role in the procedure
; definition, in that it doesn't matter what name the formal parameter has.
; Such a name is called a *bound variable*, and we say that the procedure
; definition *binds* its formal parameters. If a variable is not bound, we
; say that it's *free*. The set of expressions for which a binding defines
; a name is called the *scope* of that name.

; In the 'is-good-enough' above, 'guess' and 'x' are bound variables but '<'',
; '-', 'abs' and 'square' are free. If we renamed 'guess' to 'abs' we would
; have introduced a bug by *capturing* the variable 'abs'. It would have
; changed from free to bound.

; As we can see, these functions are not needed for users:
;   + square
;   + abs
;   + average
;   + better-is-good-enough
;   + improve
;   + better-sqrt-iter
;
; We can define them in the 'better-self-defined-sqrt':

(define (better-self-defined-sqrt x)
  (define ratio-epsilon 0.0005)
  (define (square x) (* x x))
  (define (abs x) (if (< x 0) (- x) x))
  (define (average x y) (/ (+ x y) 2))
  (define (better-is-good-enough guess x)
    (< (/ (abs (- (square guess) x)) x) ratio-epsilon))
  (define (improve guess x)
    (average guess (/ x guess)))
  (define (better-sqrt-iter guess x)
    (if (better-is-good-enough guess x)
        guess
        (better-sqrt-iter (improve guess x) x)))
  (better-sqrt-iter 1.0 x))

; Such nesting of definitions is called *block structure*. We can simplify
; them because here 'x' is a bound variable

(define (better-self-defined-sqrt x)
  (define ratio-epsilon 0.0005)
  (define (square x) (* x x))
  (define (abs x) (if (< x 0) (- x) x))
  (define (average x y) (/ (+ x y) 2))
  
  ; Those functions are same

  (define (better-is-good-enough guess)
    (< (/ abs (- (square guess) x) x) ratio-epsilon))
  (define (improve guess)
    (average guess (/ x guess)))
  (define (better-sqrt-iter guess)
    (if (better-is-good-enough guess)
        guess
        (better-sqrt-iter (improve guess))))
  (better-sqrt-iter 1.0))

; The 'x' gets its value from the argument with which the enclosing procedure
; 'better-self-defined-sqrt' is called. This discipline is called *lexical scoping*