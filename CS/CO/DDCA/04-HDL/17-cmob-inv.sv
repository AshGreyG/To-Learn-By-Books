// 'always_comb' reevaluates the statements inside the 'always' statement
// whenever any of the signals on the right-hand side of <= or = in the 'always'
// statement change. If the code inside the 'always' block is not combinational
// logic, System Verilog will report a warning. It's equivalent to 'always @(*)'
// but is preferred in System Verilog
//
// The '=' in the always statement is called a **blocking assignment**. It's a
// good practice to use blocking assignments for combination logic and non-blocking 
// assignments for sequential logic.

module combination_inv (
  input  logic [3:0] a,
  output logic [3:0] y
);
  always_comb
    y = ~a;
endmodule