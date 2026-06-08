// exer04
package chap04exer;

public class Complex {

    double real;
    double imag;

    Complex(double real, double imag) {
        this.real = real;
        this.imag = imag;
    }

    void print() {
        if (imag >= 0)
            System.out.println(real + " + " + imag + "i");
        else
            System.out.println(real + " - " + (-imag) + "i");
    }

    Complex add(Complex other) {
        return new Complex(this.real + other.real, this.imag + other.imag);
    }

    Complex subtract(Complex other) {
        return new Complex(this.real - other.real, this.imag - other.imag);
    }

    Complex multiply(Complex other) {
        double r = this.real * other.real - this.imag * other.imag;
        double i = this.real * other.imag + this.imag * other.real;
        return new Complex(r, i);
    }

    Complex divide(Complex other) {
        double denom = other.real * other.real + other.imag * other.imag;
        double r = (this.real * other.real + this.imag * other.imag) / denom;
        double i = (this.imag * other.real - this.real * other.imag) / denom;
        return new Complex(r, i);
    }

    double abs() {
        return Math.sqrt(real * real + imag * imag);
    }

    Complex conjugate() {
        return new Complex(real, -imag);
    }

    public static void main(String[] args) {
        Complex c1 = new Complex(10, 20);

        c1.print();

        System.out.print("절댓값 = ");
        System.out.println(c1.abs());

        System.out.print("켤레복소수 = ");
        c1.conjugate().print();
    }
}