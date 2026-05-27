package chap03exer;

import java.util.Scanner;

public class Exer02 {

	public static void main(String[] args) {

		String[] number = { "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE" };

		Scanner sc = new Scanner(System.in);
		System.out.print("정수를 입력하세요: ");
		int num = sc.nextInt();

		if (0 < num && num < 10) {
			System.out.println(number[num - 1]);
		} else {
			System.out.println("OTHER");
		}
		sc.close();
	}
}
