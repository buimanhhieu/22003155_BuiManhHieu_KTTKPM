package org.factory.transport;

public class Ship implements Transport{
    @Override
    public void deliver() {
        System.out.println("giao hang bang Ship");
    }
}
