package org.iuh.products.modern;


import org.iuh.products.Chair;

public class ModernChair implements Chair {
    @Override
    public void sitOn() { System.out.println("Modern Sofa"); }
    @Override
    public boolean hasLegs() { return true; }
}