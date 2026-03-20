package decorator;

import strategy.PaymentStrategy;

public class DiscountDecorator extends PaymentDecorator {

    public DiscountDecorator(PaymentStrategy strategy) {
        super(strategy);
    }

    public double pay(double amount) {
        double discount = amount * 0.1;
        System.out.println("Giảm giá: " + discount);
        return super.pay(amount - discount);
    }
}
