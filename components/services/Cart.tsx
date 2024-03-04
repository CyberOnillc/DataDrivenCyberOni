'use client'
import React, { Dispatch, useEffect, useMemo, useState } from 'react';
import CartItem from './CartItem';
import { Discount, ServiceCartItem, SubService } from "@prisma/client";
import { DisplayServiceCartDTO, DisplayServiceCartItemDTO, UpdateServiceCartItemDTO } from "@/crud/DTOs";
import { calculateDiscountedPrice, calculateServiceCartTotal } from "@/lib/utils";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import CalendlyPopup from "../Calendly";
import Link from "next/link";
import { useNotify } from "../Notification";
import PaymentModal from "../PaymentWrapper";
import { MoveRight, X } from "lucide-react";
import LabelInput from "../shared/label-input";
import { PaymentIntent } from "@stripe/stripe-js";

import FormLoading from "../shared/Form-loading";

const Cart = ({ cartItems, appliedDiscounts, session, cartId, intent }: { cartItems: DisplayServiceCartItemDTO[], appliedDiscounts?: Discount[], session: Session, cartId: string, intent: PaymentIntent }) => {

    const router = useRouter();
    const notify = useNotify();


    const [scheduled, setScheduled] = useState(false);
    const [secret, setSecret] = useState(intent.client_secret);
    const [currentIntent, setCurrentIntent] = useState(intent);

    const [discounts, setDiscounts] = useState<Discount[]>(appliedDiscounts || []);
    const [unAppliedDiscount, setUnAppliedDiscount] = useState<Discount | undefined>();
    const [deleteDiscount, setDeleteDiscount] = useState<Discount | undefined>();

    const [loading, setLoading] = useState(false);



    const total = useMemo(() => {
        return calculateDiscountedPrice(calculateServiceCartTotal(cartItems), discounts)
    }, [cartItems, discounts])

    const user = useMemo(() => {

        return session?.user as { id: string, email: string }

    }, [session?.user])

    async function updateCart(itemId: string, items: SubService[]) {
        const body: UpdateServiceCartItemDTO = {
            userId: (session?.user as { id: string })?.id,
            description: `adding Service with addons ${''}`,
            addons: items.map(item => ({ id: item.id })),
            cartItemId: itemId
        }
        const res = await fetch(`/api/cart/services/${(session?.user as { id: string })?.id}`, { method: 'PUT', body: JSON.stringify(body) })
        router.refresh()

    }

    useEffect(() => {

        async function applyDiscounts(newDiscounts: Discount[]) {
            setLoading(true);
            try {
                await updateDiscounts(newDiscounts, user.id, currentIntent.id);
                const newIntent = await updateIntent(cartItems, newDiscounts, currentIntent.id)
                setLoading(false);
                notify('Total Price Updated Successfully', 'success')
                setDiscounts(newDiscounts);
                setCurrentIntent(newIntent)
            } catch (error) {
                setLoading(false);
                notify('Failed to update price', 'fail')

                console.log(error);
                return

            }



        }
        // if (discounts.length > 0 && discounts.length !== appliedDiscounts?.length) applyDiscounts()

        if (unAppliedDiscount) {

            applyDiscounts([...discounts, unAppliedDiscount as Discount])
            setUnAppliedDiscount(undefined)
        }
        if (deleteDiscount) {

            applyDiscounts(discounts.filter(discount => (discount.name.toUpperCase() !== deleteDiscount.name.toUpperCase())))
            setDeleteDiscount(undefined)
        }

    }, [unAppliedDiscount, deleteDiscount, cartItems, currentIntent.id, discounts, notify, user.id]);


    return (
        <div className="container mx-auto p-4">
            {loading && <FormLoading />}

            <h2 className="text-2xl font-bold mb-4 text-center py-4 border-b-2 ">Cart</h2>
            {cartItems.length === 0 ? (
                <div className="flex flex-col gap-5 justify-center items-center">
                    <p className="text-center my-10">Your cart is empty.</p>
                    <Link href={'/services'} className="flex justify-center items-center gap-4 hover:text-blue-400">Find services <MoveRight /></Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row w-full px-5 gap-5">
                    <div className="lg:w-1/2">
                        {cartItems.map((item, index) => (
                            <CartItem key={index} updateCart={updateCart} item={item} />
                        ))}
                        <div>
                            <AppliedDiscounts discounts={discounts} setDeleteDiscount={setDeleteDiscount} />
                        </div>
                        <div className="my-4 flex justify-between items-center">
                            <div>
                                <ApplyDiscount
                                    discounts={discounts}
                                    setDiscount={setUnAppliedDiscount}
                                />
                            </div>
                            <div className="">
                                <p className="text-lg font-semibold">Total: ${total}</p>
                            </div>
                        </div>
                        <div className="w-full text-center flex justify-center" onClick={() => setScheduled(true)}>
                            <CalendlyPopup CTAText="Click to schedule" className="rounded-lg text-gray-900 dark:text-inherit bg-gray-300 dark:bg-gray-700 p-2 hover:shadow-lg hover:underline " />
                        </div>
                    </div>


                    <div className="lg:w-1/2">
                        {secret &&
                            <PaymentModal
                                amount={total * 100/2}
                                redirect={`${process.env.HOST}/onboarding?cartId=${cartId}`}
                                checkoutMessage="Save 10% By Choosing to pre purchase services, you will be charged 50% of the total cost  of the project. And receive priority booking privileges."
                                active={scheduled} activationError="schedule meeting before payment"
                                cartId={cartId}
                                clientSecret={currentIntent.client_secret as string} />}
                    </div>

                </div>
            )}

        </div>
    );
};

function ApplyDiscount({ discounts, setDiscount }: { discounts: Discount[], setDiscount: Dispatch<Discount> }) {

    const [discountCode, setDiscountCode] = useState("");
    const notify = useNotify();

    async function AddDiscount() {
        const existing = await checkIfExist(discountCode);
        const added = discounts.some((discount) => (discount.name === discountCode))
        if (added) {
            notify('Discount added Already', 'fail', { autoClose: true })
            setDiscountCode("")
            return
        }
        if (existing) {
            setDiscount(existing)
        }
        else {
            notify('Discount Code invalid', 'fail', { autoClose: true });

        }
        setDiscountCode("")

    }
    return (
        <div className="flex gap-2 justify-center items-center">
            <LabelInput value={discountCode} onChange={(e) => setDiscountCode(e.target.value.toUpperCase())} label="Discount Code" />
            <button onClick={AddDiscount} type="button" className="bg-blue-500 rounded-md text-white p-2 py-4 h-fit">Apply Discount</button>
        </div>
    )
}


function AppliedDiscounts({ discounts, setDeleteDiscount }: { discounts: Discount[], setDeleteDiscount: Dispatch<Discount> }) {


    function removeDiscount(discount: Discount) {
        setDeleteDiscount(discount)
    }

    return <div className="flex flex-wrap my-4">
        {discounts.map((discount, index) => (
            <div key={index} className="flex items-center gap-2 justify-between rounded-3xl border bg-blue-200 p-2 hover:shadow-md">
                <p className="text-gray-500 m-0">{discount.name.toUpperCase()}</p>
                <button onClick={() => removeDiscount(discount)} className="hover:text-red-500">
                    <X className="p-1 text-red-400" />
                </button>
            </div>
        ))}
    </div>
}


async function updateDiscounts(discounts: Discount[], userId: string, intentId: string) {

    const res = await fetch(`/api/cart/services/discount/${userId}`,
        {
            method: 'POST', body: JSON.stringify({
                discounts: discounts.map(discount => discount.name)
            }),
        })
    if (res.status == 200) {
        const newCart = await res.json() as DisplayServiceCartDTO
        return newCart
    }

}


async function updateIntent(cartItems: DisplayServiceCartItemDTO[], discounts: Discount[], intentId: string) {

    const res = await fetch(`/api/stripe/intent`, {
        method: 'PUT',
        body: JSON.stringify({
            price: calculateDiscountedPrice(calculateServiceCartTotal(cartItems), discounts)/2,
            intentId: intentId
        })

    })

    return (await res.json()) as PaymentIntent
}

async function checkIfExist(discount: string) {

    const res = await fetch(`/api/discounts/${discount}`)

    if (res.status === 200) {

        const discount = (await res.json()).data as Discount;
        return discount
    }
    return false
}


export default Cart;
