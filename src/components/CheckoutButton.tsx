"use client";
import { loadStripe } from "@stripe/stripe-js";
import type { CartItem } from "@/app/types/cart";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutButton({ cartItems }: { cartItems: CartItem[] }) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });

    const data = await res.json();

    if (data.id) {
      await stripe?.redirectToCheckout({ sessionId: data.id });
    } else {
      console.error("Stripe session error", data);
    }
  };

  return (
    <button onClick={handleCheckout} className="bg-black text-white px-4 py-2 rounded">
      Proceed to Payment
    </button>
  );
}
