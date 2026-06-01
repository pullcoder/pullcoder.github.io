package chap03;

import java.util.Scanner;

public class StringSwitch {

	public static void main(String[] args) {

		String month;

		Scanner sc = new Scanner(System.in);

		System.out.print("달의 이름을 입력 하시오: ");
		month = sc.next();

		int monthNumber;
		switch (month) { // 영어로 받은 월을 숫자로 반환.
		case "january":
			monthNumber = 1;
			break;
		case "february":
			monthNumber = 2;
			break;
		case "march":
			monthNumber = 3;
			break;
		case "april":
			monthNumber = 4;
			break;
		case "may":
			monthNumber = 5;
			break;
		case "june":
			monthNumber = 6;
			break;
		case "july":
			monthNumber = 7;
			break;
		case "august":
			monthNumber = 8;
			break;
		case "september":
			monthNumber = 9;
			break;
		case "october":
			monthNumber = 10;
			break;
		case "november":
			monthNumber = 11;
			break;
		case "december":
			monthNumber = 12;
			break;
		default:
			monthNumber = 0;
			break;
		}
		
		sc.close();
		System.out.println(monthNumber);
		
	}
}