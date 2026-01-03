library IEEE; use IEEE.STD_LOGIC_1164.all;

-- VHDL code has three parts: the `library` use clause, the `entity` declaration
-- and the `architecture` body.
-- The `entity` clause lists the module name and its inputs and outputs.
-- The `architecture` body defines what the modules do.

entity example_modules is
  port(
    a, b, c: in  STD_LOGIC;
    y:       out STD_LOGIC
  );
end;

-- VHDL signals such as inputs and outputs must have a **type declaration**.
-- Digital signals must be declared to be STD_LOGIC type, and this type is
-- defined in the IEEE.STD_LOGIC_1164 library.

architecture synth of example_modules is
begin
  y <= (not a and not b and not c) or
       (a and not b and not c) or
       (a and not b and c);

  -- VHDL doesn't have a good default order of operations between AND and OR
  -- so Boolean equations must be parenthesized.
end;
