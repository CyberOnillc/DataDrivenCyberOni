/**
 * @jest-environment node
 */
import {  listHuggingfaceModels, textGeneration } from "@/lib/externalRequests/huggingface";
import { describe, expect, test, it, beforeAll } from '@jest/globals';

describe('API Interaction Functions', () => {
    const token = process.env.HUGGINFACE_API_TOKEN!

    describe('test HuggingFace api', () => {
        it('should successfully call the model and return data', async () => {

            const result = await textGeneration('textGeneration', {modelId:'gpt2', inputs: 'Test input'}, token);
            expect(result).toBeDefined();
        });

        it('should fetch a list of models', async () => {

            const result = await listHuggingfaceModels(token, { query: 'text-generation' });
            expect(result).toBeDefined();
        });
    });


});