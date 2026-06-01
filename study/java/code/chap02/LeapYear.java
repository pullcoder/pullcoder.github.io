package chap02;

public class LeapYear {

	public static void main(String[] args) {

		int year = 2026;
		boolean isLeapYear;

		// 4로 나누어 몫이 0으로 떨어지면 true 아니면 false
		isLeapYear = (year % 4 == 0);

		System.out.println(isLeapYear);

	}
}
