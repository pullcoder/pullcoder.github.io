package chap03;

public class Sum {

	public static void main(String[] args) {
		
		int sum = 0;
		
		for (int i = 1; i <=10; i++) // 1~10까지 반복하여 더함.
			sum += 1;
		
		System.out.printf("1부터 10까지의 정수의 합 = %d\n", sum);
		
	}
	
}
