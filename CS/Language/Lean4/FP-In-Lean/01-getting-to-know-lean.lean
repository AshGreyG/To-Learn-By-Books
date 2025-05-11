------------------------ 1.1 Evaluating Expressions ----------------------

-- When viewed as a programming language, Lean is a strict pure functional
-- language with dependent types.
--   + Strictness means that the arguments are fully computed before the
--     the function's body begins running;
--   + Purity means that Lean programs cannot have **side effects** such
--     as modifying locations in memory...
--   + Functions are first-class like any other and that the execution
--     model is inspired by the evaluation of mathematical expressions.
--   + **Dependent types** make types into a first-class part of the
--     language, allowing types to contain programs and programs to compute
--     types.

def add1 (n : Nat) : Nat := n + 1

#eval add1 7  -- 8
-- #eval add1 "Test" -- uncomment here, String, expected Nat

-- Evaluation is the process of finding the value of an expression
-- The function of Lean is similar to Lisp

#eval 1 + 2                                               -- 3
#eval 1 + 2 * 5                                           -- 11
#eval String.append "Hello, " "Lean!"                     -- "Hello, Lean!"
#eval String.append "A" (String.append "B" "C")           -- "ABC"
#eval String.append "it is " (if 1 > 2 then "a" else "b") -- "it is b"
#eval if 3 == 3 then "👍" else "👎"                       -- "👍"

------------------------ 1.2 Types ----------------------

-- Every expression must have a type before it can be evaluated

#eval (1 + 2 : Nat)   -- Nat -> Natural numbers (non-negative)
#eval (1 - 2 : Int)   -- Int -> Integer (including negative)
#check (1 - 2 : Int)  -- Without evaluation

------------------------ 1.3 Functions and Definitions ----------------------

-- In Lean, definitions are introduced using the 'def' keyword

def hello_type : String := "Hello"   -- With type notation
def hello_no_type := "Hello"         -- Without type notation

#eval String.append hello_no_type " world"  -- "Hello world"

def maximum (n : Nat) (k : Nat) : Nat :=
  if n < k then
    k
  else n

#eval maximum 1 2   -- 2
#eval maximum 0 9   -- 9

def spaceBetween (before : String) (after : String) : String :=
  String.append before (String.append " " after)

-- A function that accepts a `Nat` and returns a `Bool` has type `Nat → Bool`
-- A function that accepts two `Nat`s and returns a `Nat` has type `Nat → Nat → Nat`

#check (maximum : Nat → Nat → Nat)
#check (spaceBetween : String → String → String)
#check (spaceBetween : String → (String → String))

-- Using a function that returns a function to implement multiple-argument
-- functions is called **currying** after the mathematical Haskell curry

def joinStringsWith (a : String) (b : String) (c : String) : String :=
  String.append (String.append b a) c

#check (joinStringsWith : String → String → String → String)
#check (joinStringsWith "," : String → String → String)     -- Curry 🔥

-- Types are a first-class part of the language, they are also expressions
-- like any other. And this is possible use `Str` as a definition's type

def Str : Type := String

def test_str_type : Str := "This is a Str variable"
