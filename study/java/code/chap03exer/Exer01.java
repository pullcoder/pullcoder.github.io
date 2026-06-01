package chap03exer;

public class Exer01 {

	public static void main(String[] args) {

		int num = 0;

		for (int i = 1; i <= 100; i++) {
			if (i % 3 == 0 || i % 4 == 0) {
				num = num + i;
			}
		}
		System.out.println(num);

	}
}
