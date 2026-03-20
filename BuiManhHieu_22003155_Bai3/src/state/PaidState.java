package state;

import context.PaymentContext;

public class PaidState implements PaymentState {
    public void handle(PaymentContext context, double amount) {
        System.out.println("Thanh toán thành công");
    }
}
