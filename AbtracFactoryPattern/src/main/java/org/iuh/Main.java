package org.iuh;
import org.iuh.client.InteriorDesigner;
import org.iuh.factories.FurnitureFactory;
import org.iuh.factories.ModernFurnitureFactory;
import org.iuh.factories.VictorianFurnitureFactory;

public class Main {
    public static void main(String[] args) {
        System.out.println("chon phong cach modern: ");
        FurnitureFactory modernFactory = new ModernFurnitureFactory();
        InteriorDesigner room1 = new InteriorDesigner(modernFactory);
        room1.decorate();
        System.out.println();
        System.out.println("Chon phong cach victorian:");
        FurnitureFactory victorianFactory = new VictorianFurnitureFactory();
        InteriorDesigner room2 = new InteriorDesigner(victorianFactory);
        room2.decorate();
    }
}