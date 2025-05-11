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

def volume (a : Nat) (b : Nat) (c : Nat) : Nat :=
  a * b * c

#check (joinStringsWith : String → String → String → String)
#check (joinStringsWith "," : String → String → String)     -- Curry 🔥
#check (volume : Nat → Nat → Nat → Nat)

-- Types are a first-class part of the language, they are also expressions
-- like any other. And this is possible use `Str` as a definition's type

def Str : Type := String
def test_str_type : Str := "This is a Str variable"

-- Lean allows number literals to be **overloaded**, when it makes sense to
-- do so, natural numbers can be used for new types

def NaturalNumber : Type := Nat
-- def test_nat_type : NaturalNumber := 12 -- uncomment here   It's polymorphic 🤔
-- We can provide type declaration to make this correct
def test_nat_type : NaturalNumber := (12 : Nat)
-- Or we can define the new name of `Nat` using `abbrev` instead of `def` allows
-- overloading resolution to replace the defined name with its definition
abbrev ℕ : Type := Nat
def thirtyNine : ℕ := 39

------------------------ 1.4 Structures ----------------------

#check 1.2          -- Float
#check true         -- Bool
#check (0 : Float)  -- Float

-- A Cartesian point is a structure with two `Float` fields `x` and `y`

structure Point where
  x : Float
  y : Float
deriving Repr

-- The final line asks Lean to generate code to display values of type `Point`
-- This code is used by `#eval` to render the result of evaluation for consumption
-- by programmers.

def origin : Point := {
  x := 0.0,
  y := 0.0
}
#eval origin    -- { x := 0.000000 y := 0.000000 }
#eval origin.x  -- 0.000000
#eval origin.y  -- 0.000000

def addPoints (p1 : Point) (p2 : Point) : Point :=
  { x := p1.x + p2.x, y := p1.y + p2.y }

def distance (p1 : Point) (p2 : Point) : Float :=
  Float.sqrt (((p1.x - p2.x) ^ 2.0) + ((p1.y - p2.y) ^ 2.0))

#eval addPoints { x := 1.0, y := 3.0 } { x := 0.0, y := 1.0 }   -- { x := 1.000000, y := 4.000000}
#eval distance { x := 1.0, y := 3.0 } { x := 0.0, y := 1.0 }    -- 2.232068

structure Point3D where
  x : Float
  y : Float
deriving Repr
