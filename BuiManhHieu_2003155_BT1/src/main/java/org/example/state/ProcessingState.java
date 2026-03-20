package org.example.state;

import org.example.context.OrderContext;
import org.example.decorator.LoggingDecorator;
import org.example.strategy.ActionStrategy;
import org.example.strategy.PackagingStrategy;

public class ProcessingState implements OrderState {
    public void handle(OrderContext context) {
        ActionStrategy action = new LoggingDecorator(new PackagingStrategy());
        action.execute();
    }
}
