import PaymentModal from "@/components/PaymentWrapper"
import CheckoutServices from "@/components/services/Checkout"
import { getAll } from "@/crud/service"
import React from 'react'
import prisma from "@/lib/prisma"
import { createPaymentIntent } from "@/lib/externalRequests/stripe"
async function PaymentPage() {

 

  const intent = await createPaymentIntent({ price: 6000, description: "Payment for following services" })
  return (
    <div>
      {/* <CheckoutServices services={services.records} /> */}
    </div>
  )
}

export default PaymentPage