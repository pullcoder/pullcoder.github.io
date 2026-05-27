package chap02exer;

import java.util.Scanner;

public class Exer5 {

    public static void main(String[] args) {
        
        int integer;
        
        Scanner sc = new Scanner(System.in);
        
        System.out.print("정수: ");
        integer = sc.nextInt();
        
        String binaryString = Integer.toBinaryString(integer);
        
        System.out.println(integer + ": " + binaryString);
                
        sc.close();
        
    }
}