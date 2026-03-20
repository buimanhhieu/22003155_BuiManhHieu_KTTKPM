package org.example.state;

import org.example.context.OrderContext;
import org.example.decorator.LoggingDecorator;
import org.example.strategy.ActionStrategy;
import org.example.strategy.CheckOrderStrategy;

public class NewOrderState implements OrderState {
    public void handle(OrderContext context) {
        ActionStrategy action = new LoggingDecorator(new CheckOrderStrategy());
        action.execute();
    }
}

