-- In VHDL, STD_LOGIC numbers are written in binary and enclosed in single
-- quotes '0' and '1' indicate logic 0 and 1. The format for declaring 
-- STD_LOGIC_VECTOR constants is NB"value", where N is the size in bits and B
-- is a letter indicating the base, value gives value.
--
-- VHDL provides B for binary, O for octal, D for decimal, and X for hexadecimal
-- If the base is omitted, it's default to binary, if the size is not specified
-- the number is assumed to have a size matching the number of bits specified
-- in the value. VHDL does not pad 0 to the left.

library IEEE; use IEEE.STD_LOGIC_1164.all;

entity tristate is
  port(
    a:  in  STD_LOGIC_VECTOR(3 downto 0);
    en: in  STD_LOGIC;
    y:  out STD_LOGIC_VECTOR(3 downto 0)
  );
end;

architecture synth of tristate is
begin
  y <= a when en else "ZZZZ";

  -- VHDL STD_LOGIC signals are 0, 1, z, x and u. Uninitialized inputs cause
  -- uninitialized outputs, displayed as 'u' in VHDL.

  -- Seeing x or u values in simulation is almost always an indication of a
  -- bug or bad coding practice.
end;
