import java.util.Arrays;
import java.util.List;

// The modifiers 'public' and 'private', which determine what other classes
// can access '_01JavaLanguageBasics'. Notice the 'private' modifier can
// only be applied to the nested classes.

public class _01JavaLanguageBasics {

    // Usually the name of class is with the initial letter capitalized.

    private class Bicycle { }

    int instanceVariable = 34;
    static int classVariable = 34;
    static final int CLASS_FINAL_VARIABLE = 34;

    // + Instance Variables: Objects store their individual states in
    //   "non-static fields", that is, fields declared without the
    //   'static' keyword. Non-static fields are also known as instance
    //   variables because their values are unique to each instance of
    //   a class.
    // + Class Variables: A class variable is any field declared with
    //   'static' modifier, this tells the compiler that there is exactly
    //   on copy of this variable in existence, regardless of how many 
    //   times the class has been instantiated. Additionally, the keyword
    //   'final' could be added to indicate that the value of this class
    //   variable will never change.
    // + Local Variables: They are defined in the closing braces of a
    //   method.
    // + The 'static' modifier, in combination with the 'final' modifier,
    //   is also used to define constants

    byte    byteInstanceVar     = 127;
    short   shortInstanceVar    = 32767;
    int     intInstanceVar      = 2 ^ 31 - 1;
    long    longInstanceVar     = 2 ^ 63 - 1;
    float   floatInstanceVar    = 1.234f;
    double  doubleInstanceVar   = 1.234d;
    boolean booleanInstanceVar  = true;
    char    charInstanceVar     = '\ufa11';

    // + byte   |  8 bit | -128     | 127
    // + short  | 16 bit | -32768   | 32767
    // + int    | 32 bit | -2 ^ 31  | 2 ^ 31 - 1
    // + long   | 64 bit | -2 ^ 63  | 2 ^ 63 - 1

    int[] intArray = new int[10];

    // This part defines some real instance variables and functions:

    private int cadence;
    private int gear;
    private int speed;

    // The 'public' modifier in field indicates that the field is accessible from all
    // classes. The 'private' modifier in field indicates that the field is accessible
    // only within its own class.

    // The class has one constructor
    // A class declaration has three parts: Field, Constructor, and Method declarations

    public _01JavaLanguageBasics(
        int startCadence,
        int startGear,
        int startSpeed
    ) {
        cadence = startCadence;
        gear = startGear;
        speed = startSpeed;
    }

    public void setCadence(int newValue) {
        cadence = newValue;
    }

    public void setGear(int newValue) {
        gear = newValue;
    }

    public void applyBrake(int decrement) {
        speed -= decrement;
    }

    public void speedUp(int increment) {
        speed += increment;
    }

    // End of this part

    public static void main(String[] args) {
        String[] copyFrom = {
            "ab", "bc", "cd", "de", "ef",
            "fg", "gh", "hi", "ij", "jk"
        };
        // In Java the value of String should be wrapped by '{}' rather than '[]'
        String[] copyTo = Arrays.copyOfRange(copyFrom, 2, 9);

        for (String s : copyTo) {
            System.out.println("This is " + s);
        }

        // You can use the 'var' type identifier to declare a local variable.
        // In doing so, you let the compiler decide what is the real type of the
        // variable

        var message = "1234";   // message: String
        var list = List.of("one", "two", "three");  // list: List<String>

        for (var element : list) {  // element: String
            System.out.println(message + element);
        }

        // 1. You can only use it for local variables declared in methods, constructors
        //    and initializer blocks
        // 2. var cannot be used for fields, nor for method or constructor parameters
        // 3. The compiler must be able to choose a type when the variable is declared.
        //    Since 'null' has no type, the variable must have an initializer.
    }

    enum Day {
        MONDAY, TUESDAY,
        WEDNESDAY, THURSDAY,
        FRIDAY, SATURDAY,
        SUNDAY
    };

    public int calculate(Day d) {
        return switch(d) {
            case SATURDAY, SUNDAY -> 0;
            default -> {
                int remainingWorkDays = 5 - d.ordinal();
                yield remainingWorkDays;
            }
        };

        // Switch expression can use '->' syntax to return the value to the
        // variable like assignment.
    }
}