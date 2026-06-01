package chap02;

import java.util.Scanner;

public class Add2 {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in); // Scanner 받아와 sc 변수에 저장

		int x, y, sum; // x,y,sum 변수 선언

		System.out.print("첫 번째 숫자를 입력하시오 : "); // 콘솔창 띄우기
		x = sc.nextInt(); // 정수 받아 x에 저장

		System.out.print("두 번째 숫자를 입력하시오 : "); // 콘솔창 띄우기
		y = sc.nextInt(); // 정수 받아 y에 저장

		sum = x + y; // 받은 x, y 값을 sum에 저장

		sc.close(); // Scanner 닫기

		System.out.println(sum); // 콘솔에 더한 값 출력

	}
}
