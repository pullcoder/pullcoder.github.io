package chap03exer;

public class Exer10 {

	public static void main(String[] args) {

		double[] num = { 1, 2, 3, 4 };
		double count = 0;
		double max = 0;
		for (int i = 0; i < num.length; i++) {
			System.out.print(num[i] + " ");
			count += num[i];
			if (num[i] > max) {
				max = num[i];
			}
		}
		System.out.println("\n합은 " + count);
		System.out.println("최대값은 " + max);
	}
}
