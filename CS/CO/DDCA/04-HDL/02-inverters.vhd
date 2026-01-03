library IEEE; use IEEE.STD_LOGIC_1164.all;

entity inv is
  port(
    a: in  STD_LOGIC_VECTOR(3 downto 0);
    y: out STD_LOGIC_VECTOR(3 downto 0)
  );
end;

-- VHDL uses STD_LOGIC_VECTOR to indicate busses of STD_LOGIC.
-- STD_LOGIC_VECTOR(3 downto 0) indicates a 4-bit busses. In VHDL, accessing the
-- logic in busses is to use a(3) rather than a[3], similarly:
--
-- [+] little-endian order: a(n) > a(n - 1) > ... > a(0) => STD_LOGIC_VECTOR(3 downto 0)
-- [+] big-endian order:    a(n) < a(n - 1) < ... < a(0) => STD_LOGIC_VECTOR(0 to 3)

architecture synth of inv is
begin
  y <= not a;
end;
