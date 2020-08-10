/**
 * This is a singleton to ensure we only instantiate Stripe once.
 * 
 * see: https://github.com/stripe-samples/nextjs-typescript-react-stripe-js/blob/master/utils/get-stripejs.ts
 */
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    // TODO: parametrize Stripe public key for PRO and BETA
    // stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    stripePromise = loadStripe("pk_live_STtPmOIz0ofohsd3WqPKB4Lo00f5xOj2iB")
  }
  return stripePromise;
};

export default getStripe;
