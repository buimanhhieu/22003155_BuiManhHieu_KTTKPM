package decorator;

import strategy.PaymentStrategy;

public class FeeDecorator extends PaymentDecorator {

    public FeeDecorator(PaymentStrategy strategy) {
        super(strategy);
    }

    public double pay(double amount) {
        double fee = amount * 0.05;
        System.out.println("Phí xử lý: " + fee);
        return super.pay(amount + fee);
    }
}
