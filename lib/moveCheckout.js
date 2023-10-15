import useQuote from "@/hooks/useQuote";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export const moveCheckout = async (moveDetails, price) => {
  const computePriceId = () => {
    switch (moveDetails?.movePackage) {
      case "Standard":
        return "price_1O1VVhA4LmEvtWCnWuQno1NU";
        break;

      case "Gold":
        return "price_1O1VWrA4LmEvtWCnAJCO7fUY";
        break;

      case "Premium":
        return "price_1O1VXKA4LmEvtWCnNCaYJQyG";
        break;

      case "Premium plus":
        return "price_1O1VYAA4LmEvtWCnXFzwlz8L";
        break;

      default:
        break;
    }
  };

  console.log({ price, moveDetails });

  try {
    const lineItems = [
      {
        price,
        quantity: 1,
      },
    ];
    const { session } = await fetch("/api/stripemove/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lineItems }),
    }).then((res) => res.json());

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: session?.id,
    });

    if (error) {
      if (error instanceof Error) throw new Error(error.message);
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
};
