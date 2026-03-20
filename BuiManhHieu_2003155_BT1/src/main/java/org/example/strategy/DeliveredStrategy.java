package org.example.strategy;

public class DeliveredStrategy implements ActionStrategy {
    public void execute() {
        System.out.println("Đơn hàng đã giao");
    }
}
