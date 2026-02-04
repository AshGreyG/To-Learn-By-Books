library IEEE; use IEEE.STD_LOGIC_1164.all;

entity fulladder is
  port(
    a, b, cin: in  STD_LOGIC;
    s, cout:   out STD_LOGIC
  );
end;

architecture synth of fulladder is
begin
  process(all)
    variable p, g: STD_LOGIC;
  begin
    p := a xor b;
    g := a and b;
    s <= p xor cin;
    cout <= g or (p and cin);
  end process;

  -- In this case, 'process(a, b, cin)' would have been equivalent to 'process(
  -- all)'. However, 'process(all)' is better because it avoids common mistakes
  -- of missing signals in the sensitivity list.
  --
  -- This example uses blocking assignments for 'p' and 'g' so that they get
  -- their new values before being used to compute 's' and 'cout' that depend on
  -- them. And they must be declared as 'variable' rather than 'signal'.
end;