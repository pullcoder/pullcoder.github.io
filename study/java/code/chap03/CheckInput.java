package chap03;

import java.util.Scanner;

public class CheckInput {

	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in); // 스캐너 불러오기.
		int month; // 정수 선언
		do { // do 문
			System.out.println("올바른 월을 입력하시오 [1-12]"); // 콘솔창 띄우기
			month = sc.nextInt(); // 콘솔창 값 정수로 저장.
		} while (month < 1 || month > 12); // 콘솔창의 값이 0보다 작거나 13 이상일 경우 멈춤. 
		
		sc.close(); // scanner 닫기
		
		System.out.println("사용자가 입력한 월은 "+ month); // 콘솔창 띄우기.
				
	}
	
}
