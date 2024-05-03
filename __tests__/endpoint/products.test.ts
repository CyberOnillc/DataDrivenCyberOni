/**
 * @jest-environment node
 */

import {GET, DELETE, PUT} from '@/app/api/products/[id]/route'
import {POST as addProductHandler} from '@/app/api/products/add/route'
import { createMocks } from 'node-mocks-http'
import { describe, expect, test, it, beforeAll } from '@jest/globals';
import { CreateProductDTO, CreateTagDTO } from "@/crud/DTOs";
import { Product, ProductStatus } from "@prisma/client";
import { CreateImageDTO } from "@/crud/DTOs";
import { NextRequest } from 'next/server';

describe('Testing Products Api', () => {
    const mockProduct: CreateProductDTO = {
        sku: 'ABC123',
        name: 'Sample Product',
        status: ProductStatus.AVAILABLE,
        ratings: 4.5,
        inventory: 100,
        productBreakdown: 'Detailed breakdown goes here',
        shippingReturnPolicy: 'Free shipping and 30-day return policy',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: 49.99,
        profitMargin: 0.2, // 20%
        displayPrice: 59.99,
        subcategory: 'Smartphones',
        suppliers:[],
        tags: [
            { name: 'Tech' },
            { name: 'Mobile' },
        ] as CreateTagDTO[],
        images: [
            { name: 'Image 1', src: 'https://picsum.photos/200' } as CreateImageDTO,
            { name: 'Image 2', src: 'https://picsum.photos/200' } as CreateImageDTO,
        ],
    };

    let createdProduct: Product;


    it('Adds a product to the test database', async () => {
        const req  = new NextRequest('http://localhost:3000/api/products/add', {
            method: 'POST',
            body: JSON.stringify(mockProduct)
        })

        const response = await addProductHandler(req);

        expect(response.status).toEqual(200);
        createdProduct = (await response.json()).data;
    },10000);
    it('delete Product', async () => {
        const req  = new NextRequest('http://localhost:3000/api/products/', {
            method: 'DELETE',
        })

        const response = await DELETE(req, { params: { id: createdProduct.id } });
        expect(response.status).toBe(200)
    },10000)

});
