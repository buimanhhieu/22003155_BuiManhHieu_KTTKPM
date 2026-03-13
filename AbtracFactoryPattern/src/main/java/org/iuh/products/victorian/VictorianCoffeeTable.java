package org.iuh.products.victorian;

import org.iuh.products.CoffeeTable;

public class VictorianCoffeeTable implements CoffeeTable {
    @Override
    public void putCoffee() { System.out.println("Victorian Coffee Table"); }
    @Override
    public String getSize() { return "120x120cm"; }
}