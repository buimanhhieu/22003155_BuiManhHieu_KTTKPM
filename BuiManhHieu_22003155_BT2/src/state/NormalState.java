package state;

import strategy.TaxStrategy;
import strategy.VATStrategy;

public class NormalState implements TaxState {
    public double applyTax(double price) {
        TaxStrategy tax = new VATStrategy();
        return price + tax.calculate(price);
    }
}
