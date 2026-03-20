package context;

import state.PaidState;
import state.PaymentState;
import strategy.PaymentStrategy;

public class PaymentContext {
    private PaymentState state;
    private PaymentStrategy strategy;

    public void setState(PaymentState state) {
        this.state = state;
    }

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void process(double amount) {
        state.handle(this, amount);
        double finalAmount = strategy.pay(amount);
        System.out.println("Số tiền cuối: " + finalAmount);
        setState(new PaidState());
    }
}
