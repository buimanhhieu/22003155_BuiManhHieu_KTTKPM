package org.iuh.factories;


import org.iuh.products.Chair;
import org.iuh.products.CoffeeTable;
import org.iuh.products.Sofa;
import org.iuh.products.modern.ModernChair;
import org.iuh.products.modern.ModernCoffeeTable;
import org.iuh.products.modern.ModernSofa;

public class ModernFurnitureFactory implements FurnitureFactory {
    @Override
    public Chair createChair() { return new ModernChair(); }
    @Override
    public Sofa createSofa() { return new ModernSofa(); }
    @Override
    public CoffeeTable createCoffeeTable() { return new ModernCoffeeTable(); }
}