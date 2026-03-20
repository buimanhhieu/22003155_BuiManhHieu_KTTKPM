package context;

import state.TaxState;

public class TaxContext {
    private TaxState state;

    public void setState(TaxState state) {
        this.state = state;
    }

    public double calculate(double price) {
        return state.applyTax(price);
    }
}