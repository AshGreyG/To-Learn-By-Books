module tristate(
  input  logic [3:0] a,
  input  logic       en,
  output tri   [3:0] y
);

  assign y = en ? a : 4'bzzzz;

endmodule

module mux2_structural(
  input  logic [3:0] d0, d1,
  input  logic       s,
  output tri   [3:0] y
);

  tristate t0(d0, ~s, y);
  tristate t1(d1,  s, y);

  // In System Verilog, expressions like ~s are permitted in the port list for
  // an instance.

endmodule
