package chap03;

import java.util.Scanner;

public class Nested {

	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);
		
		System.out.print("정수를 입력하시오: ");
		int number1 = sc.nextInt();
		
		if(number1 > 0) { // 받은 값이 0보다 크면 양수
			System.out.println("양수입니다.");
		}else if(number1 == 0){ // 받은값이 0이면 0
			System.out.println("0입니다.");
		}else { // 위 조건이 모두 아니라면 음수
			System.out.println("음수입니다.");
		}
	
		sc.close();
		
	}
	
}
