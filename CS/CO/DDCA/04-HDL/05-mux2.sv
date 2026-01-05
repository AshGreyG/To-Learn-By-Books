// The **conditional operator** ?: chooses, based on a first expression,
// between second and third expression. So the first expression is called
// **condition**. If the condition is 1, then choose second expression, if
// the condition is 0, then choose the third expression.

module mux2(
  input  logic [3:0] d0, d1,
  input  logic       s,
  output logic [3:0] y
);

  assign y = s ? d1 : d0;

  // ?: is especially useful for describing a multiplexer because, based on
  // the first input, it selects between two others
  //
  // It's also called a **ternary operator** because it takes three inputs

endmodule
