// A single 'always/process' statement can be used to describe multiple pieces
// of hardware. On the rising edge of 'clk', 'd' is copied to 'n1'. At the
// same time, 'n1' is copied to 'q'.

module sync (
  input  logic clk,
  input  logic d,
  output logic q
);
  logic n1;

  always_ff @(posedge clk)
    begin
      n1 <= d;
      q  <= n1;
    end

  // Notice that the begin/end construct is necessary because multiple
  // statements appear in the 'always' statement. This is analogous to {} in
  // C or Java. 'if/else' counts as a single statement.
endmodule