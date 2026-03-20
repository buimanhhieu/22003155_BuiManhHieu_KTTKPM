package state;

import context.PaymentContext;

public class UnpaidState implements PaymentState {
    public void handle(PaymentContext context, double amount) {
        System.out.println("Đang xử lý thanh toán...");
    }
}