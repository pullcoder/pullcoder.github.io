package chap05;

import java.util.Scanner;

class Movie{
	String title, director;
	Movie(String title,String director){
		this.title = title;
		this.director = director;
	}
}

public class MovieArrayTest {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		Movie[] list = new Movie[2];
		
		for(int i=0;i<list.length;i++) {
			System.out.print("영화제목: ");
			String title = sc.nextLine();
			System.out.print("영화감독: ");
			String director = sc.nextLine();
			list[i] = new Movie(title, director);
		}
		
		sc.close();
		
		for(int i=0;i<list.length;i++) {
			System.out.println("{ "+list[i].title+", "+list[i].director+" }");
		}
	}
}
