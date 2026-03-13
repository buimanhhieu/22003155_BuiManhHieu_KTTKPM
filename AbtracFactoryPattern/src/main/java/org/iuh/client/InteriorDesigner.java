package org.iuh.client;


import org.iuh.factories.FurnitureFactory;
import org.iuh.products.Chair;
import org.iuh.products.CoffeeTable;
import org.iuh.products.Sofa;

public class InteriorDesigner {
    private Chair chair;
    private Sofa sofa;
    private CoffeeTable table;

    public InteriorDesigner(FurnitureFactory factory) {
        this.chair = factory.createChair();
        this.sofa = factory.createSofa();
        this.table = factory.createCoffeeTable();
    }

    public void decorate() {
        chair.sitOn();
        sofa.lieOn();
        table.putCoffee();
    }
}