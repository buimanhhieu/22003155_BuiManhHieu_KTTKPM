package org.iuh.products.victorian;

import org.iuh.products.Sofa;

public class VictorianSofa implements Sofa {
    @Override
    public void lieOn() { System.out.println("Victorian Sofa "); }
    @Override
    public boolean isComfortable() { return false; }
}