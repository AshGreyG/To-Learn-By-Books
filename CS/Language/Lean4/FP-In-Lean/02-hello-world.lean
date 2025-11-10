def main : IO Unit := IO.println "Hello, world!"

-- When Lean is invoked with the `--run` option, it invokes the program's
-- `main` definition. `main` should have `IO Unit` type. This means that
-- `main` is not a function, because it doesn't have arrows `→` in its
-- type. Instead of being a function that has side effects, `main` consists
-- of a description of effects to be carried out.

-- IO α is the type of a program that, when executed, will either throw an
-- exception or return a value of type α
