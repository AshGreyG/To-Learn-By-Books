import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

import utils.Stack;

public class _02_BasicDataStructures {

    public static void main(String[] args) {
        evaluate("(1 + 2)");
    }

    // The notation '<Item>' after the class name in each of APIs defines the
    // name 'Item' as a *type parameter*, a symbolic placeholder for some
    // concrete type to be used by the client. We can replace 'Item' with the
    // name of any *reference* data type.

    // Type parameters have to be instantiated as *reference* types, so Java
    // has special mechanisms to allow generic code to be used with primitive
    // types. Java automatically converts between these primitive types and the
    // corresponding wrapper reference types.

    // Stack<Integer> stack = new Stack<Integer>();
    // stack.push(17);          // auto-boxing      (int -> Integer)
    // int i = stack.pop();     // auto-unboxing    (Integer -> int)

    // To iterate through the items in the collection:

    // Queue<Transaction> collection = new Queue<Transaction>();
    // for (Transaction t : collection) {
    //     System.out.println(t);
    // }

    // A *bag* is a collection where removing items is not supported, its purpose is
    // to provide clients with the ability to collect items and then to iterate
    // through the collected items. The order of iteration is unspecified and should
    // be immaterial to the client.

    public static void testForBag() {
        ArrayList<Double> numbers = new ArrayList<Double>();
        Scanner scanner = new Scanner(System.in);
        System.out.println("Please type some numbers...");
        
        while (true) {
            String input = scanner.nextLine();
            if (input.equalsIgnoreCase("exit")) {
                break;
            }
            numbers.add(Double.parseDouble(input));
        }

        int N = numbers.size();
        double sum = 0;

        for (double x : numbers) {
            sum += x;
        }
        double mean = sum / N;

        sum = 0.0;

        for (double x : numbers) {
            sum += (x - mean) * (x - mean);
        }
        double std = Math.sqrt(sum / (N - 1));

        System.out.printf("Mean: %.2f\n", mean);
        System.out.printf("Std dev: %.2f\n", std);
        scanner.close();
    }

    // A FIFO queue is a collection that is based on the first-in-first-out (FIFO) policy.
    // When a client iterates through the items in a queue with the foreach construct,
    // the items are processed in the order they were added to the queue

    public static void testForQueue() {
        Queue<Integer> queue = new LinkedList<Integer>();
        Scanner scanner = new Scanner(System.in);
        System.out.println("Now we are checking queue...");

        while (true) {
            String input = scanner.nextLine();
            if (input.equalsIgnoreCase("exit")) {
                break;
            }
            queue.add(Integer.parseInt(input));
        }

        int N = queue.size();
        int[] a = new int[N];

        for (int i = 0; i < N; ++i) {
            a[i] = queue.remove();
            System.out.print(a[i] + " ");
        }
        scanner.close();
    }

    // A *stack* is a collection that is based on the *last-in-first-out* (LIFO) policy.
    
    // + Push operands onto the operand stack.
    // + Push operators onto the operator stack.
    // + Ignore left parentheses.
    // + On encountering a right parenthesis, pop an operator, pop the requisite number
    //   of operands, and push onto the operand stack the result of applying that operator
    //   to those operands.
    // + After the final parenthesis has been processed, there is one value on the stack,
    //   which is the value of the expression.

    public static void evaluate(String expression) {
        Stack<String> ops  = new Stack<String>();
        Stack<Double> vals = new Stack<Double>();

        for (int i = 0; i < expression.length() - 1; ++i) {
            String s = expression.substring(i, i);
            String operand = "";

            switch (s) {
                case "("    : break;
                case "+"    :
                case "-"    :
                case "*"    :
                case "/"    :
                case "sqrt" : {
                    ops.push(s); 
                    vals.push(Double.parseDouble(operand));
                    operand = "";
                    break;
                }
                case ")"    : {
                    String op = ops.pop();
                    double v = vals.pop();

                    switch (op) {
                        case "+"    : v = vals.pop() + v; break;
                        case "-"    : v = vals.pop() - v; break;
                        case "*"    : v = vals.pop() * v; break;
                        case "/"    : v = vals.pop() / v; break;
                        case "sqrt" : v = Math.sqrt(v);
                    }
                    vals.push(v);
                    break;
                }
                default     : operand += s; break;
            }
        }
        System.out.println(vals.pop());
    }
}