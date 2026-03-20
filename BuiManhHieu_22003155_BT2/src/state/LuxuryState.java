package state;

import decorator.AdditionalTaxDecorator;
import strategy.LuxuryTaxStrategy;
import strategy.TaxStrategy;
import strategy.VATStrategy;

public class LuxuryState implements TaxState {
    public double applyTax(double price) {
        TaxStrategy tax = new AdditionalTaxDecorator(new LuxuryTaxStrategy());
        return price + tax.calculate(price);
    }
}