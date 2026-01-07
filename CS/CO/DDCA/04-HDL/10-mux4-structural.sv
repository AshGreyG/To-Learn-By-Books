// The previous section discussed behavioral modeling, describing a model in
// terms of the relationships **between inputs and outputs**. This section
// examines structural modeling, which describes a module in terms of how it
// is composed of simpler modules.

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

module mux4_structural(
  input  logic [3:0] d0, d1, d2, d3,
  input  logic [1:0] s,
  output logic [3:0] y
);

  logic [3:0] low, high;
  mux2 lowmux(d0, d1, s[0], low);
  mux2 highmux(d2, d3, s[0], high);
  mux2 finalmux(low, high, s[1], y);

endmodule
