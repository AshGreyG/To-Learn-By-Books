// A class declaration for '_02ClassesAndObjects' class that is a
// subclass of '_01JavaLanguageBasics'

public class _02ClassesAndObjects extends _01JavaLanguageBasics {

    // The '_02ClassesAndObjects' has its own field

    public int seatHeight;

    public _02ClassesAndObjects(
        int startCadence,
        int startGear,
        int startSpeed,
        int startHeight
    ) {
        super(startCadence, startGear, startSpeed);
        seatHeight = startHeight;
    }

    // You can use a construct called *varargs* to pass an arbitrary number of
    // values to a method. You use varargs when you do not know how many of a
    // particular type of argument will be passed to the method.

    // Using '...' syntax, the method can then be called with any number of that
    // parameter, including none. Inside the method, the parameter is treated as
    // an array.

    public String concatAllString(String... strings) {
        String result = "";
        for (String s : strings) {
            result += s;
        }
        return result;
    }

    // When passing primitive data type arguments into the method, they are passed
    // by value. When passing objects, the passed-in parameter is a reference data
    // type. When the method returns, the passed-in reference still references the
    // same object as before.

    public static void main(String[] args) {
        int testPassingValue = 3;
        passPrimitive(testPassingValue);
        System.out.println(
            "After invoking passPrimitive, testPassingValue = " + testPassingValue
        );  // 3

        _Coordinate testPassingObject = new _Coordinate(3, 3);
        passObject(testPassingObject, 10, 10);
        System.out.println(
            "After invoking passObject, testPassingObject = { x: "
          + testPassingObject.getX()
          + ", y: "
          + testPassingObject.getY()
          + " }"
        );  // { x: 13, y: 13 }

        int testY = new _Coordinate(2, 2).getY();

        int[] testPassingArray = new int[10];
        passArray(testPassingArray);
        System.out.print(testPassingArray.toString());
    }

    // The 'new' operator instantiates a class by allocating memory for a new object
    // and returning a reference to that memory. The 'new' operator also invokes
    // the object constructor. The reference returned by the 'new' operator does not
    // have to be assigned to a variable. It can also be used directly in an
    // expression

    public static void passPrimitive(int p) {
        p = 10;
    }

    public static void passObject(_Coordinate c, int deltaX, int deltaY) {
        c.setX(c.getX() + deltaX);
        c.setY(c.getY() + deltaY);
    }

    public static void passArray(int[] a) {
        for (int i = 0; i < a.length; ++i) {
            a[i] = i * i;
        }
    }

    // There are two levels of access control:
    //    + At the top level: 'public' or package-private (no explicit modifier)
    //    + At the member level: 'public', 'private', 'protected'

    // For member-level:
    //
    // | Modifier    | Class | Package | Subclass | World |
    // +-------------+-------+---------+----------+-------+
    // | public      |   Y   |    Y    |     Y    |   Y   |
    // | protected   |   Y   |    Y    |     Y    |   N   |
    // | no modifier |   Y   |    Y    |     N    |   N   |
    // | private     |   Y   |    N    |     N    |   N   |

    // + Class: Indicating whether the class itself has access to the member defined
    //   by the access level. A class always has access to its own members;
    // + Package: Indicating whether classes in the same package as the class have
    //   access to the member;
    // + Subclass: Indicating whether subclasses of the class declared outside this
    //   package have access to the member;
    // + World: Indicating whether all classes have access to the member

    // A static initialization block is a normal block of code enclosed in braces, '{}',
    // and preceded by the 'static' keyword. A class can have any number of static
    // initialization blocks, and they can appear anywhere in the class body. The runtime
    // system guarantees that static initialization blocks are called in the order that
    // they appear in the source code.

    static {
        // Notice that the variable in static scope is NOT static, the code inside of 
        // static scope will be executed when the class is initializing
        System.out.println("The _02ClassesAndObjects is initializing...");
    }

    // Instance initialization block will be executed when the instance is initializing

    {
        this.seatHeight = 10;
    }

    // Nested classes are divided into two categories: non-static and static
    //   + Non-static nested classes are called inner classes
    //   + Nested classes that are declared static are called static nested classes

    String outerField = "outer Field";
    static String staticOuterField = "static outer field";

    class InnerClass {
        // A nested class is a member of its enclosing class. Non-static nested classes
        // have access to other members of the enclosing class, even if they are
        // declared as 'private'.
        void accessMembers() {
            System.out.println(outerField);
            System.out.println(staticOuterField);
        }
    }

    static class StaticNestedClass {
        // Static nested classes do not have access to other members of the enclosing
        // class. As a member of the outer class, a nested class can be declared
        // 'private', 'public', 'protected' or package private.
        void accessMembers(_02ClassesAndObjects outer) {
            System.out.println(outer.outerField);
            System.out.println(staticOuterField);
        }
    }
}

class TestClass {
    public static void main() {
        _02ClassesAndObjects outerObject = new _02ClassesAndObjects(0, 0, 0, 0);
        _02ClassesAndObjects.InnerClass innerObject
            = outerObject.new InnerClass();
    }

    interface HelloWorld {
        public void greet();
        public void greetSomeone(String someone);
    }

    public void sayHello() {
        class EnglishGreeting implements HelloWorld {
            String name = "world";
            public void greet() {
                greetSomeone(name);
            }
            public void greetSomeone(String someone) {
                name = someone;
                System.out.println("Hello " + name);
            }
        }

        HelloWorld englishGreeting = new EnglishGreeting();

        // This is a local class. Declared in the method

        HelloWorld spanishGreeting = new HelloWorld() {
            String name = "mundo";
            public void greet() {
                greetSomeone(name);
            }
            public void greetSomeone(String someone) {
                name = someone;
                System.out.println("Hola, " + name);
            }
        };

        // This is an anonymous class
    }

    public enum DayOfWeek {
        MONDAY("MON"),
        TUESDAY("TUE"),
        WEDNESDAY("WED"),
        THURSDAY("THU"),
        FRIDAY("FRI"),
        SATURDAY("SAT"),
        SUNDAY("SUN");

        private final String abbreviation;

        DayOfWeek(String abbreviation) {
            this.abbreviation = abbreviation;
        }

        public String getAbbreviation() {
            return abbreviation;
        }
    }

    // All enums implicitly extend 'java.lang.Enum' and cannot have any subclasses.
    // All enums have a few methods that are added implicitly.

    public static void testEnumMethods() {
        System.out.println(DayOfWeek.MONDAY.name());
        System.out.println(DayOfWeek.MONDAY.ordinal());

        DayOfWeek[] days = DayOfWeek.values();
        DayOfWeek monday = DayOfWeek.valueOf("MONDAY");
    }

    // Furthermore, enums implement the interface 'Comparable'. By default, enums
    // are ordered according to their ordinal number in the order of occurrence of
    // the enum constant. 

    public void compareDayOfWeek(DayOfWeek dayOfWeek) {
        int comparison = dayOfWeek.compareTo(DayOfWeek.WEDNESDAY);
        
        if (comparison < 0) {
            System.out.println("It's before the middle of the work week");
        } else if (comparison > 0) {
            System.out.println("It's after the middle of the work week");
        } else {
            System.out.println("It's the middle of the work week");
        }
    }

    enum MyEnum {
        A() {
            @Override
            void doSomething() {
                System.out.println("a");
            }
        },
        B() {
            @Override
            void doSomething() {
                System.out.println("b");
            }
        };

        abstract void doSomething();
    }
}