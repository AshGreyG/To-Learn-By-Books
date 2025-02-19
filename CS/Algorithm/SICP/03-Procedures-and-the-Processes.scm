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
; the work is duplicated.