package org.factory.logistics;

import org.factory.transport.Transport;

public abstract class Logistics {
    public abstract Transport createTransport();
    public void planDelivery() {
        Transport t = createTransport();
        t.deliver();
    }
}
