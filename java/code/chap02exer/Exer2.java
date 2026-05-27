package chap02exer;

import java.util.Scanner;

public class Exer2 {

    public static void main(String[] args) {
        
        double miles;
        double kilometers;
        
        Scanner sc = new Scanner(System.in);
                
        System.out.print("마일을 입력하시오: ");
        miles = sc.nextDouble();
        
        kilometers = miles * 1.609;
        
        sc.close();
        
        System.out.println(miles + "마일은 " + kilometers + "키로미터입니다.");
        
    }
}