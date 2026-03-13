package org.iuh.products.modern;

import org.iuh.products.CoffeeTable;

public class ModernCoffeeTable implements CoffeeTable {
    @Override
    public void putCoffee() { System.out.println("Modern Sofa"); }
    @Override
    public String getSize() { return "80x80cm"; }
}