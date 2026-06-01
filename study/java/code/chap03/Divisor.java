package chap03;

import java.util.Scanner;

public class Divisor {

	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);
		System.out.print("양의 정수를 입력하시오: ");
		int n = sc.nextInt();
		
		System.out.println(n + "의 약수는 다음과 같습니다.");
		for (int i = 1; i <= n; ++i) { // 1부터 사용자의 입력값까지 반복
			if(n % i == 0) // 사용자 입력값과 1~사용자입력값 까지 나누어 떨어지는것들을 
				System.out.print(" " + i); // 출력
		}
		
		sc.close(); 
		
	}
	
}
