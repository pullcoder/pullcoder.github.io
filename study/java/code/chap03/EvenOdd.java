package chap03;

import java.util.Scanner;

public class EvenOdd {

	public static void main(String[] args) {
		
		int number;
		
		Scanner sc = new Scanner(System.in);
		
		System.out.print("정수를 입력하시오: ");
		number = sc.nextInt();
		
		if(number % 2 == 0) { // 2로 나눴을 때 나머지가 없다면 짝수
			System.out.println("입력된 정수는 짝수 입니다.");
		}else { // 아니면 홀수
			System.out.println("입력된 정수는 홀수 입니다.");
		}
		
		sc.close();
		System.out.println("프로그램이 종료되었습니다.");
		
	}
	
}
