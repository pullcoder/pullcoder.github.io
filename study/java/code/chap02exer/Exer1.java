package chap02exer;

import java.util.Scanner;

public class Exer1 {

    public static void main(String[] args) {
        
        int num;
        
        Scanner sc = new Scanner(System.in);
        
        System.out.print("오렌지의 개수를 입력하시오: ");
        num = sc.nextInt();
        
        int box = num / 10;
        int remain = num % 10;
        
        sc.close();
        
        System.out.println(String.format("%d박스가 필요하고 %d개가 남습니다.", box, remain));
        
    }
}