import PaymentModal from "@/components/PaymentWrapper"
import React from 'react'
import prisma from "@/lib/prisma"
import { createPaymentIntent } from "@/lib/externalRequests/stripe"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/nextAuthAdapter"
import { getServiceCart } from "@/crud/cart"
import { calculateServiceCartTotal } from "@/lib/utils"
import { DisplayServiceCartItemDTO } from "@/crud/DTOs"
async function PaymentPage() {

  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/signin')

  const user = session.user as { id: string, email: string };
  const cart = await getServiceCart(user.id, prisma)

  const total = calculateServiceCartTotal(cart?.items )
  const metadata = {
    cartId: cart.id,
    type: 'service',
    user: user.email
  }
  const intent = await createPaymentIntent({ price: total * 100, description: `Payment for ${cart.items.map(item => `${item.service?.title}`)} `, metadata })
  return (
    <div>
      {/* <CheckoutServices services={services.records} /> */}
      {/* <PaymentModal cartId={cart.id} clientSecret={intent.client_secret as string}></PaymentModal> */}
    </div>
  )
}

export default PaymentPage