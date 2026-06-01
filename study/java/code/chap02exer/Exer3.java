package chap02exer;

import java.util.Scanner;

public class Exer3 {

	public static void main(String[] args) {
		
		int money;
		int product;
		int surtax;
		int change;
		
		Scanner sc = new Scanner(System.in);
		
		System.out.print("받은 돈: ");
		money = sc.nextInt();
		
		System.out.print("상품 가격: ");
		product = sc.nextInt();
		
		surtax = product / 10;
		change = money - product;
		
		System.out.println("부가세: "+surtax);
		System.out.println("잔돈: "+change);
		
		sc.close();
		
	}
}
