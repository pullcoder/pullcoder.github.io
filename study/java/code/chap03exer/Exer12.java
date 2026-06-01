package chap03exer;

import java.util.Scanner;

public class Exer12 {

	public static void main(String[] args) {

		double sum = 0;
		int count = 0;

		Scanner sc = new Scanner(System.in);

		System.out.print("성적을 입력할 학생 수는? ");
		int students = sc.nextInt();

		do {
			System.out.print("성적을 입력하세요: ");
			double score = sc.nextDouble();

			sum += score;
			count++;
		} while (count != students);

		sc.close();

		System.out.println("합계: " + sum);
		System.out.println("평균: " + sum / count);
	}
}