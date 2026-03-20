package decorator;

import strategy.TaxStrategy;

public class AdditionalTaxDecorator extends TaxDecorator {

    public AdditionalTaxDecorator(TaxStrategy strategy) {
        super(strategy);
    }

    public double calculate(double price) {
        return super.calculate(price) + price * 0.05;
    }
}