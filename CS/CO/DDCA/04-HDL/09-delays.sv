// It's necessary to operate on a subset of a bus or to concentrate signals
// from buses. These operations are collectively known as **bit swizzling**.
//
// assign y = {c[2:1], {3{d[0]}}, c[0], 3'b101}
//
// The {} operator is used to concentrate buses, {3{d[0]}} indicates three
// copies of d[0]. If y is wider than 9 bits, zeros will be placed in the most
// significant bits.

`timescale 1ns/1ps

// System Verilog files can include a timescale directive that indicates the
// value of each time unit. The statement is of form ``timescale
// unit/precision`. In this file, each unit is 1ns, and the simulation has 1ps
// precision. If no timescale given, default is 1ns/1ns

module delays_example (
  input  logic a, b, c,
  output logic y
);

  logic ab, bb, cb, n1, n2, n3;

  assign #1 {ab, bb, cb} = ~{a, b, c};
  assign #2 n1 = ab & bb & cb;
  assign #2 n2 = a  & bb & cb;
  assign #2 n3 = a  & bb & c ;
  assign #4  y = n1 | n2 | n3;

  // In System Verilog, a # symbol is used to indicate the number of units of
  // delay. It is usually placed at assignment.

endmodule
