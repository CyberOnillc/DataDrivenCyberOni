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
import { createPaymentIntent } from "@/lib/externalRequests/stripe";
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
    if (typeof window !== 'undefined') callbackParams.set('callbackUrl', process.env.HOST + '/')
    if (!session) redirect(`/auth/signin?${callbackParams.toString()}`)
    const apiUrl = process.env.HOST
    const cart = await getServiceCart(user.id, prisma)

    // console.log(cart);
    if (cart) {
        items = cart.items
        const total = calculateServiceCartTotal(cart?.items)
        const metadata = {
            cartId: cart.id,
            type: 'service',
            user: user.email
        }
        const intent = cart.items.length > 0 ?
            await createPaymentIntent({
                price: (total / 2) * 100,
                description: `Payment for ${cart.items.map(item => `${item.service?.title}`)} `,
                metadata
            }) :
            { client_secret: "No-items-exist" }
        return (
            <div className="container mx-auto flex flex-col justify-center items-center">
                <Cart clientSecret={intent.client_secret as string} cartId={cart.id} session={session} cartItems={items} />
            </div>
        );

    }
    else {

    }

};

export default CartPage;
