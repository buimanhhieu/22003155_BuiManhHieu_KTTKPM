package org.factory.logistics;

import org.factory.transport.Transport;
import org.factory.transport.Truck;

public class RoadLogistics extends Logistics {
    @Override
    public Transport createTransport() {
        return new Truck();
    }
}
