package chap02exer;

import java.util.Scanner;

public class Exer4 {
	
	public static void main(String[] args) {
		
		double radius; 
		double volume;
		
		Scanner sc = new Scanner(System.in);
		
		System.out.print("구의 반지름: ");
		radius = sc.nextDouble();
		
		volume = radius * radius * radius * 4 / 3;
		
		System.out.println("구의 부피: "+volume);
		
		sc.close();
		
	}

}
