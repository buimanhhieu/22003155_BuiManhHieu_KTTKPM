import context.PaymentContext;
import decorator.DiscountDecorator;
import decorator.FeeDecorator;
import state.UnpaidState;
import strategy.CreditCardStrategy;
import strategy.PaymentStrategy;

public class Main {
    public static void main(String[] args) {
        PaymentContext context = new PaymentContext();

        context.setState(new UnpaidState());

        PaymentStrategy payment = new FeeDecorator(
                new DiscountDecorator(
                        new CreditCardStrategy()));

        context.setStrategy(payment);

        context.process(100);
    }
}