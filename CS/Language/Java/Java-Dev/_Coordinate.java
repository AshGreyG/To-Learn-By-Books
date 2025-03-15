public class _Coordinate {
    private int x;
    private int y;

    public _Coordinate(int x, int y) {
        this.x = x;
        this.y = y;

        // The most common reason for using the 'this' keyword is because
        // a field is shadowed by a method or constructor parameter
    }

    public void setX(int newValue) {
        x = newValue;
    }

    public int getX() {
        return x;
    }

    public void setY(int newValue) {
        y = newValue;
    }

    public int getY() {
        return y;
    }
}