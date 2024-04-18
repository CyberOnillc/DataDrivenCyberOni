/**
 * @jest-environment node
 */
import { textCompletion } from "@/lib/externalRequests/martian";
import { describe, expect, it, afterAll } from "@jest/globals";
import { StreamingTextResponse } from "ai";
import { ChatCompletion } from "openai/resources";


describe('Testing martian functions', () => {
    const prompt = "hello,this is test prompt"
    it('test textCompletion ', async () => {

        const response = await textCompletion(prompt, []) as ChatCompletion;
        expect(response).toBeDefined() 
        expect(response.choices.length).toBeGreaterThan(0);
        expect(response.choices[0].message.content).toBeDefined()
    }, 30000)


    it('test textCompletion with streaming', async () => {

        const response = await textCompletion(prompt, [], {stream:true}) as StreamingTextResponse;

        expect(response).toBeDefined()
        

        const reader = response.body?.getReader();

        const text = await new Promise(async (res) => {
            let result = "";
            let streamFinished = false

            while (!streamFinished && reader) {
                const { done, value } = await reader.read();
                if(done) break
                let nextChunk = new TextDecoder().decode(value)

                result = result + nextChunk;
                streamFinished = done

            }

            res(result)


        });

        expect(text).toBeDefined()
        console.log(text);
        
    }, 30000)

})