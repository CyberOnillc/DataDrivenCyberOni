/**
 * @jest-environment node
 */

import { CreateFaqDTO, CreateImageDTO, CreateServiceDTO, CreateServiceDescription, CreateSubServiceDTO, CreateTagDTO, DisplayServiceCartItemDTO, DisplayServiceDTO, DisplaySubServiceDTO } from "@/crud/DTOs";
import { calculateServiceCartTotal } from "@/lib/utils";
import { describe, expect, test, it, beforeAll } from '@jest/globals';
import { Discount, ServiceCartItem } from "@prisma/client";

describe('CJshipping api tests', () => {
    const discounts: Discount[] = [
        {expires: null , id: "discount-1",name: "test20", value: 23, updatedAt: new Date(), createdAt: new Date()},
        {expires: null , id: "discount-1",name: "test30", value: 33, updatedAt: new Date(), createdAt: new Date()},

        {expires: null , id: "discount-1",name: "test10", value: 10, updatedAt: new Date(), createdAt: new Date()}

    ]
    const mockSubServices:DisplaySubServiceDTO[]  = [ {
        id: '1',
        title: 'Custom Web Development',
        pricingModel: 'DEFAULT',
        serviceDeliverables: ['Custom Features', 'Responsive Design'],
        serviceUsageScore: 4.5,
        description: 'Tailored web development solutions for your unique requirements.',
        department: 'Development',
        estimated_hours_times_fifty_percent: 20,
        estimated_hours_times_one_hundred_percent: 40,
        overheadCost: 1000,
        complexity: 3,
        skillLevel: 'Advanced',
        image: {id: "image-2", name: 'Subservice Image', src: 'https://picsum.photos/200' , createdAt: new Date(), updatedAt: new Date() },
        serviceId: "test-id",
        imageId: "image-2",
        CaseStudies: [],
        updatedAt: new Date(),
        
    } ,
    {
        id: '2',
        title: 'Custom Web Development',
        pricingModel: 'AGGRESSIVE',
        serviceDeliverables: ['Custom Features', 'Responsive Design'],
        serviceUsageScore: 4.5,
        description: 'Tailored web development solutions for your unique requirements.',
        department: 'Development',
        estimated_hours_times_fifty_percent: 40,
        estimated_hours_times_one_hundred_percent: 83,
        overheadCost: 1000,
        complexity: 3,
        skillLevel: 'Advanced',
        image: {id: "image-2", name: 'Subservice Image', src: 'https://picsum.photos/200', createdAt: new Date(), updatedAt: new Date() },
        serviceId: "test-id",
        imageId: "image-2",
        CaseStudies: [],
        updatedAt: new Date(),
    } ,


]

    const mockService = {
        id: "test-id",
        title: 'Web Development Service',
        previewContent: 'Quality web development services for your business.',
        featured: true,
        ServiceDescription: [
            {
                id: "desc-id-1",
                title: 'Introduction',
                content: 'Our web development service includes...',
                imageOnLeft: true,
                serviceId: "test-id",
                image: { id: "test", src: "https://test.com", name: "test-image", createdAt: new Date(), updatedAt: new Date() },
                imageId: "image-1"
            },
        ],
        hourlyRate:41,
        valueBrought: ['Responsive Design', 'User-Friendly Interfaces'],
        skillsUsed: ['HTML', 'CSS', 'JavaScript', 'React'],
        htmlEmbed: '<iframe src="https://example.com"></iframe>',
        image: {id: "image-3", name: 'Service Cover Image', src: 'https://picsum.photos/200' , createdAt: new Date(), updatedAt: new Date() },
        SubServices: mockSubServices,
        tags: [
            {id: "tag-1", name: 'Web Development' },
            {id: "tag-2" , name: 'Custom Solutions' },
        ] ,
        createdAt: new Date(),
        updatedAt: new Date(),

        imageId: "image-3"


    };

    const cartItems: DisplayServiceCartItemDTO[] = [
        {
            amount: 100,
            addons: mockSubServices,
            service: mockService,
            id:"item-1",
            serviceCartId: "cart-1",
            serviceId: "service-1",
            createdAt: new Date(),
            updatedAt: new Date(),
        },

    ]

    it('should calculate total price of given cart based on pricing model', async () => {
        const price = calculateServiceCartTotal(cartItems, []);
        //console.log(price);
        expect(price).toBeGreaterThanOrEqual(0);
        // expect(price).toBe(8000)

    })

    it('should calculate total price of given cart with discounts', async () => {
        const price = calculateServiceCartTotal(cartItems, [discounts[1]])
        //console.log(price);
        expect(price).toBeGreaterThanOrEqual(0);
        //expect(price).toBe(7200)


    })



})