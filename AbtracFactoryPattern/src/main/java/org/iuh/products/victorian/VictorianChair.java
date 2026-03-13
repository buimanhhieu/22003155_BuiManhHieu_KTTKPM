package org.iuh.products.victorian;


import org.iuh.products.Chair;

public class VictorianChair implements Chair {
    @Override
    public void sitOn() { System.out.println("Victorian Chair"); }
    @Override
    public boolean hasLegs() { return true; }
}