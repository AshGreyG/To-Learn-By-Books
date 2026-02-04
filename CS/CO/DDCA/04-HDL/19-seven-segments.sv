module seven_segments(
  input  logic [3:0] data,
  output logic [6:0] segments
);

  //       a
  //    +----+
  // f  |  g | b
  //    +----+
  // e  |    | c
  //    +----+
  //       d

  always_comb
    case (data)
      //                     abc_defg
      0:       segments = 7'b111_1110;
      1:       segments = 7'b011_0000;
      2:       segments = 7'b110_1101;
      3:       segments = 7'b111_1001;
      4:       segments = 7'b011_0011;
      5:       segments = 7'b101_1010;
      6:       segments = 7'b111_0000;
      8:       segments = 7'b111_1111;
      9:       segments = 7'b111_1011;
      default: segments = 7'b000_0000;
    endcase

    // The case statement checks the value of data. When data is <value>, then
    // the statement performs the <statement> after the given <value> branch.
    // In SystemVerilog, case statement must appear in always block.

endmodule