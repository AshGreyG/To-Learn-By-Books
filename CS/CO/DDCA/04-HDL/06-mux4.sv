// 4:1 multiplexer has multiple data (d) and one-hot enable (e) inputs.
// When one of the 4 enables is asserted, the associated data is passed to the
// output

module mux4(
  input  logic [3:0] d0, d1, d2, d3,
  input  logic [1:0] s, // => generates one-hot enable inputs
  output logic [3:0] y
);

  assign y = s[1] ? (s[0] ? d3 : d2)
                  : (s[0] ? d1 : d0);

  // When there are more conditions, the syntax will be more complex.
endmodule
