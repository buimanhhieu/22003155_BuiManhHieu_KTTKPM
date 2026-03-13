package org.iuh.factories;

import org.iuh.products.Chair;
import org.iuh.products.CoffeeTable;
import org.iuh.products.Sofa;

public interface FurnitureFactory {
    Chair createChair();
    Sofa createSofa();
    CoffeeTable createCoffeeTable();
}