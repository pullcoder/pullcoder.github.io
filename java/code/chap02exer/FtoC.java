package chap02exer;

import java.util.Scanner;

public class FtoC {

	public static void main(String[] args) {
		
		double a_temp;
		double c_temp;
				
		Scanner sc = new Scanner(System.in);
		
		System.out.println("화씨온도를 입력하시오: ");
		a_temp = sc.nextDouble();
		
		c_temp = (a_temp - 32) * (5.0 / 9.0);
		
		sc.close();
		
		System.out.println("섭씨온도는 " + String.format("%.1f", c_temp));
		
	}
}
