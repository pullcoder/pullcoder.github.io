package chap03;

public class NestedLoop {

	public static void main(String[] args) {
		
		for (int y = 0; y < 5; y++) { // 0~4까지 반복
			for (int x = 0; x < 10; x++) { // 0~9까지 반복
				System.out.print("*");
			}
			System.out.println("");
		}
		
	}
	
}
