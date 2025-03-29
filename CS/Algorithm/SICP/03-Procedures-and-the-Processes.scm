; There are many ways to compute factorials:
;       $ n! = n \times (n-1)! $
; This is a linear recursive process

(define (factorial n)
  (if (= n 1)
      1
      (* n (factorial(- n 1)))))

; The substitution model reveals a shape of expansion followed by
; contraction. The expansion occurs as the process builds up a
; chain of *deferred operations*, which is called *recursive
; process*. The length of the chain of deferred multiplications
; and hence the amount of information needed to keep track of it,j
; grows linearly with n. And it's called *linear recursive process*

(factorial 6)
(* 6 (factorial 5))
(* 6 (* 5 (factorial 4)))
(* 6 (* 5 (* 4 (factorial 3))))
(* 6 (* 5 (* 4 (* 3 (factorial 2)))))
(* 6 (* 5 (* 4 (* 3 (* 2 (factorial 1)))))) ; -> 6 steps
(* 6 (* 5 (* 4 (* 3 (* 2 1)))))
(* 6 (* 5 (* 4 (* 3 2))))
(* 6 (* 5 (* 4 6)))
(* 6 (* 5 24))
(* 6 120)
720

; We can also consider this process as first multiplying 1 by 2,
; then multiplying the result by 3, ... so on until n
;   product <- counter * product
;   counter <- counter + 1

(define (factorial n)
  (define (factorial-iter product counter max-count)
    (if (> counter max-count)
        product
        (factorial-iter (* counter product)
                        (+ counter 1)
                        max-count)))
  (factorial-iter 1 1 n))

; or we can simplify as

(define (factorial n)
  (define (iter product counter)
    (if (> counter n)
        product
        (iter (* counter product)
              (+ counter + 1))))
  (iter 1 1))

; We call this an *iterative process*. In general, an iterative process
; is one whose stat can be summarized by a fixed number of *state
; variables*, together with a fixed rule. The number of steps required
; grows linearly with n, such as process is called a *linear iterative
; process*.

(factorial 6)
(iter 1 1)
(iter 1 2)
(iter 2 3)
(iter 6 4)
(iter 24 5)
(iter 120 6)
(iter 720 7)
720

;;; It's similar to Python iterator.

; The iterative process is described by a recursive procedure. An 
; implementation with this property is called *tail recursive*. It
; will execute an iterative process in constant procedure.

;;; The main difference between normal recursive and tail recursive
;;; is that normal recursive needs the result of next self-call, so
;;; it will save the information of unsolved operation:
;;;
;;;   + In the recursive version of 'factorial', the unsolved operation
;;;     includes the '*' operation and the accumulated numbers.
;;;   + In the recursive version of 'plus', the unsolved operation
;;;     includes the 'inc' operation.
;;;
;;; So the normal recursive need extra space to store these information,
;;; but the tail recursive has already calculated the needed information:
;;; 
;;;   + In the tail recursive version of 'factorial', 'product' and
;;;     'count' have been calculated.
;;;   + In the tail recursive version of 'plus', 'inc' and 'dec' functions
;;;     don't need to wait for the result of next self-call

; ---------------- Exercise 1.9 ----------------

(define (inc x) (+ x 1))
(define (dec x) (- x 1))

(define (plus-version-1 a b)
  (if (= a 0) b (inc (plus-version-1 (dec a) b))))

(define (plus-version-2 a b)
  (if (= a 0) b (plus-version-2 (dec a) (inc b))))

; For 'plus-version-1'

(+ 4 5)
(inc (+ (dec 4) 5))
(inc (+ 3 5))                           ; -> evaluate
(inc (inc (+ (dec 3) 5)))
(inc (inc (+ 2 5)))                     ; -> evaluate
(inc (inc (inc (+ (dec 2) 5))))
(inc (inc (inc (+ 1 5))))               ; -> evaluate
(inc (inc (inc (inc (+ (dec 1) 5)))))
(inc (inc (inc (inc (+ 0 5)))))
(inc (inc (inc (inc 5))))
(inc (inc (inc 6)))
(inc (inc 7))
(inc 8)
9

; linear recursive

; For 'plus-version-2'

(+ 4 5)
(+ (dec 4) (inc 5))
(+ 3 6)
(+ (dec 3) (inc 6))
(+ 2 7)
(+ (dec 2) (inc 7))
(+ 1 8)
(+ (dec 1) (inc 8))
(+ 0 9)
9

; linear iterative

; ----------------------------------------------

; ---------------- Exercise 1.10 ----------------

(define (A x y)    ; A denotes Ackermann
  (cond ((= y 0) 0)
        ((= x 0) (* 2 y))
        ((= y 1) 2)
        (else (A (- x 1) (A x (- y 1))))))

; Ackermann function:
;
; $ 
;   A(x, y) 
;      = 0                      if y = 0
;      = 2y                     if x = 0
;      = 2                      if y = 1
;      = A(x - 1, A(x, y - 1))  otherwise
; $

; I will define a pow function using tail recursive:

(define (^ a b)
  (define (power-iter counter product)
    (if (> counter (- b 1))
        product
        (power-iter (+ counter 1)
                    (* product a))))
  (power-iter 1 a))

(A 1 10)
; (A 0 (A 1 9))
; (A 0 (A 0 (A 1 8)))
; (A 0 (A 0 (A 0 (A 1 7))))
; ...
; (A 0 (A 0 ... (A 0 1) ... ))
; (A 0 (A 0 ... (A 0 2) ... ))
; ...
; 1024, A(1, n) = 2 ^ n

(A 2 4)
; (A 1 (A 2 3))
; (A 1 (A 1 (A 2 2)))
; (A 1 (A 1 (A 1 (A 2 1))))
; (A 1 (A 1 (A 1 2)))
; (A 1 (A 1 4))
; (A 1 16)
; 65536
; 
; (A 2 m) will be expanded to
; (A 1 (A 1 (A 1 ... (A 1 2) ... )))
; ^-------------------^
;      Total m - 1
; 2             -> 2 ^ 2             (1 A(1, _))     A(2, 2)
; 2 ^ 2         -> 2 ^ (2 ^ 2)       (2 A(1, _))     A(2, 3)
; 2 ^ (2 ^ 2)   -> 2 ^ (2 ^ (2 ^ 2)) (3 A(1, _))     A(2, 4)

(A 3 3)
; (A 2 (A 3 2))
; (A 2 (A 2 (A 3 1)))
; (A 2 (A 2 2))
; (A 2 4)
; 65536

(define (f n) (A 0 n))  ; f is $ 2n $
(define (g n) (A 1 n))  ; g is $ 2 ^ n $
(define (h n) (A 2 n))  ; h is $ 2 ^ {2 ^ {2 \cdots ^ 2}}, altogether n number of 2 $

; -----------------------------------------------

; Another common pattern of computation is called *tree recursion*. As an
; example, consider computing the sequence of Fibonacci numbers. In general,
; the Fibonacci numbers can be defined by the rule

; $
;   Fib(n) 
;     = 0                        if n = 0
;     = 1                        if n = 1
;     = Fib(n - 1) + Fib(n - 2)  otherwise
; $

(define (fib n)
  (cond ((= n 0) 0)
        ((= n 1) 1)
        (else (+ (fib (- n 1))
                 (fib (- n 2))))))

; Consider the pattern of this computation:
;                                        (fib 5)
;                     (fib 4)                               (fib 3)
;           (fib 3)              (fib 2)              (fib 2)     (fib 1)
;     (fib 2)     (fib 1)  (fib 1)     (fib 0)  (fib 1)      (fib 0)
; (fib 1)  (fib 0)

; This procedure is instructive as a prototypical tree recursion, but it
; is a terrible way to compute Fibonacci numbers because it does so much
; redundant computation. The entire computation of (fib 3) almost half
; the work is duplicated. The number of times the procedure will compute
; (fib 1) or (fib 0) Fib(n + 1) times

; 1. First we know that Fib(2) = Fib(0) + Fib(1), total 2 times of Fib(0)
;    or Fib(1), and Fib(2) = 2. Fib(3) = Fib(2) + Fib(1) = Fib(0) + 2Fib(1),
;    total 3 times. Fib(3) = 3.
; 2. Then we assume that for k >= 2, to calculate Fib(k) we need total 
;    Fib(k + 1) times of Fib(0) or Fib(1) and to calculate Fib(k + 1) we need 
;    Fib(k + 2) times of Fib(0) or Fib(1).
; 3. To calculate Fib(k + 3), Fib(k + 3) = Fib(k + 1) + Fib(k + 2), it needs
;    total Fib(k + 2) + Fib(k + 3) = Fib(k + 4) times of Fib(0) or Fib(1)

; Fib(n) is the closet integer to $ \phi^n / \sqrt{5} $, where
;
; $ \phi = \frac{1 + \sqrt{5}}{2} \approx 1.6180 $
;
; Thus the process uses a number of steps that grows exponentially with the
; input.

; We can also formulate an iterative process for computing the Fibonacci numbers.
; The idea is to use a pair of integers a and b, initialized to Fib(1) = 1 and 
; Fib(0) = 0 , and to repeatedly apply the simultaneous transformations
;
;                 a <- a + b
;                 b <- a  (notice now a hasn't changed yet)

(define (better-fib n)
  (define (fib-iter a b count)
    (if (= count 0)
        b
        (fib-iter (+ a b) a (- count 1))))
  (fib-iter 1 0 n))

; Exercise: Counting change

; The number of ways to change amount $a$ using $n$ kinds of coins equals
;   + The number of ways to change amount $a$ using all but first kind, plus
;   + The number of ways to change amount $a-d$ using all n kinds of
;     coins, where $d$ is the denomination of the first kind of coin

; This is because the ways to make change can be divided into two groups: those
; that do not use any of the first kind of coin, and those that do. And latter
; equals we must use at least one first coin, so ways of $a$ = ways of $a-d$

; Thus we can recursively reduce the problem of changing a given amount to the
; problem of changing smaller amounts using fewer kinds of coins.

; If $a = 0$, we should count that as $1$ way to make change.
; If $a < 0$, we should count that as $0$ ways to make change.
; If $n = 0$, we should count that as $0$ ways to make change.

(define (count-change amount)
  (define (first-denomination kinds-of-coins)
    (cond ((= kinds-of-coins 1) 1)
          ((= kinds-of-coins 2) 5)
          ((= kinds-of-coins 3) 10)
          ((= kinds-of-coins 4) 25)
          ((= kinds-of-coins 5) 50)))

  ; These are different denominations of different coins

  (define (count-change-iter amount kinds-of-coins)
    (cond ((= amount 0) 1)
          ((or (< amount 0) (= kinds-of-coins 0)) 0)
          (else (+ (count-change-iter amount (- kinds-of-coins 1))
                   (count-change-iter (- amount
                                         (first-denomination kinds-of-coins))
                                      kinds-of-coins)))))
  (count-change-iter amount 5))

; 'count-change-iter' function generates a tree-recursive process with
; redundancies similar to those in out first implementation of 'fib'. On the
; other hand, it is not obvious how to design a better algorithm for computing
; the result.

; ---------------- Exercise 1.11 ----------------

(define (recursive-f n) 
  (cond ((< n 3) n)
        (else (+ (recursive-f (- n 1))
                 (* 2 (recursive-f (- n 2)))
                 (* 3 (recursive-f (- n 3)))))))

; a, b, c initialized with f(0) = 0, f(1) = 1, f(2) = 2

(define (iterative-f n)
  (define (iter a b c count)
    (if (= count 0)
        a
        (iter b c (+ (* 3 a) (* 2 b) c) (- count 1))))
  (iter 0 1 2 n))

; -----------------------------------------------

; ---------------- Exercise 1.12 ----------------

; In effect, we can have the formula as below:
; 
; $ 
;   Pascal(m, n) 
;     = 1                                           if n = 1 or n = m
;     = Pascal(m - 1, n - 1) + Pascal(m - 1, n) otherwise
; $

(define (pascal m n)
  (if (or (= 1 n) (= m n))
      1
      (+ (pascal (- m 1) (- n 1))
         (pascal (- m 1) n))))

; -----------------------------------------------

; One convenient way to describe this difference is to use the notion
; of *order of growth* to obtain a gross measure of the resource required
; by a process as the inputs become larger.

; Let $n$ be a parameter that measures the size of the problem, and let
; $R(n)$ be the amount of resources the process requires for a problem
; of size $n$. In general there are a number of properties of the problem
; with respect to which it will be describe to analyze a given process.
; Similarly, $R(n)$ might measure the number of internal storage registers
; used, the number of elementary machine operations performed.

; We say that $R(n)$ has order of growth 
;                              $ \Theta(f(n)) $
; written $R(n)=\Theta(f(n))$, if there are positive constants $k_1$ and
; $k_2$ independent of $n$ such that
;                        $ k_1 f(n) <= R(n) <= k_2 f(n) $
; for any sufficiently large value of $n$.

; For the linear recursive process for computing factorial, the steps 
; required for this process grows as $\Theta(n)$. For the iterative
; factorial, the number of steps is still $\Theta(n)$ but the space is
; $\Theta(1)$ - that is, constant. 

; The tree-recursive Fibonacci computation requires $\Theta(\phi^n)$ steps
; and space $\Theta(n)$.

; ---------------- Exercise 1.14 ----------------

(count-change 11)
(count-change-iter 11 5)
  (count-change-iter 11 4)
    (count-change-iter 11 3)
      (count-change-iter 11 2)
        (count-change-iter 11 1)
          (count-change-iter 11 0)
          (count-change-iter 10 1)
            (count-change-iter 10 0)
            (count-change-iter 9 1)
            ...
              (count-change-iter 1 0)
              (count-change-iter 0 1)       ; ✅  11 x 1
        (count-change-iter 6 2)
          (count-change-iter 6 1)
            (count-change-iter 6 0)
            (count-change-iter 5 1)
            ...
              (count-change-iter 1 0)
              (count-change-iter 0 1)       ; ✅  5 + 6 x 1
          (count-change-iter 1 2)
            (count-change-iter 1 1)
              (count-change-iter 1 0)
              (count-change-iter 0 1)       ; ✅  5 x 2 + 1
            (count-change-iter (- 4) 2)
      (count-change-iter 1 3)
        (count-change-iter 1 2)
          (count-change-iter 1 1)
            (count-change-iter 1 0)
            (count-change-iter 0 1)         ; ✅ 10 + 1
          (count-change-iter (- 4) 2)
        (count-change-iter (- 9) 3)
    (count-change-iter (- 14 4))
  (count-change-iter (- 39) 5)

; For a change array [a_1, a_2, ..., a_n] and a count N, the way (denoted 
; as $W$) of changing this count has the following relationship
;
;         $W(N, n) = W(N, n - 1) + W(N - a_n, n)

; -----------------------------------------------

; ---------------- Exercise 1.15 ----------------

(define (cube x) (* x x x))
(define (p x) (- (* 3 x) (* 4 (cube x))))
(define (sine angle)
  (if (not (> (abs angle) 0.1))
      angle
      (p (sine (/ angle 3.0)))))

; a
; 12.15 -> 4.05 -> 1.35 -> 0.45 -> 0.15 -> 0.05
; Totally 5 times

; b
; $ \Theta(a)=log_3(a) $

; -----------------------------------------------

; We would like a procedure that takes as arguments a base $b$ and a
; positive integer exponent $n$ and computes $b^n$. One way to do this is
; via the recursive definition:

; $
;   b^n = b * b^{n - 1}
;   b^0 = 1
; $

(define (exponent b n)
  (if (= n 0)
      1
      (* b (exponent b (- n 1)))))

; This is a linear recursive process, which requires $\Omega(n)$ steps and
; $\Omega(n)$ space. We can readily formulate an equivalent linear iteration:

(define (exponent b n)
  (define (exponent-iter b counter product)
    (if (= counter 0)
        product
        (exponent-iter b
                       (- counter 1)
                       (* b product))))
  (exponent-iter b n 1))

; This version requires $\Omega(n)$ steps and $\Omega(1)$ space.

; We can also take advantage of successive squaring in computing exponential
; in general if we use the rule:

; $
;   b^n = (b^{n / 2})^2   if n is even
;   b^n = b * b^{n - 1}   if n is odd
; $

(define (fast-exponent b n)
  (define (square x) (* x x))
  (cond ((= n 0) 1)
        ((even? n) (square (fast-exponent b (/ n 2))))
        ((odd?  n) (* b (fast-exponent b (- n 1))))))

; Where the predicate to test whether an integer is even is defined in
; terms of the primitive procedure 'remainder' by

(define (even? n) (= (remainder n 2) 0))
(define (odd?  n) (= (remainder n 2) 1))

; The process evolved by 'fast-exponent' grows logarithmically with $n$
; in both space and number of steps. The process has $\Omega{\log n}$
; growth.

; ---------------- Exercise 1.16 ----------------

; Using the observation that (b^{n / 2})^2 = (b^2)^{n / 2}

; $
;   a <- a, b <- b * b, n <- n / 2  if n is even
;     a(b^n) = a(b^2)^{n / 2}
;   a <- ab, b <- b, n <- n - 1     if n is odd
;     a(b^n) = ab(b^{n - 1})
; $

(define (exercise-exponent b n)
  (define (exercise-exponent-iter a b n)
    (cond ((= n 0) a)
          ((even? n) (exercise-exponent-iter 
                       a
                       (* b b)
                       (/ n 2)))
          (else (exercise-exponent-iter
                  (* a b)
                  b
                  (- n 1)))))
  (exercise-exponent-iter 1 b n))

; a                     b                     n         
; 1                     4                     20        
; 1                     16                    10        
; 1                     256                   5         
; 256                   256                   4         
; 256                   65536                 2         
; 256                   4294967296            1         
; 1099511627776         4294967296            0         

; -----------------------------------------------

; ---------------- Exercise 1.17 ----------------

(define (* a b)
  (if (= b 0)
      0
      (+ a (* a (- b 1)))))

; This algorithm takes a number of steps that is linear in 'b'

; Now suppose we include, together with addition, operators 'double', which
; doubles an integer, and 'halve', which divides an (even) integer by 2,
; using these, design a multiplication procedure analogous using a logarithmic
; number of steps.

(define (* a b)
  (define (double x) (+ x x))
  (define (halve  x) (/ x 2))
  (cond ((= b 0) 0)
        ((even? b) (* (double a) (halve b)))
        (else (+ a (* a (- b 1))))))    ; This step still needs recurse

; -----------------------------------------------

; ---------------- Exercise 1.18 ----------------

; We should design a middle state variable to record the states.

; a <- 2 * a, b <- b / 2, c <- c  if b is even
;   a * b = a * (2 * (b / 2)) = (2 * a) * (b / 2)
; a <- a, b <- b - 1, c <- a + c  if b is odd
;   a * b + c = a * (1 + (b - 1)) + c = a * (b - 1) + (a + c)

(define (fast-multiple a b)
  (define (double x) (+ x x))
  (define (halve  x) (/ x 2))
  (define (fast-multiple-iter a b c)
    (cond ((= b 0) c)
          ((even? b) (fast-multiple-iter
                       (double a) 
                       (halve b) 
                       c))
          (else (fast-multiple-iter
                  a 
                  (- b 1)
                  (+ a c)))))
  (fast-multiple-iter a b 0))

; a           b           c         
; 9           9           0         
; 9           8           9         
; 18          4           9         
; 36          2           9         
; 72          1           9         
; 72          0           81        

; -----------------------------------------------

; ---------------- Exercise 1.19 ----------------

(define (fib n)
  (define (fib-iter a b p q count)
    (cond ((= count 0) b)
          ((even? count) 
           (fib-iter a
                     b
                     (+ (* p p) (* q q))
                     (+ (* q q) (* 2 p q))
                     (/ count 2)))
          (else (fib-iter (+ (* b p) (* a q) (* a p))
                          (+ (* b p) (* a q))
                          p
                          q
                          (- count 1)))))
  (fib-iter 1 0 0 1 n))