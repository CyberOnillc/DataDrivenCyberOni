import {  isSubscritpionActive } from "@/lib/externalRequests/stripe";
import { PrismaClient } from "@prisma/client";


export type CreatePaymentDTO = {
    email: string
    price: string,
    subscriptionId: string,
    invoice: string

}
export async function createPaymentRecord(payment: CreatePaymentDTO, prisma: PrismaClient) {
    const payments = prisma.payment;
    // console.log(payment);
    const newPayment = await payments.create({
        data: {
            price: payment.price,
            customer: { connect: { email: payment.email } },
            subscriptionId: payment.subscriptionId,
            invoice: payment.invoice

            

        }
    })

    return newPayment
}


export async function isActive(email: string, prisma: PrismaClient) {

}


export async function getPayments(email: string, prisma: PrismaClient) {
    const payments = prisma.payment;
    const records = await payments.findMany({
        where: {
            customer: {
                email: email,
            }

        }, orderBy: {
            createdAt: 'desc'
        }
    })

    let active: boolean
    // console.log(records);
    if (records.length == 0) {
        active = false;
    }
    else {
        active = await isSubscritpionActive(records[0].subscriptionId)

    }


    return { invoices: records, active }

}