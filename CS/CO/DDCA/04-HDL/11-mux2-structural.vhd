library IEEE; use IEEE.STD_LOGIC_1164.all;

entity mux2_structural is
  port(
    d0, d1: in  STD_LOGIC_VECTOR(3 downto 0);
    s:      in  STD_LOGIC;
    y:      out STD_LOGIC_VECTOR(3 downto 0)
  );
end;

architecture struct of mux2_structural is
  component tristate
    port(
      a:  in  STD_LOGIC_VECTOR(3 downto 0);
      en: in  STD_LOGIC;
      y:  out STD_LOGIC_VECTOR(3 downto 0)
    );
  end component;

  -- In VHDL, expressions like `not s` is not permitted in the port map for an
  -- instance. Thus `sbar` must be defined as a separate signal.
  signal sbar: STD_LOGIC;
begin

  sbar <= not s;
  t0: tristate port map(d0, sbar, y);
  t1: tristate port map(d1, s,    y);
end;
