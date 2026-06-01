package chap03;

import java.util.Scanner;

public class Grading {

	public static void main(String[] args) {

		int score;
		
		Scanner sc = new Scanner(System.in);
		
		System.out.print("성적을 입력하시오: ");
		score = sc.nextInt();
		
		if (score >= 90) { // 성적이 90보다 크다면 실행
			System.out.println("학점 A");
		} else if (score >= 80) { // 성적이 80보다 크면 실행
			System.out.println("학점 B");
		} else if (score >= 70) { // 성적이 70보다 크면 실행
			System.out.println("학점 C");
		} else if (score >= 60) { // 성적이 60보다 크면 실행
			System.out.println("학점 D");
		} else { // 전부 아니라면 실행
			System.out.println("학점 F");
		}
	
		sc.close();
		
	}
}
