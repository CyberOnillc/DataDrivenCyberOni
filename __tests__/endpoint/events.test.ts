/**
 * @jest-environment node
 * 
 */

import {GET as getEvent, DELETE as deleteEvent, PUT as updateEvent} from '@/app/api/events/[id]/route'
import {POST as addeventHandler} from '@/app/api/events/add/route'
import { createMocks } from 'node-mocks-http'
import { describe, expect, test, it, beforeAll } from '@jest/globals';
import { Event } from "@prisma/client";
import { CreateImageDTO, CreateEventDTO } from "@/crud/DTOs";
import { NextRequest } from "next/server";


describe('Testing events Api', () => {
    const mockEvent: CreateEventDTO = {
        name: 'Test Event',
        date: new Date(),
        description: 'test description',
        eventLink: 'http://event.com/',
        isVirtual: false,
        location: 'SF, CA',
        status:"UPCOMING",
        image:[ {src: 'https://picsum.photos/200',name:'test image' }],
        tags: [
            
        ]
       
    };

    let createdevent: Event;


    it('Adds a event to the test database', async () => {
        const req  = new NextRequest('http://localhost:3000/api/bogs/add', {
            method: 'POST',
            body: JSON.stringify(mockEvent)
        })
        const response = await addeventHandler(req);

        expect(response?.status).toEqual(200);
        createdevent = (await response?.json()).data;
    },10000);
    it('delete event', async () => {
        const req  = new NextRequest('http://localhost:3000/api/events/', {
            method: 'DELETE',
        })
        const response = await deleteEvent(req, { params: { id: createdevent.id } });
        expect(response.status).toBe(200)
    },10000)

});
