import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type { CartItem } from "@/app/types/cart";

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: (items as CartItem[])?.map((item) => {
        const rawAmount = item?.price?.amount;
        const parsedAmount = parseFloat(rawAmount);

        const unitAmount = isNaN(parsedAmount) ? 0 : Math.round(parsedAmount * 100);

        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item?.productName?.original || "Product",
            },
            unit_amount: unitAmount,
          },
          quantity: item?.quantity ?? 1,
        };
      }),

      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe session error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
