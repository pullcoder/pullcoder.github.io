package chap03exer;

public class Exer05 {

	public static void main(String[] args) {

		for (int i = 0; i < 11; i++) {
			for (int j = 0; j < 11; j++) {
				if (i * 3 + j * 10 == 100) {
					System.out.printf("(%d,%d)\n", i, j);
				}
			}
		}
	}
}
