library IEEE; use IEEE.STD_LOGIC_1164.all;

entity priority_ctk is
  port(
    a: in  STD_LOGIC_VECTOR(3 downto 0);
    y: out STD_LOGIC_VECTOR(3 downto 0)
  );
end;

architecture synth of priority_ctk is
begin
  process(all) begin
    if    a(3) then y <= "1000";
    elsif a(2) then y <= "0100";
    elsif a(1) then y <= "0010";
    elsif a(0) then y <= "0001";
    else            y <= "0000";
    end if;

    -- Unlike SystemVerilog, VHDL supports conditional signal assignment
    -- statements, which are much like 'if' statements but can appear outside
    -- processes. Thus, there is less reason to use processes to describe
    -- combinational logic.
  end process;
end;