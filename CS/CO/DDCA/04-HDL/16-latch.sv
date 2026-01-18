// 'always_latch' is equivalent to 'always @(clk, d)' and is preferred idiom
// for describing a latch in System Verilog. It evaluates whenever 'clk' or 'd'
// changes. If 'clk' is HIGH, 'd' flows through to 'q', so this code describes
// a positive level-sensitive latch. Otherwise 'q' keeps its old value.
// System Verilog can generate a warning if the 'always_latch' block doesn't
// imply a latch.

module latch (
  input  logic       clk,
  input  logic [3:0] d,
  output logic [3:0] q
);
  always_latch
    if (clk) q <= d;
endmodule