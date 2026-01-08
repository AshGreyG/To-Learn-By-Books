// In System Verilog `always` statements and VHDL `process` statements,
// signals keep their old value until an event in the sensitivity list takes
// place that explicitly causes them to change.
//
// System Veirlog `assign` statements can only be used to describe
// combinational logic.

module flop(
  input  logic       clk,
  input  logic [3:0] d,
  output logic [3:0] q
);

  always_ff @(posedge clk)
    q <= d;

  // A System Verilog `always` statements is written in the form
  //
  // always @(sensitive list)
  //   statements;
  //
  // The <statements> is executed only when the event specified in the
  // <sensitive list> occurs. In this example, the statements is `q <= d`.
  // Hence the flip-flop copies d to q on the positive edge of the clock and
  // otherwise remembers the old state q_prev.
  //
  // <= is called **nonclocking assignment**. Notice <= is used instead of
  // assign in an always statement.
  //
  // always_ff     +->   used for flip-flop
  // always_latch  +->   used for latch
  // always_comb   +->   used for combinational logic

endmodule
