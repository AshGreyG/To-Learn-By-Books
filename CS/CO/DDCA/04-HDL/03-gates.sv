module gates(
  input  logic [3:0] a, b,
  output logic [3:0] y1, y2, y3, y4, y5
);

  assign y1 = a & b;    // AND
  assign y2 = a | b;    // OR
  assign y3 = a ^ b;    // XOR
  assign y4 = ~(a & b); // NAND
  assign y5 = ~(a | b); // NOR

  // We call a, b, y1 are **operands** and `&`, `|`, `^`, `~` are operators.
  // A complete command such as `a & b` is called an expression and
  // `assign y1 = a & b` is called statements. Continuous statements end with
  // semicolons. Whenever the inputs on the right side of the = in
  // a continuous assignment statement change, the output on the left side is
  // re-computed.
  //
  // Thus, continuous statements describe combination logic.

endmodule
