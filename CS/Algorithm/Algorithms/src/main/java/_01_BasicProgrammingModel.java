// To invoke a Java program, we first compile it using the 'javac' command,
// (which will create a file ends with .class) then run it using the 'java' 
// command. The '.class' file contains a lower-level version of the program
// in Java *bytecode*.

// Four primitive data types that are the basis of the Java language:
//   + Integers, with arithmetic operations (int)
//   + Real numbers, again with arithmetic operations (double)
//   + Booleans, the set of values {true, false} with logical operations
//     (boolean)
//   + Characters, the alphanumeric characters and symbols that you type
//     (char)

// Java is said to be a *strongly typed* language, because the Java compiler
// checks for consistency, for example it doesn't permit us to multiply a
// boolean and a double.

public class _01_BasicProgrammingModel {
    public static void main(String[] argc) {
        testStandardLibraries();
    }

    public static void testFunction() {
        int testForInt = 1;
        
        // Initializing declarations, it creates an 'int' variable names 'test
        // ForInt' and assigns it the initial value 1

        // An array stores a sequence of values that are all of the same type.
        // We want not only to store values but also to access each individual
        // value. The method that we use to refer to individual values in an
        // array is numbering and then indexing them. If we have N values, we
        // think of them as being numbered from 0 to N-1. Then we can
        // unambiguously specify one of them by using the operation a[i] to
        // refer to the i-th value of any value of i from 0 to N-1.

        int M = 10, N = 10;
        double[] longArrayDeclaration;
        longArrayDeclaration = new double[N];
        for (int i = 0; i < N; ++i) {
            longArrayDeclaration[i] = 0.0;
        }
        double[] shortArrayDeclaration = new double[N];
        int[] initializingDeclaration = {1, 2, 3, 1};

        // The reason that we need to explicitly create array at run time is that
        // the Java compiler cannot know how much space to reserve for the array
        // at compile time.

        // A program can refer to the length of an array 'a[]'' with the code 'a.length'.
        // The last element of an array 'a[]' is always 'a[a.length - 1]'. Java
        // does *automatic bounds checking*. If you have created an array of size
        // N and use an index whose value is less than 0 or greater than N-1, your
        // program will terminate with an *ArrayOutOfBoundsException* runtime
        // exception.

        // Note carefully that *an array name refers to the whole array*, if we
        // assign one array name to another, then both refers to the same array.

        int[] testAliasA = new int[N];
        testAliasA[3] = 1234;
        int[] testAliasB = testAliasA;
        testAliasB[3] = 5678;   // testAliasA[3] is now 5678

        // A two-dimensional array in Java is an array of one-dimensional arrays.
        // A two-dimensional array may be ragged (its arrays may all be of differing
        // lengths). To refer to the entry in row 'i' and column'j' of a two-
        // dimensional array 'a[][]', we use the notation 'a[i][j]'

        double[][] twoDimensional = new double[M][N];
    }

    // Find the maximum of the array values

    public static double findMax(double[] a) {
        double max = a[0];
        for (int i = 1; i < a.length; ++i) {
            if (a[i] > max) max = a[i];
        }
        return max;
    }

    // Compute the average of the array values

    public static double average(double[] a) {
        int N = a.length;
        double sum = 0.0;
        for (int i = 0; i < N; ++i) {
            sum += a[i];
        }
        return sum / N;
    }
    
    // Copy to another array

    public static double[] copy(double[] a) {
        int N = a.length;
        double[] b = new double[N];
        for (int i = 0; i < N; ++i) {
            b[i] = a[i];
        }
        return b;
    }

    // Reverse the elements within an array

    public static void reverse(double[] a) {
        int N = a.length;
        for (int i = 0; i < N / 2; ++i) {
            double temp = a[i];
            a[i] = a[N - i - 1];
            a[N - i - 1] = temp;
        }
    }

    // Matrix-matrix multiplication

    public static double[][] matrixMultiplication(
        double[][] a, 
        double[][] b
    ) {
        int N = a.length;
        double[][] c = new double[N][N];
        for (int i = 0; i < N; ++i) {
            for (int j = 0; j < N; ++j) {
                for (int k = 0; k < N; ++k) {
                    c[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return c;
    }

    // Static methods are called *functions*, each static method is
    // a sequence of statements that are executed, one after the other,
    // when the static method is *called*. The modifier *static* distinguishes
    // thess methods from *instance methods*

    // + Arguments are passed by value.
    // + Method names can be overloaded.
    // + A method has a single return value but may have multiple returns statements.
    // + A method can have side effects.

    // A String is a sequence of characters. A literal String is a sequence of 
    // characters within double quotes, such as "Hello World.". The data type String
    // is a Java data type but it isn't a primitive type

    public static void testStandardLibraries() {
        double testForPrintf = 3.3456312;
        System.out.print("This is a string for 'print' function");
        System.out.printf("This is %.5f\n", testForPrintf);
        System.out.println("This is a string that causes a new line.");

        // The conversion codes of formatted output are
        //   + d (for decimal values from Java's integer types)
        //   + f (for floating-point values)
        //   + s (for String values)
        // Between the % and conversion code is an integer value that specifies the
        // field width of the converted value. By default, blank spaces are added
        // on the left to make the length of the converted output equal to the field
        // width; if we want the spaces on the right, we can insert a minus sign 
        // before the field width. If the converted output string is bigger than the
        // field width, the field width is ignored.

        System.out.printf("%14d", 512);
        System.out.printf("%-14d", 512);
        System.out.printf("%14.2f", 1595.16800107543);

        // % java Average < data.txt    
        //   (redirecting from a file to standard input)
        // % java RandomSeq 1000 100.0 200.0 > data.txt
        //   (redirecting standard output to a file)
        // % java RandomSeq 1000 100.0 200.0 | java Average
        //   (piping the output of one program to the input of another)

        double testForPositiveInfinity = Double.POSITIVE_INFINITY;
        double testForNegativeInfinity = Double.NEGATIVE_INFINITY;

        // 1/0 generates a runtime exception for division by zero; 1.0/0.0 has the
        // value Infinity
    }

    // ------------ Exercise 1.1.1 ------------

    public static void exercise_1_1_1() {
        System.out.print((0 + 15) / 2);                     // 7
        System.out.print(2.0e-6 * 100000000.1);             // 200.0000002
        System.out.print(true && false || true && false);   // false
    }

    // ------------ Exercise 1.1.2 ------------

    public static void exercise_1_1_2() {
        Object a = (1 + 2.236) / 2;
        Object b = 1 + 2 + 3 + 4.0;
        Object c = 4.1 >= 4;
        Object d = 1 + 2 + "3";

        System.out.print(a instanceof Double);  // true
        System.out.print(b instanceof Double);  // true
        System.out.print(c instanceof Boolean); // true
        System.out.print(d instanceof String);  // true
    }
}