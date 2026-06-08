// exer02
package chap04exer;

public class Dog {

	String breed;
	int age;
	String color;

	private String barking(String bk) {
		return bk;
	}

	private String hungry(boolean hg) {
		if (hg) {
			return "배고픔";
		} else {
			return "안고픔";
		}
	}

	private String sleeping(boolean sp) {
		if (sp) {
			return "졸림";
		} else {
			return "안졸림";
		}
	}

	Dog(String breed, int age, String color) {
		this.breed = breed;
		this.age = age;
		this.color = color;
	}

	void Print() {
		System.out.println("(" + breed + "," + age + "," + color + ")");

	}

	public static void main(String[] args) {
		Dog animal = new Dog("york", 1, "orange");
		animal.Print();
		animal.barking("왈왈");
		animal.hungry(true);
		animal.sleeping(false);
		System.out.println(animal.barking("왈왈"));
		System.out.println(animal.hungry(true));
		System.out.println(animal.sleeping(false));
	}
}
