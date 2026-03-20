package state;

import context.PaymentContext;

public interface PaymentState {
    void handle(PaymentContext context, double amount);
}
