package chap03arr;

import java.util.ArrayList;

public class ArrayListTest {

	public static void main(String[] args) {
		
		ArrayList<String> list = new ArrayList<>();
		list.add("철수");
		list.add("영희");
		list.add("순신");
		list.add("자영");
		
		for (String obj:list) {
			System.out.print(obj+" ");
		}
		
	}
}
