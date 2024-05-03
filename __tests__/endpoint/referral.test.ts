/**
 * @jest-environment node
 */


import { describe, expect, test, it, beforeAll, afterAll } from '@jest/globals';

import {  ReferralType, Referral as ReferralDTO } from "@prisma/client";
import Referral from "@/app/referrals/[prefix]/page";
import { getAll } from "@/crud/referral";
import prisma from "@/lib/prisma";

describe('Testing Referrals endpoint', () => {
    let referral: ReferralDTO;
    let affiliate: ReferralDTO;
    beforeAll(async () => {
        const res = await getAll(1, 10, prisma)

        if (res.records.length > 0) {
            for (const r of res.records) {
                if (r.type === ReferralType.AFFILIATE) {
                    if (!affiliate) affiliate = r
                }
                if (r.type === ReferralType.REDIRECT) {
                    if (!referral) referral = r
                }
            }
        }
    })

    it('process a referral request', async () => {

        if (!referral) throw new Error("referrals  not found")
        expect.assertions(3)
        const url = `${referral.link}?${new URLSearchParams(referral.utmProps as Record<string, string>).toString()}`
        try {
            await Referral({ params: { prefix: referral.prefix! } })
        } catch (error) {
            const err = error as any
            const digest = (err.digest as string).split(';')
            const errorMessage = digest[0];
            const redirectURl = digest[2];
            expect(errorMessage).toBe('NEXT_REDIRECT')
            expect(redirectURl).toBe(url)
        }
        finally {
            expect(1).toBe(1)
        }

    }, 10000);


    afterAll(async () => {
        
       await  prisma.$disconnect()
    })


});
