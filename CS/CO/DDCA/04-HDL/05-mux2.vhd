library IEEE; use IEEE.STD_LOGIC_1164.all;

-- **Conditional signal assignments** perform different operations, depending
-- on some condition.

entity mux2 is
  port(
    d0, d1: in  STD_LOGIC_VECTOR(3 downto 0);
    s:      in  STD_LOGIC;
    y:      out STD_LOGIC_VECTOR(3 downto 0)
  );
end;

architecture synth of mux2 is
begin
  y <= d1 when s else d0;
  -- Conditional signal assignments in VHDL is more like Python syntax (maybe
  -- extends from Ada) `... if ... else`
  -- Note that prior to the 2008 version of VHDL, one had to write 
  -- `when s = '1'` rather than `when s`.
end;
