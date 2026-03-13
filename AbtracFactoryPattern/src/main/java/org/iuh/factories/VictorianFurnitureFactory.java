package org.iuh.factories;
import org.iuh.products.Chair;
import org.iuh.products.CoffeeTable;
import org.iuh.products.Sofa;
import org.iuh.products.victorian.VictorianChair;
import org.iuh.products.victorian.VictorianCoffeeTable;
import org.iuh.products.victorian.VictorianSofa;

public class VictorianFurnitureFactory implements FurnitureFactory {
    @Override
    public Chair createChair() { return new VictorianChair(); }
    @Override
    public Sofa createSofa() { return new VictorianSofa(); }
    @Override
    public CoffeeTable createCoffeeTable() { return new VictorianCoffeeTable(); }
}