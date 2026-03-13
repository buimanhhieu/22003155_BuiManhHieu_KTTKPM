package org.factory.transport;

public class Truck implements Transport {
    @Override
    public void deliver() {
        System.out.println("Giao hang bang truck");
    }
}
