package chap03;

import java.util.Scanner;

public class Averager {

	public static void main(String[] args) {
		
		int total = 0; // 정수형 total 선언
		int count = 0; // 정수형 count 선언
		Scanner sc = new Scanner(System.in); // scanner import
		while (true) { // while true 로 무조건 참.
			System.out.print("점수를 입력하시오: "); // 콘솔창 띄우기
			int grade = sc.nextInt(); // 콘솔창에서 받은 값 정수로 받아 저장
			if (grade < 0) break; // 받은 값이 0보다 작으면 멈춤.
			
			total += grade; // 받은값 계속 더하기.
			count++; // 횟수 계산.
		}
		
		sc.close(); // scanner 닫기
		
		System.out.println("평균은 " + total / count); // 콘솔창 띄우기
		
	}
	
}
