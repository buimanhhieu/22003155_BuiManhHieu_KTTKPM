package org.example.decorator;

import org.example.strategy.ActionStrategy;

public class LoggingDecorator extends ActionDecorator {

    public LoggingDecorator(ActionStrategy strategy) {
        super(strategy);
    }

    public void execute() {
        System.out.println("[LOG] Start");
        super.execute();
        System.out.println("[LOG] End");
    }
}