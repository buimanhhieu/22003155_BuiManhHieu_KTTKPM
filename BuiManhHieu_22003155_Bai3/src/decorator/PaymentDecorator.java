package decorator;

import strategy.PaymentStrategy;

public abstract class PaymentDecorator implements PaymentStrategy {
    protected PaymentStrategy strategy;

    public PaymentDecorator(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public double pay(double amount) {
        return strategy.pay(amount);
    }
}
