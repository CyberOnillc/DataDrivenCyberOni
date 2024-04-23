import { PaymentStatus, PrismaClient } from "@prisma/client";
import { CreateServicePaymentDTO } from "./DTOs";

export const createServicePayment = async (payment: CreateServicePaymentDTO, prisma: PrismaClient) => {
    try {
        const { paymentId, cartId } = payment;

        const createdServicePayment = await prisma.servicePayment.create({
            data: {
                status: PaymentStatus.PAID,
                paymentId: paymentId,
                order: {
                    connect: {
                        id: cartId,
                        
                    }

                }
            },
        });

        return createdServicePayment;
    } catch (error) {
        console.error('Error creating service payment:', error);
        throw error;
    }
};