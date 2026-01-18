-- In VHDL, 'process(all)' reevaluates the statements inside the 'process'
-- whenever any of the signals in the 'process' change.

library IEEE; use IEEE.STD_LOGIC_1164.all;

entity combinational_inv is
  port(
    a: in  STD_LOGIC_VECTOR(3 downto 0);
    y: out STD_LOGIC_VECTOR(3 downto 0)
  );
end;

architecture proc of combinational_inv is
begin
  process(all) begin
    y <= not a;
  end process;
end;