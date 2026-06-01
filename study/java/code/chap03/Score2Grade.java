package chap03;

import java.util.Scanner;

public class Score2Grade {
	
	public static void main(String[] args) {
		
		int score, number;
		char grade; // ''로 변수 선언.
		
		Scanner sc = new Scanner(System.in);
		
		System.out.print("성적을 입력하시오: ");
		score = sc.nextInt();
		number = score / 10; // 받은 성적을 10으로 나눔.
		
		switch (number) { // 나눈 성적이 몇인지 등급 나누기
		case 10:
		case 9:
			grade = 'A';
			break; // 종료
		case 8:
			grade = 'B';
			break;
		case 7:
			grade = 'C';
			break;
		case 6:
			grade = 'D';
			break;
		default: // 위 조건에 모두 맞지 않다면 실행.
			grade = 'F';
			break;
		}
		
		sc.close();
		System.out.println("학점: "+grade);
		
	}
}
