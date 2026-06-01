package chap03;

public class WelcomeLoop {

	public static void main(String[] args) {

		int i = 0;
		
		while (i < 5) { // 0~5까지 반복.
			System.out.println("환영합니다!"); // 5번 출력
			i++; // i 값 증가.
		}
		
		System.out.println("반복이 종료되었습니다.");
		
	}
	
}
