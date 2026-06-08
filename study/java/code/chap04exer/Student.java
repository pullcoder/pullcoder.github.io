// exer01
package chap04exer;

public class Student {
	String name;
	String rollno;
	int age;

	Student(String name, String rollno, int age) {
		this.name = name;
		this.rollno = rollno;
		this.age = age;
	}

	void Print() {
		System.out.println("학생의 이름: " + name);
		System.out.println("학생의 학번: " + rollno);
		System.out.println("학생의 나이: " + age);
	}

	public static void main(String[] args) {
		Student st = new Student("이정우", "20260790", 24);
		st.Print();
	}
}
