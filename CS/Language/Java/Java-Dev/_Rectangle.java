public class _Rectangle {
    private int x, y, width, height;

    public _Rectangle() {
        this(0, 0, 1, 1);
    }
    public _Rectangle(int width, int height) {
        this(0, 0, width, height);

        // From within a constructor, you can also use the 'this' keyword to
        // call another constructor in the same class. Doing so is called an
        // explicit invocation.
    }
    public _Rectangle(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
