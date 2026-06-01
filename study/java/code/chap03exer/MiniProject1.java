package chap03exer;

import java.util.Scanner;

public class MiniProject1 {

	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);

		int answer = (int) (Math.random() * 100);
		int guess;
		int count = 0;
				
		do {
			System.out.print("정답을 추측하여 보시오: ");
			guess = sc.nextInt();
			if(guess<0) {
				System.out.println("음수 불가.");
			}else{
				count++;
				if(guess<answer) System.out.println("HIGH");
				if(guess>answer) System.out.println("LOW");	
			};
		} while (guess != answer);
		
		sc.close();
		
		System.out.println("축하합니다. 시도횟수: "+count);
				
	}
	
}
