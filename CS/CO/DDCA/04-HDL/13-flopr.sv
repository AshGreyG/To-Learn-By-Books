module flop_resettable_async (
  input  logic       clk,
  input  logic       reset,
  input  logic [3:0] d,
  output logic [3:0] q
);
  // asynchronous reset
  always_ff @(posedge clk, posedge reset)
    if (reset) q <= 4'b0;
    else       q <= d;

  // reset positive edge determines the reset operation, no matter whether
  // clk is positive edge.

  // Multiple signals in an always statement sensitivity list are separated
  // with a comma or the word 'or'.

endmodule

module flop_resettable_sync (
  input  logic       clk,
  input  logic       reset,
  input  logic [3:0] d,
  output logic [3:0] q
);
  // synchronous reset
  always_ff @(posedge clk)
    if (reset) q <= 4'b0;
    else       q <= d;

  // reset operation only happens when clk is positive edge and reset is 
  // true. So its synchronous with the clk positive edge.
endmodule