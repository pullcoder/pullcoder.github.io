package chap04;

import javax.swing.JFrame;

public class FrameTest2 {
	public static void main(String[] args) {
		for (int i = 0; i < 10; i++) {
			JFrame f = new JFrame("Frame Test");

			f.setSize(300, 200);
			f.setLocation(i * 30, 20);
			f.setVisible(true);
		}
	}
}
