// pages/cart.tsx
import React, { useState } from 'react';
import Cart from "@/components/services/Cart";
import { getServiceCart } from "@/crud/cart";
import prisma from "@/lib/prisma";
import { DisplayServiceCartDTO, DisplayServiceCartItemDTO } from "@/crud/DTOs";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuthAdapter";
import { redirect } from "next/navigation";
import { calculateServiceCartTotal } from "@/lib/utils";
import { createPaymentIntent, updatePaymentIntent } from "@/lib/externalRequests/stripe";
import { cookies } from "next/headers";
type CartItem = {
    id: string;
    name: string;
    price: number;
    addons: string[];
};
interface CartProps {
    searchParams: { cartId: string; }
}


export const dynamic = 'force-dynamic'
const CartPage: React.FC<CartProps> = async ({ searchParams }) => {
    let items = [] as DisplayServiceCartItemDTO[];
    const session = await getServerSession(authOptions)
    const user = session?.user as { id: string, email: string }
    const callbackParams = new URLSearchParams()
    if (typeof window !== 'undefined') callbackParams.set('callbackUrl', process.env.HOST + '/');
    if (!session) redirect(`/auth/signin?${callbackParams.toString()}`);
    const apiUrl = process.env.HOST
    const cart = await getServiceCart(user.id, prisma);
    const cookieStore = cookies();


    // console.log(cart);
    if (cart) {
        items = cart.items
        const total = calculateServiceCartTotal(cart?.items, cart?.discounts)
        const metadata = {
            cartId: cart.id,
            type: 'service',
            user: user.email
        }

        const clientSecret = cookieStore.get('intentId');
        let intent


        if (clientSecret && clientSecret?.value) {

            const res = await fetch(`${apiUrl}/api/stripe/intent`, {
                method: 'PUT', body: JSON.stringify({
                    intentId: clientSecret.value,
                    price: (total / 2) * 100,
                    description: `Payment for ${cart.items.map(item => `${item.service?.title}`)} `,
                    metadata

                })
            })
            intent = await res.json()


        } else {

            const res = await fetch(`${apiUrl}/api/stripe/intent`, {
                method: 'POST', body: JSON.stringify({
                    price: (total / 2) * 100,
                    description: `Payment for ${cart.items.map(item => `${item.service?.title}`)} `,
                    metadata

                })
            })
            intent = await res.json()

        }

        return (
            <div className="container mx-auto flex flex-col justify-center items-center">
                <Cart appliedDiscounts={cart.discounts} intent={intent} cartId={cart.id} session={session} cartItems={items} />
            </div>
        );

    }
    return <></>

};

export default CartPage;
