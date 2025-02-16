; *Computational processes* are abstract beings that inhabit computers.
; As they evolve, processes manipulate other abstract things called *data*.
; The evolution of a process is directed by a pattern of rules called a
; *program*.

; In programming, we deal with two kinds of elements: procedures and data.
; Data is stuff that we want to manipulate, and procedures are descriptions
; of the rules for manipulating the data.

486

; If we present Lisp with a number, the interpreter will respond by printing
; 486 (In guile, it will respond $1 = 486, 1 is the index of variable?)

(+ 137 349)     ; equals to 137 + 349,  show 486
(- 1000 334)    ; equals to 1000 - 334, show 666
(* 5 99)        ; equals to 5 * 99,     show 495
(/ 10 5)        ; equals to 10 / 5,     show 2
(+ 2.7 10)      ; equals to 2.7 + 10,   show 12.7

; Expressions formed by delimiting a list of expressions within parentheses
; in order to denote procedure application, are called *combinations*.
; The leftmost element in the list is called *operator*, and other elements
; are called *operands*. The value of a combination is obtained by applying
; the procedure specified by the operator to the *arguments* that are the
; values of the operands.

; The convention of placing the operator to the left of the operands is known
; as *prefix notation*.

(+ 12 35 12 7)          ; equals to 12 + 25 + 12 + 7,   show 75
(* 25 4 12)             ; equals to 25 * 4 * 12,        show 1200
(+ (* 3 5) (- 10 6))    ; equals to (3 * 5) + (10 - 6), show 19

(+ (* 3
      (+ (* 2 4)
         (+ 3 5)))
   (+ (- 10 7))
      6)

; This is a formatting convention known as *pretty-printing*, in which each
; long combination is written so that the operands are aligned vertically.

; The interpreter always operates in the same basic cycle:
; It reads an expression from the terminal, evaluates the expression, and
; prints the result. This mode of operation is often expressed by saying that
; the interpreter runs in a *read-eval-print loop*, or *REPL*.

; A name identifies a *variable* whose *value* is the object.
; In Scheme, we use 'define' to name things:

(define size 2)

; Once the name 'size' has been associated with the number '2', we can refer
; to the value '2' by name 'size'. The possibility of associating values
; with symbols and later retrieving them means that the interpreter must
; maintain some sort of memory that keeps track of the name-object pairs. This
; memory is called the *environment* (more precisely the *global environment*)

size        ; 2
(* 5 size)  ; 10

; In evaluating combinations, the interpreter is itself following a procedure:
;   1. Evaluate the sub-expression of the combination;
;   2. Apply the procedure that is the value of the leftmost sub-expression 
;      (the operator) to the arguments that are the values of the other sub-
;      expressions (the operands).
; The evaluation rule is *recursive* in nature; that is, it includes, as one of
; its steps, the need to invoke the rule itself.

(* (+ 2 (* 4 6))
   (+ 3 5 7))

;           390
; *   26          15
; + 2   24     + 3 5 7
;     * 4 6

; We can use tree representation to show the value of each sub-combination. Each
; combination is represented by a node with branches corresponding to the operator
; and the operands of the combination stemming from them. The percolate values
; upward form of the evaluation rule is an example of a general kind of process
; known as *tree accumulation*.

; 1. The values of numerals are the numbers that they name;
; 2. The values of built-in operators are the machine instruction sequences that
;    carry out the corresponding operations;
; 3. The values of other names are the objects associated with those names in the
;    environment.

; '(define x 3)' is not a combination. Such exceptions to the general evaluation rule
; are called *special forms*.

(define (square x) (* x x))

; We have here a *compound procedure*, which has been given the name *square*. The
; procedure represents the operation of multiplying something by itself.

; The general form of a procedure definition is
; (define (<name> <formal parameters>)
;         <body>)
;
; The <name> is a symbol to be associated with the procedure definition in the
; environment. The <formal parameters> are the names used within the body of 
; the procedure to refer to the corresponding arguments of the procedure.

(square 21)                      ; 441
(square -2)                      ; 4
(define n (square (square 3)))   ; 81

(define (sum-of-squares x y)
  (+ (square x)
     (square y)))

; More generally, the body of the procedure can be a sequence of expressions.

(define (compound-function a)
  (sum-of-squares (+ a 1) (* a 2)))

(compound-function 5)   ; 136

; To evaluate the combination
;   (compound-function 5)              =>
;   (sum-of-squares (+ 5 1) (* 5 2))   =>
;   (sum-of-squares 6 10)              =>
;   (+ (square 6) (square 10))         =>
;   (+ (* 6 6) (* 10 10))              =>
;   (+ 36 100)                         => show 136

; The process we have just described is called the *substitution model* for
; procedure application. The purpose of the substitution is to help us think
; about procedure application, not to provide a description of how the inter-
; preter really works.

; There is another model to evaluate the expression behind:
;   (compound-function 5)                       =>
;   (sum-of-squares (+ 5 1) (* 5 2))            =>
;   (+ (square (+ 5 1)) (square (* 5 2)))       =>
;   (+ (* (+ 5 1) (+ 5 1)) (* (* 5 2) (* 5 2))) =>
;   (+ (* 6 6) (* 10 10))                       =>
;   (+ 36 100)                                  => show 136

; In particular, the evaluations of (+ 5 1) and (* 5 2) are each performed
; twice here, corresponding to the reduction of the expression (* x x) with
; x replaced respectively by (+ 5 1) and (* 5 2).

; This alternative "fully expand and then reduce" evaluation method is known
; as *normal-order evaluation*, in contrast to the "evaluate the arguments and
; then apply" method that the interpreter actually uses, which is called
; *applicative-order evaluation*

(define (abs-version-1 x)
  (cond ((> x 0) x)
        ((= x 0) 0)
        ((< x 0) (- x))))

; The general form of a *conditional expression* is
; (cond (<p_1> <e_1>)
;       (<p_2> <e_2>)
;       ...
;       (<p_n> <e_n>))
; consisting of the symbol 'cond' followed by parenthesized pairs of expressions
; (<p> <e>)
; called *clauses*. The first expression in each pair is a *predicate*, that is an
; expression whose value is interpreted as either 'true' or 'false'.
; The predicate <p_1> is evaluated first. If its value if false, then <p_2> is
; evaluated. If its value if also false, then <p_3> is evaluated...This process
; continues until a predicate is found whose value if true, in which case the
; interpreter returns the value of the corresponding *consequent expression* <e> of
; the clause as the value of the conditional expression. If none of the <p>'s is
; found to be true, the value of the conditional expression is undefined.

(define (abs-version-2 x)
  (cond ((< x 0) (- x))
        (else x)))

; 'else' is a special symbol that can be used in place of the <p> in the final clause
; of a 'cond'.

(define (abs-version-3 x)
  (if (< x 0)
      (- x)
      x))

; This uses the special form 'if', a restricted type of conditional that can be used
; when there are precisely two cases in the case analysis. The general form of an 'if'
; expression is
; (if <predicate> <consequent> <alternative>)

; The three most frequently used logical compositions operations are:
;   1. (and <e_1> ... <e_n>)
;      The interpreter evaluates the expression <e> one at a time, in left-to-right
;      order. If any <e> evaluates to false, the value of the 'and' expression is
;      false, and the rest of the <e>s are not evaluated. If all <e>'s evaluate to
;      true values, the value of the 'and' expression is the value of the last one.
;   2. (or <e_1> ... <e_n>)
;      The interpreter evaluates the expression <e> one at a time, in left-to-right
;      order. If any <e> evaluates to a true value, that value is returned as the
;      value of the 'or' expression. Similar to 'and' expression.
;   3. (not <e>)
;      The value of a 'not' expression is true when the expression <e> evaluates to
;      false, and false otherwise.

; 'and' and 'or' are special forms, not procedures, because the sub-expressions are
; not necessarily all evaluated. 'not' is an ordinary procedure.

(and (> x 5) (< x 10))  ; 5 < x < 10
(define (>= x y) (or (> x y) (= x y)))
(define (<= x y) (not (> x y)))

; ---------------- Exercise 1.1 ----------------

10                      ; 10
(+ 5 3 4)               ; 12
(- 9 1)                 ; 8
(/ 6 2)                 ; 3
(+ (* 2 4) (- 4 6)      ; 6
(define a 3)            ; a = 3
(define b (+ a 1))      ; b = 4
(+ a b (* a b))         ; 19
(= a b)                 ; #f
(if (and (> b a) (< b (* a b)))
    b
    a)                  ; 4

(cond ((= a 4) 6)
      ((= b 4) (+ 6 7 a))
      (else 25))        ; 16

(+ 2 (if (> b a) b a))  ; 6
(* (cond ((> a b) a)
         ((< a b) b)
         (else (- 1)))
   (+ a 1))             ; 16

; ----------------------------------------------

; ---------------- Exercise 1.2 ----------------

(/ (+ 5
      4
      (- 2 
         (- 3
            (+ 6
               (/ 4 5)))))
   (* 3
      (- 6 2)
      (- 2 7)))

; ----------------------------------------------

; ---------------- Exercise 1.3 ----------------

(define (max-of-two x y)
  (cond ((> x y) x)
        (else y)))

(define (min-of-two x y)
  (cond ((< x y) x)
        (else y)))

(define (max-of-three x y z)
  (max-of-two x (max-of-two y z)))

(define (min-of-three x y z)
  (min-of-two x (min-of-two y z)))

(define (mid-of-three x y z)
  (- (+ x y z) 
     (max-of-three x y z) 
     (min-of-three x y z)))

(define (square x) (* x x))

(define (sum-squares-of-two-larger x y z)
  (+ (square (max-of-three x y z))
     (square (mid-of-three x y z))))

; ----------------------------------------------

; ---------------- Exercise 1.4 ----------------

(define (a-plus-abs-b a b)
  ((if (> b 0) + -) a b))

; Our model of evaluation allows for combinations whose operators are
; compound expressions.
; ----------------------------------------------

; ---------------- Exercise 1.5 ----------------

(define (p) (p))     ; This is a infinite-recursive function
(define (test x y)
  (if (= x 0) 0 y))

(test 0 (p))

; If the interpreter uses applicative-order evaluation
;   (test 0 (p))        =>
;   fist evaluate the 0 and (p), but p is a infinite-recursive function, so if
;   the interpreter uses applicative-order evaluation

; If the interpreter uses normal-order evaluation
;   (test 0 (p))        =>
;   (if (= 0 0) 0 (p))  => show 0

; ----------------------------------------------