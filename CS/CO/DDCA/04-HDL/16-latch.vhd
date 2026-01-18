-- VHDL only supports process block (it doesn't distinguish 'always_ff' and
-- 'always_latch' like in System Verilog). We can check if clk is '1' in process
-- block:

library IEEE; use IEEE.STD_LOGIC_1164.all;

entity latch is
  port(
    clk: in  STD_LOGIC;
    d:   in  STD_LOGIC_VECTOR(3 downto 0);
    q:   out STD_LOGIC_VECTOR(3 downto 0)
  );
end;

architecture synth of latch is
begin
  process(clk, d) begin
    if clk = '1' then
      q <= d;
    end if;
  end process;

  -- The sensitive list contains both 'clk' and 'd', so the 'process' evaluates
  -- whenever 'clk' or 'd' changes. If 'clk' is HIGH, 'd' flows through to 'q'.
end;