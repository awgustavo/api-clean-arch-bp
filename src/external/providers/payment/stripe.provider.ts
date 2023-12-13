import Stripe from 'stripe';

export type ProductPrice = {
  productID: string;
  priceID: string;
}

export class StripeProvider {
    async checkout(successPageUrl: string, cancelPageUrL: string): Promise<string> {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: '{{PRICE_ID}}',
            
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${successPageUrl}?success=true`,
        cancel_url: `${cancelPageUrL}?canceled=true`,
      });
    
      return  session.url;
    }

    async addProduct(name: string, price: number,  currency: string): Promise<ProductPrice> {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const product = await stripe.products.create({
        name,
        default_price_data: {
          unit_amount: price,
          currency,
        },
        expand: ['default_price'],
      });

      const priceOfProduct = await stripe.prices.create({
        product: product.id,
        unit_amount: price,
        currency: currency,
      }); 

      return {
        productID: product.id,
        priceID: priceOfProduct.id
      }
    }
}