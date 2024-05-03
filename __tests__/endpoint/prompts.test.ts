/**
 * @jest-environment node
 */

import {GET, DELETE, PUT} from '@/app/api/prompts/[id]/route'
import {POST as addPromptHandler} from '@/app/api/prompts/add/route'
import { createMocks } from 'node-mocks-http'
import { describe, expect, test, it, beforeAll } from '@jest/globals';
import { CreateGptPromptDTO, CreateImageDTO, CreateTagDTO } from "@/crud/DTOs";
import { GptPrompt } from "@prisma/client";
import { NextRequest } from "next/server";


describe('Testing Prompts Api', () => {
    const mockPrompt: CreateGptPromptDTO = {
        description: 'Sample prompt for GPT',
        title: 'Creative Prompt',
        model: 'gpt-3.5-turbo',
        seed: 1,
        conversationStarters: [],
        startPhrase: "start phrsase",
        steps: [],
        stream: false,
        sysCommands: {},
        toolChoice: '',
        tools: [],
        variables: [],        
        prompt: 'Generate creative text using GPT-3.5!',
        temperature: 0.7,
        max_tokens: 100,
        top_p: 0.9,
        best_of: 3,
        frequency_penalty: 0.5,
        presence_penalty: 0.3,
        stop: ['stopword1','stopword2','stopword3'],
        timesUsed: 5,
        timesIntegrated: 2,
        costPerToken: 0.01,
        profitMargin: 0.2, // 20%
        image: [{ name: 'Prompt Image', src: 'https://picsum.photos/200' }] ,
        tags: [
            { name: 'Tech' },
            { name: 'Mobile' },
        ] as CreateTagDTO[],

    };

    let createdPrompt: GptPrompt;


    it('Adds a product to the test database', async () => {
        const req  = new NextRequest('http://localhost:3000/api/prompts/add', {
            method: 'POST',
            body: JSON.stringify(mockPrompt)
        })

        const response = await addPromptHandler(req);

        expect(response.status).toEqual(200);
        createdPrompt = (await response.json()).data;
    },10000);
    it('delete Prompt', async () => {
        const req  = new NextRequest('http://localhost:3000/api/prompts', {
            method: 'DELETE',
        })
        const response = await DELETE(req, { params: { id: createdPrompt.id } });
        expect(response.status).toBe(200)
    },10000)

});
