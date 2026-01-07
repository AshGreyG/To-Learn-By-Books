-- In VHDL, the () aggregate operator is used to concatenate buses. Like
--
--     y <= (c(2 downto 1), d(0), d(0), d(0), c(0), 3B"101");
--
-- y must be a 9-bit STD_LOGIC_VECTOR. Assuming that z is an 8-bit STD_LOGIC_VECTOR
-- z is given the value 10010110 using the following command aggregation
--
--     z <= ("10", 4 => '1', 2 downto 1 => '1', others => '0');
--
-- '1' is placed at 1, 2, 4, 7, or it can be written as
--
--     z <= (7 => '1', 4 => '1', 2 downto 1 => '1', others => '0');

library IEEE; use IEEE.STD_LOGIC_1164.all;

entity delays_example is
  port(
    a, b, c: in  STD_LOGIC;
    y:       out STD_LOGIC
  );
end;

architecture synth of delays_example is
  signal ab, bb, cb, n1, n2, n3: STD_LOGIC;
begin

  ab <= not a after 1 ns;
  bb <= not b after 1 ns;
  cb <= not c after 1 ns;
  n1 <= ab and bb and cb after 2 ns;
  n2 <= a  and bb and cb after 2 ns;
  n3 <= a  and bb and c  after 2 ns;
  y  <= n1 or  n2 or  n3 after 4 ns;

  -- In VHDL, after clause is used to indicate delay. The units are specified
  -- as nanoseconds.

end;
