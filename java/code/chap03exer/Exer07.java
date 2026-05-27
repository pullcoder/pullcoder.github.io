package chap03exer;

public class Exer07 {

	public static void main(String[] args) {

		int count = 0;

		for (int i = 1; i <= 100; i++) {
			for (int j = 1; j <= 100; j++) {
				for (int k = 1; k <= 100; k++) {
					if (i * i + j * j == k * k) {
						System.out.println(i + " " + j + " " + k);
						count++;
					}
				}
			}
		}
		System.out.println(count + "개");
	}
}
