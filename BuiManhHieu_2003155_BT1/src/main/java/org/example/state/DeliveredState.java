package org.example.state;

import org.example.context.OrderContext;
import org.example.strategy.ActionStrategy;
import org.example.strategy.DeliveredStrategy;

public class DeliveredState implements OrderState {
    public void handle(OrderContext context) {
        ActionStrategy action = new DeliveredStrategy();
        action.execute();
    }
}