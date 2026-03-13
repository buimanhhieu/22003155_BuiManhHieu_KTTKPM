package org.iuh.products.modern;


import org.iuh.products.Sofa;

public class ModernSofa implements Sofa {
    @Override
    public void lieOn() { System.out.println("Modern Sofa"); }
    @Override
    public boolean isComfortable() { return true; }
}