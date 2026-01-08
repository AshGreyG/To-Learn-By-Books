library IEEE; use IEEE.STD_LOGIC_1164.all;

entity flop is
  port(
    clk: in  STD_LOGIC;
    d:   in  STD_LOGIC_VECTOR(3 downto 0);
    q:   out STD_LOGIC_VECTOR(3 downto 0)
  );
end;

architecture synth of flop is
begin
  process(clk) begin
    if rising_edge(clk) then
      q <= d;
    end if;
  end process;

  -- process(<sensitivity list>) begin
  --   statements;
  -- end process;
  -- 
  -- The statement is executed when any of the variables in the <sensitivity
  -- list> change. Function `rising_edge` checks whether input signal clk is on
  -- the rising edge. An alternative VHDL idiom of a flip-flop is
  --
  -- process(clk) begin
  --   if clk'event and clk = '1' then
  --     q <= d;
  --   end if;
  -- end process;
end;
