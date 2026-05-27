package chap03exer;

import java.util.Scanner;

public class Exer09 {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);

		System.out.print("출력할 항의 갯수: ");
		int num = sc.nextInt();
		int a = 0, b = 1;

		System.out.print(a + " " + b + " ");
		for (int i = 2; i < num; i++) {
			int c = a + b;
			System.out.print(c + " ");
			a = b;
			b = c;
		}
		sc.close();
	}
}
