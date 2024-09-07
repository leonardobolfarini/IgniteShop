import { stripe } from "@/src/lib/stripe"
import { NextApiRequest, NextApiResponse } from "next"
import { CartDetails } from "use-shopping-cart/core";

interface CheckoutSessionProps{
  priceId: string
  quantity: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { items } = req.body;

  const itemsCheckoutSessionData = items.map((item: CartDetails) => {
    return {
      priceId: item.price_id,
      quantity: item.quantity
    }
  })
  if (req.method != 'POST'){
    return res.status(405).json({ error: 'Method not allowed.'})
  }

  if (!itemsCheckoutSessionData){
    return res.status(400).json({error: 'Price not found.'})
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`
  
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: itemsCheckoutSessionData.map((item: CheckoutSessionProps) => ({
      price: item.priceId,
      quantity: item.quantity
    }))
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}