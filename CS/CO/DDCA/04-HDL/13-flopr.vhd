library IEEE; use IEEE.STD_LOGIC_1164.all;

entity flop_resettable is
  port(
    clk, reset: in  STD_LOGIC;
    d:          in  STD_LOGIC_VECTOR(3 downto 0);
    q:          out STD_LOGIC_VECTOR(3 downto 0)
  );
end;

architecture asynchronous of flop_resettable is
begin
  process(clk, reset) begin
    -- Multiple signals in process sensitivity lists are the separated with a
    -- comma. The name of these architectures are 'asynchronous' and 'synchronous'
    -- is ignored by VHDL tools but may be helpful to the human reading the code.

    if reset = '1' then
      q <= "0000";
    elsif rising_edge(clk) then
      q <= d;

    -- Notice 'elsif' but not 'elseif'
    end if;
  end process;
end;

architecture synchronous of flop_resettable is
begin
  process(clk) begin
    if rising_edge(clk) then
      if reset then q <= "0000";
      else q <= d;
      end if;
    end if;
  end process;
end;