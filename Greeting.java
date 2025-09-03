import java.util.Scanner;

/**
 * Asks the user for their name and returns a greeting.
 */
public class Greeting {
    public static void main(String[] args) {
        try (Scanner input = new Scanner(System.in, "UTF-8")) {
            System.out.println("Please enter your name: ");
            String name = input.next();
            
            System.out.println("Hi, " + name + "!");
        }
    }
}