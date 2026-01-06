// The format of declaring constants is `N'Bvalue`, where N is the size in
// bits, B is a letter indicating the base, and the value gives the value.
// For example 9'h25 = 25₁₆ = 37₁₀ = 000100101₂
//
// System Verilog supports 'b for binary, 'o for octal, 'd for decimal and
// 'h for hexadecimal. If the base is omitted, then default to decimal.
//
// System Verilog uses `z` to denote a floating value, `z` can be used to
// describe tristate because output floats when the enable is 0

module tristate(
  input  logic [3:0] a,
  input  logic       en,
  output tri   [3:0] y
);

  // Notice that `y` is defined as `tri` rather than `logic`, `logic` signals
  // can only have a single driver. Tristate buses can have multiple drivers,
  // so they should be declared as a **net**. Two types in System Verilog
  // `tri` or `trireg`. If no driver is active, a `tri` floats `z`, while a
  // `trireg` retains its previous value. If no type is specified for an input
  // or output, `tri` is assumed.
  //
  // Also, note that a `tri` output from a module can be used as a `logic`
  // input to another module.

  assign y = en ? a : 4'bzzzz;

  // If a gate receives a floating input, it may produce an x output when it
  // cannot determine the correct output value. Or it receives an illegal
  // value or uninitialized value.
  //
  // System Verilog signal values are 0, 1, z and x. System Verilog constants
  // starting with z or x are padded with leading z's or x's to reach their
  // full length.

endmodule
