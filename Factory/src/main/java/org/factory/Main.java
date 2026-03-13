package org.factory;

import org.factory.logistics.Logistics;
import org.factory.logistics.RoadLogistics;
import org.factory.logistics.SeaLogistics;

public class Main {
    public static void main(String[] args) {

        System.out.println("Gia su giao hang bang duong bo");
        Logistics roadLogistic = new RoadLogistics();
        roadLogistic.planDelivery();
        System.out.println("Gia su giao hang bang duong thuy");
        Logistics seaLogistic = new SeaLogistics();
        seaLogistic.planDelivery();

    }
}