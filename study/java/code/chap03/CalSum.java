package chap03;

public class CalSum {

	public static void main(String[] args) {
		
		int i = 1; // 정수 선언
		int sum = 0; // 정수 선언
		
		while (i < 11) { // 1~10까지 반복
			sum+=1; // 1씩 더하기.
			i++; // i 값 1씩 증가.
		}
		
		System.out.println("합계="+sum); // 더한 값 출력.
		
	}
	
}
