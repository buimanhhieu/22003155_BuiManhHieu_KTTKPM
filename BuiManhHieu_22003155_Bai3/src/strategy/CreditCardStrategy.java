package strategy;

public class CreditCardStrategy implements PaymentStrategy {
    public double pay(double amount) {
        System.out.println("Thanh toán bằng thẻ tín dụng");
        return amount;
    }
}
