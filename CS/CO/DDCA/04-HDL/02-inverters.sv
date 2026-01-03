module inv(
  input  logic [3:0] a,
  output logic [3:0] y
);
  // a[3:0] represents a 4-bits. The bits from most significant to least
  // significant are a[3], a[2], ..., a[0]. This is called little-endian order,
  // the least significant bit has the smallest bit number. We could have
  // named the bus a[4:1] in case a[4] is the most significant.
  //
  // [+] little-endian order: a[n] > a[n - 1] > ... > a[0] => [3:0]
  // [+] big-endian order:    a[n] < a[n - 1] < ... < a[0] => [0:3]

  assign y = ~a;
endmodule
