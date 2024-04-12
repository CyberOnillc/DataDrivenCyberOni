import stripe from "stripe";
import prisma from "../prisma";
import { createServicePayment } from "@/crud/payments";
import { updateServiceCartStatus } from "@/crud/cart";
import { updatePaymentStatus } from "./sendgrid";
import { createPaymentRecord } from "@/crud/payment";
import { upsertAccount } from "./notion";
const client = new stripe(process.env.STRIPE_API_KEY as string)
const endpointSecret = process.env.STRIPE_WEB_SECRET as string
const startDate = new Date("2023-11-01"); // Start date of the trial
const currentDate = new Date(); // Current date
const endDate = new Date("2024-01-01")
const remainingDays = Math.ceil(
    (endDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24),
);

// endDate.setDate(startDate.getDate() + 60); // End date of the trial

// console.log(startDate.toTimeString(), startDate.getTime());

export async function verifyWebhook(signature: string, body: string | Buffer) {
    const event = client.webhooks.constructEvent(
        body,
        signature,
        endpointSecret
    )
    return event
}

export async function processStripeEvent(event: stripe.Event) {

    if (event.type === 'payment_intent.succeeded' && event.data.object['metadata'] && event.data.object.metadata['cartId']) {
        const cartId = event.data.object.metadata['cartId']
        const cart = await updateServiceCartStatus(cartId, 'PAID', prisma)
        const payment = await createServicePayment({
            paymentId: event.data.object.id,
            cartId: cartId
        }, prisma)
    }


    if (event.type == "invoice.paid" && event.data.object.status === 'paid') {

        await createPaymentRecord({
            email: event.data.object.customer_email as string,
            price: event.data.object.total.toString(),
            subscriptionId: event.data.object.subscription as string,
            invoice: event.data.object.invoice_pdf as string
        }, prisma)

        await updatePaymentStatus(event.data.object.customer_email as string, true, "CyberOni Project Completed") //  verify list name as in SendGrid
        await upsertAccount(
            {
                'Email': { type: 'email', content: event.data.object.customer_email as string },
                'Payment_active': { type: "checkbox", content: true },

            })
    }

    if (event.type == "invoice.payment_failed") {
        await updatePaymentStatus(event.data.object.customer_email as string, false, "CyberOni Project Completed") // verify list name as in SendGrid
        await upsertAccount(
            {
                'Email': { type: 'email', content: event.data.object.customer_email as string },
                'Payment_active': { type: "checkbox", content: false },

            })
    }

}


export async function createPaymentIntent({ price, description, metadata }: { price: number, description: string, metadata?: Record<string, string> }) {

    const paymentIntent = await client.paymentIntents.create({

        amount: price!,
        currency: "usd",
        description: description,
        metadata: metadata,
        payment_method_types: [
            'card',
            'cashapp',
            'afterpay_clearpay',
            'klarna'

        ]

    });
    return paymentIntent

}

export async function updatePaymentIntent({ price, description, metadata, intentId }: { intentId: string, price: number, description?: string, metadata?: Record<string, string> }) {

    const paymentIntent = await client.paymentIntents.retrieve(intentId)
    const newPaymentIntent = await client.paymentIntents.update(paymentIntent.id, {

        amount: price!,
        currency: "usd",
        payment_method_types: [
            'card',
            'cashapp',
            'afterpay_clearpay',
            'klarna'

        ]

    });
    return newPaymentIntent

}


export async function createSubscription(priceId: string, customerId: string, paymentMehtod: string) {
    // console.log(paymentMehtod);

    const subscription = await client.subscriptions.create({
        customer: customerId,
        description: "Aparment guru hosting",
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        payment_settings: {
            save_default_payment_method: "on_subscription",
        },
        default_payment_method: paymentMehtod,
        expand: ["latest_invoice.payment_intent", "customer"],
    });

    const resp = await client.invoices.pay((subscription.latest_invoice as stripe.Invoice).id as string, {
        payment_method: paymentMehtod
    })



    return { status: resp.status === 'paid' ? 'active' : subscription.status }

}


export async function updateSubscription(subscriptionId: string, update: { paymentMehtod: string }) {
    const current = await client.subscriptions.retrieve(subscriptionId, { expand: ['items', 'plan'] });

    const subscription = await client.subscriptions.update(subscriptionId, {
        default_payment_method: update.paymentMehtod,
    })
    // console.log(subscription.latest_invoice);

    // try payment method
    if (subscription.status === 'past_due' || subscription.status === 'unpaid' || subscription.status === 'incomplete') {
        const resp = await client.invoices.pay(subscription.latest_invoice as string, {
            payment_method: update.paymentMehtod
        })
        const status = resp.paid ? 'active' : 'failed'
        return { status }
    }

    return subscription


    // console.log(resp);


}

export async function findExisitingSubscription(subId: string) {
    const response = await client.subscriptions.retrieve(subId, { expand: ['latest_invoice'] })
    return response
}
export async function cancelSubscription(subscriptionId: string) {
    const response = await client.subscriptions.cancel(subscriptionId, {
        cancellation_details: {
            comment: 'User Unsubscribed'
        },

    });
    return response
}


export async function getPrice(id: string) {
    const price = await client.prices.retrieve(id, { expand: ['product'] });
    const product = price.product as stripe.Product;
    return { price: price.unit_amount, description: product.description, name: product.name };

}

export async function getIntent(id: string) {
    const intent = await client.setupIntents.retrieve(id);
    return intent
}

export async function getInvoices(id: string) {
    const invoice = await client.setupIntents.retrieve(id);
    return invoice
}


export async function updatePaymentMethod(customerId: string, paymentMethodId: string) {
    await client.paymentMethods.attach(paymentMethodId, {
        customer: customerId

    })
}

export async function getCustomer(id: string) {

    const customer = await client.customers.retrieve(id)
    //console.log(customer);
    return customer as stripe.Customer

}

export async function isSubscritpionActive(id: string) {
    const subscription = await client.subscriptions.retrieve(id);
    return subscription.status === 'active' || subscription.status === 'trialing'
}

export async function processServicepayment() {


}
