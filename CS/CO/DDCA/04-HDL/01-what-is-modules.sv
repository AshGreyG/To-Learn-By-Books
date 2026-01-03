// A SystemVerilog module begins with the module name (in project it's usually
// the name of this file).

module example_module (
  input  logic a, b, c,
  output logic y
);
  // `logic` signals such as the inputs and outputs are Boolean variable and
  // they may also have floating and undefined values.

  assign y = ~a & ~b & ~c |
              a & ~b & ~c |
              a & ~b &  c ;
  // The `assign` statement describes combinational logic
  // `~` indicates NOT
  // `&` indicates AND
  // `|` indicates OR
endmodule
