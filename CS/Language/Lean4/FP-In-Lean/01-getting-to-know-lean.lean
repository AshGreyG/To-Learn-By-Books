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
  z : Float
deriving Repr

#check ({ x := 0.0, y := 0.0} : Point)
#check { x := 0.0, y := 0.0 : Point}

-- To make programs more concise, Lean also allows the structure type annotation inside
-- the curly braces.

def unmaintainableZeroX (p : Point) : Point :=
  { x := 0, y := p.y }

-- If a new field is added to the structure `Point`, then the code like this function
-- should all be updated, causing maintenance difficulties

def zeroX (p : Point) : Point :=
  { p with x := 0 }

-- It's like the spread syntax of JavaScript

-- Every structure has a *constructor*, unlike constructors in languages such as Java
-- or Python, constructors in Lean are not arbitrary code to be run when a datatype
-- is initialized. Instead, constructors simply gather the data to be stored in the
-- newly-allocated data structure. It's not possible to provide a custom constructor
-- that pre-processes data or rejects invalid arguments.

-- By default, the constructor for a structure named `S` is named `S.mk`.
-- Constructors have function types:

#check Point.mk 1.5 2.8
#check (Point.mk : Float → Float → Point)

-- To override a structure's constructor name, write it with two colons at the beginning

structure PointWithOverridden where
  point ::
  x : Float
  y : Float
deriving Repr

#check (PointWithOverridden.point : Float → Float → PointWithOverridden)
#check (PointWithOverridden.x : PointWithOverridden → Float)
#check (PointWithOverridden.y : PointWithOverridden → Float)

#eval Point.x origin  -- 0.000000, it's like `String.append ...`

-- Accessor dot notation is usable with more than just structure fields, it can also
-- be used for functions that take any number of arguments. Accessor notation has
-- the form `TARGET.f ARG1 ARG2 ...`, if `TARGET` has type `T`, then `T.f` is called.
-- `TARGET` becomes its leftmost argument of type `T`

#eval "one string".append " and another"

-- Even though the `Point` argument comes after the function argument, it can be
-- used with dot notation as well

def Point.modifyBoth (f : Float → Float) (p : Point) : Point :=
  { x := f p.x, y := f p.y }

#eval { x := 3.45, y := 9.87 : Point}.modifyBoth Float.floor  -- { x := 3.000000, y := 9.000000}

structure RectangularPrism where
  height : Float
  width : Float
  depth : Float
deriving Repr

def RectangularPrism.volume (rec : RectangularPrism) : Float :=
  rec.height * rec.width * rec.depth

#eval { height := 1.2, width := 1.2, depth := 2.3 : RectangularPrism }.volume -- 3.312000

structure Segment where
  startPoint : Point
  endPoint : Point
deriving Repr

def Segment.length (s : Segment) : Float :=
  distance s.startPoint s.endPoint

------------------------ 1.5 Datatype and Patterns ----------------------

-- Types such as structures that group together a collection of values are called
-- **product types**. Types that allow choices are called **sum types** and can
-- include instances of themselves are called **recursive datatypes**. Recursive
-- sum types are called **inductive datatypes**, because mathematical induction
-- may be used to prove statements about them. Inductive datatypes are consumed
-- through **pattern matching** and **recursive functions**

inductive MyBool where
  | myFalse : MyBool
  | myTrue : MyBool

-- The first line provides the name of the new type `MyBool`, while the remaining
-- lines each describe a constructor. Constructors of inductive datatypes may have
-- multiple constructors. Here there are two constructors: `myFalse` and `myTrue`,
-- and neither takes any arguments.

inductive MyNat where
  | zero : MyNat
  | succ (n : MyNat) : MyNat

-- `zero` represents 0, while `succ` represents the successor of some other number.
-- The `MyNat` mentioned in `succ`'s declaration is the very type `MyNat` that is
-- in the process of being defined. Using this definition, `4` is represented as
--
-- `MyNat.succ (MyNat.succ (MyNat.succ (MyNat.succ MyNat.zero)))`

def isZero (n : Nat) : Bool :=
  match n with
  | Nat.zero => true
  | Nat.succ _ => false

-- The `match` expression is provided the function's argument `n` for destructuring.
-- If `n` was constructed by `Nat.zero`, then the first branch of the pattern match
-- is taken. If `n` was constructed by `Nat.succ`, then the second branch is taken.

#eval isZero 0                    -- true
#eval isZero Nat.zero             -- true
#eval isZero 1                    -- false
#eval isZero (Nat.succ Nat.zero)  -- false

def pred (n : Nat) : Nat :=
  match n with
  | Nat.zero => Nat.zero
  | Nat.succ k => k

#eval pred 0
#eval pred 890

-- Pattern matching can be used with structures as well as with sum types. For instance,
-- a function that extracts the third dimension from a `Point3D` can be written as

def depth (p : Point3D) : Float :=
  match p with
  | { x := _, y := _, z := d } => d

-- Definitions that refer to the name being defined are called **recursive definitions**.
-- Inductive datatypes are allowed to be recursive

def even (n : Nat) : Bool :=
  match n with
  | Nat.zero => true
  | Nat.succ k => not (even k)

#eval even 3    -- false
#eval even 20   -- true

def plus (n : Nat) (k : Nat) : Nat :=
  match k with
  | Nat.zero => n
  | Nat.succ k' => Nat.succ (plus n k')

#eval plus 3 2  -- 5

-- With two middle state variables: $n+k$ applies `Nat.succ` $k$ times to $n$. Similarly,
-- multiplication $n×k$ adds $n$ to itself $k$ times and subtraction $n-k$ takes $n$'s
-- predecessor $k$ times.

def times (n : Nat) (k : Nat) : Nat :=
  match k with
  | Nat.zero => Nat.zero
  | Nat.succ k' => plus n (times n k')

#eval times 3 9 -- 27

def minus (n : Nat) (k : Nat) : Nat :=
  match k with
  | Nat.zero => n
  | Nat.succ k' => pred (minus n k')

#eval minus 3 2 -- 1

------------------------ 1.6 Polymorphism ----------------------

-- Types in Lean can take arguments, the type `List Nat` describes lists of natural
-- numbers, `List String` describes list of strings. That's very similar to `List<Nat>`
-- `List<String>`.

-- In functional programming, the term **polymorphism** typically refers to datatypes
-- and definitions that take types as arguments.

structure TPoint (α : Type) where
  x : α
  y : α
deriving Repr

def natOrigin : TPoint Nat := {
  x := Nat.zero,
  y := Nat.zero
}
def floatOrigin : TPoint Float := {
  x := 0.0,
  y := 0.0
}

-- Definitions may also take types as arguments, which makes them polymorphic.

def replaceX (α : Type) (point : TPoint α) (newX : α) : TPoint α :=
  { point with x := newX }

-- When the types of the arguments `point` and `newX` mention `α`, they are referring
-- to **whichever type was provided as the first argument**.

#check (replaceX)   -- (α : Type) → TPoint α → α → TPoint α
#check replaceX Nat -- TPoint Nat → Nat → TPoint Nat
#eval replaceX Nat natOrigin 5  -- { x := 5, y := 0 }

inductive Sign where
  | pos
  | neg

def returnPosOrNeg (s : Sign) : match s with | Sign.pos => Nat | Sign.neg => Int :=
  match s with
  | Sign.pos => (3 : Nat)
  | Sign.neg => (-3 : Int)

-- Pattern matching can also happen in type level.

#eval returnPosOrNeg Sign.pos -- 3

-- Lean's standard library includes a canonical linked list datatype, called `List`.
-- Lists are written in square brackets. List is an inductive datatype

def primesUnder10 : List Nat := [2, 3, 5, 7]

inductive MyList (α : Type) where
  | nil : MyList α
  | cons : α → MyList α → MyList α

-- The constructor `nil` represents empty lists and the constructor `nil` is used for
-- non-empty lists.
-- The first argument to `cons` is the **head** of the list, and the second one is its
-- **tail**. A list that contains $n$ entries contains $n$ `cons` constructor, the last
-- of which has `nil` as its tail.

def explicitPrimesUnder10 : List Nat :=
  List.cons 2 (List.cons 3 (List.cons 5 (List.cons 7 List.nil)))

def MyList.length (α : Type) (xs : MyList α) : Nat :=
  match xs with
  | MyList.nil => Nat.zero
  | MyList.cons _ ys => Nat.succ (length α ys)

def useMyList : MyList String :=
  MyList.cons "a" (MyList.cons "b" (MyList.cons "c" MyList.nil))

#eval MyList.length String useMyList  -- 3

-- MyList.length String useMyList
-- ===>
-- Nat.succ (MyList.length String (MyList.cons "b" (MyList.cons "c" MyList.nil)))
-- ===>
-- Nat.succ (Nat.succ MyList.length String (MyList.cons "c" MyList.nil)))
-- ===>
-- Nat.succ (Nat.succ (Nat.succ Nat.zero))
-- ===>
-- 3

-- To make it easier to read functions on lists, the bracket notation `[]` can be used
-- to pattern match against `nil`, and an infix `::` can be used in place of `cons`:

def List.readableLength (α : Type) (xs : List α) : Nat :=
  match xs with
  | [] => 0
  | _ :: ys => Nat.succ (readableLength α ys)

-- The type argument is typically uniquely determined by the later values. In most
-- languages, the compiler is perfectly capable of determining type arguments on its
-- own. Arguments can be declared **implicit** by wrapping them in curly braces.

def List.implicitLength {α : Type} (xs : List α) : Nat :=
  match xs with
  | [] => 0
  | _ :: ys => Nat.succ (implicitLength ys)

-- Like Rust, Lean provides a datatype called `Option` that equips some other type
-- with an indicator for missing values. For instance, a nullable `Int` is represented
-- by `Option Int`

inductive MyOption (α : Type) : Type where
  | none : MyOption α
  | some (val : α) : MyOption α

-- `Option (Option Int)` can be constructed with `none`, `some none` or `some (some ...)`.
-- Kotlin treats `T??` as being equivalent to `T?`, but Lean doesn't

def testOptionWrap : Option (Option Nat) := none
-- #check (testOptionWrap : Option Nat) -- uncomment, it matters

def MyList.head? {α : Type} (xs : MyList α) : MyOption α :=
  match xs with
  | MyList.nil => MyOption.none
  | MyList.cons y _ => MyOption.some y

-- A Lean naming convention is to defined operations that might fail in
-- + groups using the suffix `?` for a version that returns an `Option`
-- + `!` for a version that crashes when provided with invalid input
-- + `D` for a version that returns a default value when the operation would otherwise
--   fail.

#eval [].head? (α := Nat) -- none

-- When just use [] to denote an empty List, Lean is unable to fully determine the
-- expression's type. In Lean'output, `?m.XYZ` represents a part of program that
-- could not be inferred. These unknown parts are called **metavariables**. In
-- order to evaluate an expression, Lean needs to be able to find its type.
-- We can explicitly provide a type.

#eval ([] : List Nat).head? -- none

-- The `Prod` structure, short for Product, is a generic way of joining two values
-- together. A `Prod Nat String` contains a `Nat` and a `String`

structure MyProd (α : Type) (β : Type) : Type where
  fst : α
  snd : β

-- In Lean standard library, the type `Prod α β` is typically written as `α × β`
-- mirroring the usual notation for a Cartesian product of sets.

def fivesCartesian : String × Int := {
  fst := "five",
  snd := 5
}

def fivesParentheses : String × Int := ("five", 5)

-- Both notations are right-associative, this means that the following definitions
-- are equivalent:

def sevens1 : String × Int × Nat := ("VII", 7, 4 + 3)
def sevens2 : String × (Int × Nat) := ("VII", (7, 4 + 3))

-- The `Sum` datatype is a generic way of allowing a choice between values of two
-- different types. For instance, a `Sum String Int` is either a `String` or an `Int`

inductive MySum (α : Type) (β : Type) : Type where
  | inl : α → MySum α β
  | inr : β → MySum α β

-- These names are abbreviations for "left injection" and "right injection"
-- The type `Sum α β` is typically written as `α ⊕ β`

def PetName : Type := String ⊕ String

def animals : List PetName := [
  Sum.inl "Spot", Sum.inr "Tiger", Sum.inl "Fifi", Sum.inl "Rex", Sum.inr "Floof"
]

def howManyDogs (pets : List PetName) : Nat :=
  match pets with
  | [] => 0
  | Sum.inl _ :: morePets => howManyDogs morePets + 1
  | Sum.inr _ :: morePets => howManyDogs morePets

#eval howManyDogs animals -- 3

-- `Unit` is a type with just one argumentless constructor, called `unit`. It describes
-- only a single value, which consists of said constructor applied to no arguments

inductive MyUnit : Type where
  | unit : MyUnit

-- All Lean functions have arguments, zero-argument functions in other languages can
-- be represented as functions that take a `Unit` argument. In a return position, the
-- `Unit` type is similar to `void` in languages derived from `C`

-- The `Empty` datatype has no constructors, thus it indicates unreachable code

def MyList.tail? {α : Type} (xs : MyList α) : Option α :=
  match xs with
  | MyList.nil => none
  | MyList.cons x ys =>
    match ys with
    | MyList.nil => x
    | MyList.cons _ _ => tail? ys

#eval useMyList.tail? -- some "c"

def List.findFirst? {α : Type} (xs : List α) (predicate : α → Bool) : Option α :=
  match xs with
  | [] => none
  | x :: ys =>
    match predicate x with
    | true => x
    | false => findFirst? ys predicate

def Prod.switch {α β : Type} (pair : α × β) : β × α :=
  { fst := pair.snd, snd := pair.fst }

#eval { fst := 3, snd := "3" : Nat × String}.switch -- ("3", 3)

def List.myZip {α β : Type} (xs : List α) (ys : List β) : List (α × β) :=
  match xs with
  | [] => []
  | x :: xsRest =>
    match ys with
    | [] => []
    | y :: ysRest => { fst := x, snd := y : α × β } :: myZip xsRest ysRest

#eval [1, 2, 3].myZip ["a", "b", "c"]
#eval [1, 2, 3].myZip ["a", "b"]

def take {α : Type} (n : Nat) (seq : List α) : List α :=
  match n with
  | 0 => []
  | _ =>
    match seq with
    | [] => []
    | x :: rest => x :: take (n - 1) rest

#eval take 2 ["a", "b", "c"]  -- ["a", "b"]
#eval take 2 ["a"]            -- ["a"]

def distributive {α β γ : Type} (a : α × (β ⊕ γ)) : (α × β) ⊕ (α × γ) :=
  match a.snd with
  | Sum.inl x => Sum.inl { fst := a.fst, snd := x : α × β }
  | Sum.inr y => Sum.inr { fst := a.fst, snd := y : α × γ }

def testDistributive : String × (Nat ⊕ Bool) := {
  fst := "This is a test string",
  snd := Sum.inr false
}
#eval distributive testDistributive   -- Sum.inr ("This is a test string", false)
#check distributive testDistributive  -- String × Nat ⊕ String × Bool

def multiplication {α : Type} (a : Bool × α) : α ⊕ α :=
  match a.fst with
  | true  => Sum.inl a.snd
  | false => Sum.inr a.snd

------------------------ 1.7 Additional Conveniences ----------------------

-- Automatic implicit parameters

-- When writing polymorphic functions in Lean, it is typically not necessary to
-- list all the implicit parameters. Instead they can simply mentioned.

def implicitLength (xs : List α) : Nat :=
  match xs with
  | [] => 0
  | _ :: ys => Nat.succ (implicitLength ys)

#eval implicitLength [1, 2, 3]  -- 3

-- Pattern matching definitions

-- When defining functions with `def`, it is quite common to name an argument and
-- then immediately use it with pattern matching. For instance, in `implicitLength`
-- the argument `xs` is used only in `match`. In these situations, the cases of the
-- `match` expression can be written directly

def directPatternMatchLength : List α → Nat
  | [] => 0
  | _ :: ys => Nat.succ (directPatternMatchLength ys)

#eval directPatternMatchLength [1, 2, 3]  -- 3

-- This syntax can be also be used to define functions that take more than one
-- argument. In this case, their patterns are separated by commas. For instance
-- `drop` takes a number $n$ and a list, and returns the list after removing
-- the first $n$ entries

def directPatternMatchDrop : Nat → List α → List α
  | 0, xs => xs
  | _, [] => []
  | Nat.succ n, _ :: xs => directPatternMatchDrop n xs

#eval directPatternMatchDrop 3 [2, 1, 5, 5, 7, 4] -- [5, 7, 4]

-- Local definitions

-- It is often useful to name intermediate steps in a computation. `unzip` is a
-- function that transforms a list of pairs into a pair of lists:

def unzip : List (α × β) → List α × List β
  | [] => ([], [])
  | (x, y) :: xys =>
    (x :: (unzip xys).fst, y :: (unzip xys).snd)

#eval unzip [(1, "a"), (2, "b"), (3, "c")]  -- ([1, 2, 3], ["a", "b", "c"])

-- Unfortunately, this code is slower than it needs to be. Each entry in the list
-- of pairs leads to two recursive calls, which makes this function take
-- exponential time.

-- In lean, the result of the recursive call can be named, and thus saved, using
-- `let`. Local definitions with `let` resemble top-level definitions with `def`
-- it takes a name to be locally defined, arguments if desired, a type signature
-- and then a body following `:=`. After the local definition, the expression
-- in which the local definition is available (called the **body** of the `let`-
-- expression) must be on a new line.

def localUnzip : List (α × β) → List α × List β
  | [] => ([], [])
  | (x, y) :: xys =>
    let unzipped : List α × List β := localUnzip xys
    (x :: unzipped.fst, y :: unzipped.snd)

#eval localUnzip [(1, "a"), (2, "b"), (3, "c")] -- ✅

def localPatternUnzip : List (α × β) → List α × List β
  | [] => ([], [])
  | (x, y) :: xys =>
    let (xs, ys) : List α × List β := localPatternUnzip xys
    (x :: xs, y :: ys)

#eval localPatternUnzip [(1, "a"), (2, "b"), (3, "c")] -- ✅
