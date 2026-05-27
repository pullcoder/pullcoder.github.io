package chap02;

public class BitOperator {

	public static void main(String[] args) {
		
		int x = 0x0fff;
		int y = 0xfff0;
		
		System.out.printf("%x ", (x & y));
		System.out.printf("%x ", (x | y));
		System.out.printf("%x ", (x ^ y));
		System.out.printf("%x ", ~x);
	}
}
