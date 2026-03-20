import context.TaxContext;
import state.LuxuryState;
import state.NormalState;

public class Main {
    public static void main(String[] args) {
        TaxContext context = new TaxContext();

        context.setState(new NormalState());
        System.out.println("Giá sau thuế (thường): " + context.calculate(100));

        context.setState(new LuxuryState());
        System.out.println("Giá sau thuế (xa xỉ): " + context.calculate(100));
    }
}