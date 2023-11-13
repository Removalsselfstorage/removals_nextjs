import useQuote from "@/hooks/useQuote";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export const moveCheckout = async (productId, amount) => {
  try {
    const lineItems = [
      {
        price_data: {
          unit_amount: amount,
          currency: "gbp",
          product: productId,
        },
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

export const invoiceCheckout = async (productId, amount) => {
  try {
    const lineItems = [
      {
        price_data: {
          unit_amount: amount,
          currency: "gbp",
          product: productId,
        },
        quantity: 1,
      },
    ];

    const { session } = await fetch("/api/stripeinvoice/sessions", {
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

export const quoteCheckout = async (productId, amount) => {
  try {
    const lineItems = [
      {
        price_data: {
          unit_amount: amount,
          currency: "gbp",
          product: productId,
        },
        quantity: 1,
      },
    ];

    const { session } = await fetch("/api/stripequote/sessions", {
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

export const moveBalanceCheckout = async (productId, amount) => {
  try {
    const lineItems = [
      {
        price_data: {
          unit_amount: amount,
          currency: "gbp",
          product: productId,
        },
        quantity: 1,
      },
    ];

    const { session } = await fetch("/api/stripemovebalance/sessions", {
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

export const moveExtraCheckout = async (productId, amount) => {
  try {
    const lineItems = [
      {
        price_data: {
          unit_amount: amount,
          currency: "gbp",
          product: productId,
        },
        quantity: 1,
      },
    ];

    const { session } = await fetch("/api/stripemoveextra/sessions", {
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
