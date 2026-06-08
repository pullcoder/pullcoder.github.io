// exer05
package chap04exer;

public class Account {

	private int balance = 0;

	public int deposit() {
		return balance;
	}

	public void withdraw(int balance) {
		this.balance = balance;
	}

	public static void main(String[] args) {

		Account customer1 = new Account();
		Account customer2 = new Account();
		
		System.out.println("새로운 계좌가 만들어 졌습니다.");
		System.out.println("50000원 저축");
		customer1.withdraw(50000);
		System.out.println("새로운 계좌가 만들어 졌습니다.");
		System.out.println("100000원 저축");
		customer2.withdraw(100000);
				
		System.out.println("고객 #1 계좌 잔고=" + customer1.deposit());
		System.out.println("고객 #2 계좌 잔고=" + customer2.deposit());
	}

}
