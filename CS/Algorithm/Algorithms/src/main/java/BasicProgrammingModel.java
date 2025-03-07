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

public class BasicProgrammingModel {
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
}