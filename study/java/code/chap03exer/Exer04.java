package chap03exer;

import java.util.Scanner;

public class Exer04 {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);

		System.out.print("키를 입력하세요: ");
		double key = sc.nextInt();
		System.out.print("몸무게를 입력하세요: ");
		double m = sc.nextDouble();

		double num = (key - 100.0) * 0.9;

		if (m < num) {
			System.out.println("정상입니다.");
		} else {
			System.out.println("과체중입니다.");
		}

		sc.close();
	}
}
