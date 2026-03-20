package org.example;

import org.example.context.OrderContext;
import org.example.state.CancelledState;
import org.example.state.DeliveredState;
import org.example.state.NewOrderState;
import org.example.state.ProcessingState;

public class Main {
    public static void main(String[] args) {
        OrderContext order = new OrderContext();

        order.setState(new NewOrderState());
        order.process();

        order.setState(new ProcessingState());
        order.process();

        order.setState(new DeliveredState());
        order.process();

        order.setState(new CancelledState());
        order.process();
    }
}