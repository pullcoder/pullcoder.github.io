// exer03
package chap04exer;

public class Date {
	private int year;
	private int month;
	private int day;

	private static final String[] MONTH_NAMES = { "", "January", "February", "March", "April", "May", "June", "July",
			"August", "September", "October", "November", "December" };

	public Date(int year, int month, int day) {
		this.year = year;
		this.month = month;
		this.day = day;
	}

	public void print1() {
		System.out.println(year + "." + month + "." + day);
	}

	public void print2() {
		System.out.println(MONTH_NAMES[month] + " " + day + ", " + year);
	}

	public static void main(String[] args) {
		Date d1 = new Date(2012, 7, 12);
		d1.print1();
		d1.print2();
	}
}
