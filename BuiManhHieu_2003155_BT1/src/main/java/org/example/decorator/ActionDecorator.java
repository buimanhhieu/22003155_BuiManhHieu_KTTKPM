package org.example.decorator;

import org.example.strategy.ActionStrategy;

public abstract class ActionDecorator implements ActionStrategy {
    protected ActionStrategy strategy;

    public ActionDecorator(ActionStrategy strategy) {
        this.strategy = strategy;
    }

    public void execute() {
        strategy.execute();
    }
}
