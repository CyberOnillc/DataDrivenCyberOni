/**
 * @jest-environment node
 */

import { describe, expect, test, it } from '@jest/globals';
import prisma from "@/lib/prisma";
import { createPaymentIntent, updatePaymentIntent } from "@/lib/externalRequests/stripe";

describe('Testing Stripe unit functions', () => {
    let clientSecret = ""
    it('should successfully create an payment intent searched service', async () => {
        const intent = await createPaymentIntent({
            price: 50000,
            description: 'Payment intent test'
        })
        expect(intent.amount).toBe(50000)
        clientSecret = intent.id as string
        
    });
    it('should successfully retrieve an payment intent with client secret', async () => {
        const intent = await updatePaymentIntent({
            intentId: clientSecret,
            price: 60000,
        })
        expect(intent.amount).toBe(60000)
    });



});
