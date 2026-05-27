package chap03;

public class ContinueTest {

	public static void main(String[] args) {

		for (int i = 1; i <= 10; ++i) { // 1에서 10까지 반복
			if (i % 3 == 0) continue; // 1부터 10까지 중 3으로 나눴을 때 몫이 없다면 패스.

			System.out.print(i + " "); // 3으로 나눈것 중 딱 떨어지지 않은것 출력
		}

	}

}
