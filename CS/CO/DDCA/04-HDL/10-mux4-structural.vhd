library IEEE; use IEEE.STD_LOGIC_1164.all;

entity mux4_structrual is
  port(
    d0, d1,
    d2, d3: in  STD_LOGIC_VECTOR(3 downto 0);
    s:      in  STD_LOGIC_VECTOR(1 downto 0);
    y:      out STD_LOGIC_VECTOR(3 downto 0)
  );
end;

architecture struct of mux4_structrual is
  component mux2
    port(
      d0, d1: in  STD_LOGIC_VECTOR(3 downto 0);
      s:      in  STD_LOGIC;
      y:      out STD_LOGIC_VECTOR(3 downto 0)
    );
  end component;

  -- component mux2 is an entity, and each copy of them appeared at the
  -- `begin...end` block is **instance**.

  -- The architecture must first declare the mux2 ports using the component
  -- declaration statement. This allows VHDL tools to check that the component
  -- you wish to use has the same ports as the entity that was declared 
  -- somewhere else in another entity statement, preventing errors caused by
  -- changing the entity but not the instance.

  signal low, high: STD_LOGIC_VECTOR(3 downto 0);
begin

  lowmux:   mux2 port map(d0, d1, s(0), low);
  highmux:  mux2 port map(d2, d3, s(0), high);
  finalmux: mux2 port map(low, high, s(1), y);

  -- Note that the name of this `architecture` is `struct`. VHDL allows multiple
  -- architectures (implementations) for the same entity; the different
  -- architectures are distinguished by names. The names themselves are not
  -- important to CAD tools. But `struct` and `synth` are common.

end;
