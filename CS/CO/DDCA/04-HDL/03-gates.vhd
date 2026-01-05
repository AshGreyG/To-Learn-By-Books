library IEEE; use IEEE.STD_LOGIC_1164.all;

entity gates is
  port(
    a, b:               in  STD_LOGIC_VECTOR(3 downto 0);
    y1, y2, y3, y4, y5: out STD_LOGIC_VECTOR(3 downto 0)
  );
end;

architecture synth of gates is
begin
  y1 <= a and b;    -- AND
  y2 <= a or b;     -- OR
  y3 <= a xor b;    -- XOR
  y4 <= a nand b;   -- NAND
  y5 <= a nor b;    -- NOR

  -- out <= in1 op in2 is called a **concurrent signal assignment statement**.
  -- VHDL assignment ends with a semicolon. Whenever the inputs on the right
  -- side of the <= in a concurrent signal assignment statement change, the
  -- output on the left side is re-computed.
end;
