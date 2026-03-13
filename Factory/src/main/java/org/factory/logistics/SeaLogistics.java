package org.factory.logistics;

import org.factory.transport.Ship;
import org.factory.transport.Transport;

public class SeaLogistics extends Logistics{
    @Override
    public Transport createTransport() {
        return new Ship();
    }
}
