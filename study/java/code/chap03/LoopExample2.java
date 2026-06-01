package chap03;

import java.util.Scanner;

public class LoopExample2 {

	public static void main(String[] args) {

		int n;
		int i = 1;
		System.out.print("구구단 중에서 출력하고 싶은 단을 입력하시오: ");
		Scanner sc = new Scanner(System.in);
		n = sc.nextInt();
		while (i < 10) { // 1부터 9까지 반복
			System.out.println(n + "*" + i + "=" + n * i); // 받은 값*반복=값
			i++; // i 값 증가.
		}

		sc.close();

	}

}
