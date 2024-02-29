'use client'
import { CartElement, Elements } from '@stripe/react-stripe-js';
import { getCookie } from "cookies-next";

import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../CheckoutForm";
import useTheme from "@/lib/hooks/use-theme";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

function PaymentModal(props: { clientSecret: string, cartId: string, active: boolean, activationError: string, redirect:string, checkoutMessage?:string }) {
    const { theme } = useTheme();


    return (
        <div className="flex items-center justify-center  text-black ">

            <Elements stripe={stripePromise} options={{
                clientSecret: props.clientSecret,
                appearance: {
                    theme: theme === 'dark' ? 'night' : 'stripe',
                    labels: "above",
                    variables: {

                    }
                }

            }}>
                <CheckoutForm {...props} message={props.checkoutMessage} />
            </Elements>
        </div>


    );
}

export default PaymentModal;