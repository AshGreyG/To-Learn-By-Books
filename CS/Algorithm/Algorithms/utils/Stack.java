package utils;

import java.util.Iterator;

public class Stack<Item> implements Iterable<Item> {
    private Item[] a = (Item[]) new Object[0];

    // Though the Java compiler gives a warning, the Java system library
    // implementations of similar abstract data types use the same idiom.
    // For historical and technical reasons generic array creation is
    // disallowed in Java

    private int N = 0;

    // + The collection must implement an 'iterator()' method that returns an
    //   'Iterator' object.
    // + The 'Iterator' class must include two methods: 'hasNext()' (which returns
    //   a 'boolean' value) and 'next()' (which returns a generic item from the
    //   collection)
    
    // In Java, we use the 'interface' mechanism to express the idea that a class
    // implements a specific method. For iterable collections, the necessary 
    // interfaces are already defined for us in Java

    /**
     * @return A boolean indicating whether the stack is empty
     */
    public boolean isEmpty() {
        return N == 0;
    }

    /**
     * @return An integer indicating the size of stack
     */
    public int size() {
        return N;
    }

    /**
     * @param max The new capacity of stack
     */
    private void resize(int max) {
        Item[] temp = (Item[]) new Object[max];
        for (int i = 0; i < N; ++i) {
            temp[i] = a[i];
        }
        a = temp;
    }

    /**
     * @param newItem The item that needs to be added to the stack
     */
    public void push(Item newItem) {
        if (N == a.length && N != 0) {
            resize(2 * a.length);
        } else if (N == 0) {
            resize(1);
        }
        // Using resize 2 * a.length can ensure that the stack will not overflow
        a[N] = newItem;
        N++;
    }

    /**
     * @return The top item of stack. Popping it will reset the original space to null
     */
    public Item pop() {
        if (isEmpty()) return null;
        Item item = a[N - 1];
        N--;
        a[N] = null;
        // Notice we use (Item[]) new Object[max] to define the array, so we can use null
        // to initialize or recycle the unused space.
        if (N > 0 && N == a.length / 4) {
            resize(a.length / 2);
        }
        return item;
    }

    private class ReverseArrayIterator implements Iterator<Item> {
        private int currentIndex = N;
        public boolean hasNext() { return currentIndex > 0;  }
        public    Item next()    { return a[--currentIndex]; }
        public    void remove()  {                           }
    }

    public Iterator<Item> iterator() {
        return new ReverseArrayIterator();
    }
}
