package org.example.strategy;

public class CancelStrategy implements ActionStrategy {
    public void execute() {
        System.out.println("Hủy đơn và hoàn tiền");
    }
}