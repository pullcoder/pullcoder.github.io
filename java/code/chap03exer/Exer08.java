package chap03exer;

import java.util.Scanner;

public class Exer08 {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);

		System.out.print("연산을 입력하세요: ");
		String op = sc.next();
		if (!op.equals("+") && !op.equals("-") && !op.equals("*") && !op.equals("/")) {
			System.out.println("연산자를 제대로 입력하시오.");
			return;
		}
		System.out.print("숫자 2개를 입력하세요: ");
		double num1 = sc.nextDouble();
		double num2 = sc.nextDouble();

		double result = 0;

		if (op.equals("+")) {
			result = num1 + num2;
		} else if (op.equals("-")) {
			result = num1 - num2;
		} else if (op.equals("*")) {
			result = num1 * num2;
		} else if (op.equals("/")) {
			if (num2 != 0) {
				result = num1 / num2;
			} else {
				System.out.println("0으로 나눌 수 없습니다!");
				return;
			}
		} else {
			System.out.println("잘못된 연산자입니다!");
			return;
		}
		sc.close();
		System.out.println(num1 + " " + op + " " + num2 + " = " + result);
	}
}