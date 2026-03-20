package org.example.state;

import org.example.context.OrderContext;
import org.example.strategy.ActionStrategy;
import org.example.strategy.CancelStrategy;

public class CancelledState implements OrderState {
    public void handle(OrderContext context) {
        ActionStrategy action = new CancelStrategy();
        action.execute();
    }
}
