'use server'
import { createPaymentIntent, createSubscription, findExisitingSubscription, updatePaymentMethod, updateSubscription } from "@/lib/externalRequests/stripe"
import { StripeError } from "@stripe/stripe-js";

export async function processSubscriptionRequest(priceId: string, customerId: string, paymentMehtod: string, subscriptionId?: string) {
    
    try {

    } catch (error) {
            console.log((error as StripeError).message);
            return (error as StripeError).message
    }


}