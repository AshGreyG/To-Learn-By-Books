library IEEE; use IEEE.STD_LOGIC_1164.all;

entity sync is
  port(
    clk: in  STD_LOGIC;
    d:   in  STD_LOGIC;
    q:   out STD_LOGIC
  );
end;

architecture logic of sync is
  signal n1: STD_LOGIC;
begin
  process(clk) begin
    if rising_edge(clk) then
       n1 <= d;
       q  <= n1;
    end if;
  end process;

  -- VHDL naturally uses begin end block so multiple pieces of hardware are
  -- also naturally in VHDL.
end;