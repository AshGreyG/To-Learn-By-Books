module fulladder (
  input  logic a, b, cin,
  output logic s, cout
);
  logic p, g;

  always_comb
    begin
      p = a ^ b;
      g = a & b;
      s = p ^ cin;
      cout = g | (p & cin);
    end

  // In this case, 'always @(a, b, cin)' would have been equivalent to 'always_comb'.
  // However 'always_comb' is better because it avoids common mistakes of missing
  // signals in the sensitivity list.
  //
  // It's best to use blocking assignments for combination logic.

  //                  cin
  //                   ↓
  //      +-------------------------+
  //  a → | a ^ b ^ cin             | → s
  //  b → | a & b | ((a ^ b) & cin) | → cout
  //      +-------------------------+
  //
  //    a    b    cin    |    s    cout
  //    0    0     0     |    0      0
  //    0    0     1     |    1      0
  //    0    1     0     |    1      0
  //    0    1     1     |    0      1
  //    1    0     0     |    1      0
  //    1    0     1     |    0      1
  //    1    1     0     |    0      1
  //    1    1     1     |    1      1

  //    s = a ^ b ^ cin
  //    +-> s is only 1 when odd numbers of them are 1, and that's xor
  // cout = (a & b) | (a & cin) | (b & cin)
  //      = (a & b) | ((a | b) & cin)
  //    +-> Actually when a and b are both 1, a & b is 1 so we can reuse a ^ b
  //    +-> instead of a | b.
  //    +->
  //    +-> +--------+--------+--------+--------+--------+
  //    +-> | cin\ab |   00   |   01   |   11   |   10   |
  //    +-> +--------+--------+--------+--------+--------+
  //    +-> |   0    |   0    |   0    |   1    |   0    |
  //    +-> +--------+--------+--------+--------+--------+
  //    +-> |   1    |   0    |   1    |   1    |   1    |
  //    +-> +--------+--------+--------+--------+--------+

endmodule