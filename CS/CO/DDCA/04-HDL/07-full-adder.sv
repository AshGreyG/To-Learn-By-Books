// In System Verilog, internal variables are usually declared as `logic`

module fulladder(
  input  logic a, b, cin,
  output logic a, cout
);

  logic p, g;

  assign p = a ^ b;
  assign g = a & b;

  assign s = p ^ cin;
  assign cout = g | (p & cin);

  // This is a full adder that has **carry-in** (denoted as `cin`) and **carry
  // -out** (denoted as `cout`). True Boolean equation is like:
  //
  // S = A ⊕ B ⊕ Cᵢₙ  and  Cₒᵤₜ = AB + (A + B) Cᵢₙ
  //
  // But when A = 1 and B = 1, AB = 1 so term A + B in Cₒᵤₜ equation can be
  // simplified as A ⊕ B, and the xor gate can be reused.

endmodule
