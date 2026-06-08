package chap05;

class Circle {
	class Point {
		int x, y;

		Point(int x, int y) {
			this.x = x;
			this.y = y;
		}
	}

	int radius;
	Point center;

	Circle(int radius, int x, int y) {
		this.radius = radius;
		this.center = new Point(x, y);
	}

	double calcArea() {
		return 3.14 * radius * radius;
	}
}

public class InnerTest2 {
	public static void main(String[] args) {
		Circle obj = new Circle(10, 0, 0);
		System.out.println("원의 면적="+obj.calcArea());
	}
}
