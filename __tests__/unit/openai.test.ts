/**
 * @jest-environment node
 */

import {
    getOpenAiResponse,
    createThread,
    fetchAssistant,
    runAssistant,
    retrieveThread,
    addUserMessageToThread,
    createFile,
    listAssistants,
    deleteThread,
    deleteFile,
    fetchFile,
} from '@/lib/externalRequests/openai'; // Adjust the import path accordingly
import { describe, expect, it, afterAll } from "@jest/globals";
import { ChatCompletionMessageParam, ChatCompletionUserMessageParam, FileObject } from "openai/resources";
import { Assistant } from "openai/resources/beta/assistants/assistants";
import { Thread } from "openai/resources/beta/threads/threads";
import { FileLike } from "openai/uploads";

describe('OpenAI API integration tests', () => {
    let assistant: Assistant
    let thread: Thread
    let file: FileObject
    it.skip('getOpenAiResponse should call the API and return a response', async () => {
        const messages = [{ role: 'user', content: 'Hello' }] as ChatCompletionUserMessageParam[];
        const response = await getOpenAiResponse(messages);
        expect(response).toBeDefined(); // You might want to check specific properties based on your needs

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
    }, 30000);

    it('createThread should initialize a thread and return thread details', async () => {
        const starter = 'Hello, start a thread!, this test thread provide small response for testing';
        const createdThread = await createThread({ starter });
        expect(createdThread).toBeDefined();
        thread = createdThread
        // Optionally, cleanup if necessary
    });

    it('listAssistant should retrieve all assistants', async () => {
        const assistants = await listAssistants();
        expect(assistants).toBeDefined();
        expect(assistants.data.length).toBeGreaterThanOrEqual(0);
        assistant = assistants.data[0];
        console.log(assistants);
    });

    it('fetchAssistant should retrieve assistant details', async () => {
        const assistantId = assistant?.id!; // Replace with a valid assistant ID
        const fetchedAssistant = await fetchAssistant(assistantId);
        expect(fetchedAssistant).toBeDefined();
        expect(fetchedAssistant?.id).toBe(assistant.id)
        console.log(fetchedAssistant);
    });

    it('runAssistant should run the assistant within a thread', async () => {
        // Assuming you have a valid thread and assistant ID
        const threadId = thread.id;
        const assistantId = assistant.id;
        const run = await runAssistant({ threadId, assistantId });
        expect(run).toBeDefined();
        const stream =  run.toReadableStream();
        const reader = stream.getReader()
        const status = await new Promise(async (res) => {

            let result = "";
            let streamFinished = false

            while (!streamFinished && reader) {
                const { done, value } = await reader.read();
                if(done) break
                let nextChunk = new TextDecoder().decode(value)
                console.log("chunk:" , nextChunk);
                result = result + nextChunk;
                streamFinished = done

            }

            res(result)
        })

        console.log(status);
    }, 30000);

    it.skip('retrieveThread should retrieve details of a thread', async () => {
        const threadId = thread.id;
        const fetchedThread = await retrieveThread(threadId);
        expect(fetchedThread).toBeDefined();
    });

    it.skip('addUserMessageToThread should add a message to a thread', async () => {
        const threadId = thread.id;
        const message = 'New message';
        const fileIds = [] as string[]; // Use real file IDs if necessary
        const threadMessage = await addUserMessageToThread(threadId, { message, fileIds });
        expect(threadMessage).toBeDefined();
    });

    it.skip('createFile should create a file and return file details', async () => {
        const blob = new Blob(['test'], { type: 'text/plain' });
        const newFile = new File([blob], 'test-files', { type: 'text/plain' })
        const purpose = 'assistants';
        const createdFile = await createFile(newFile, purpose);
        expect(createdFile).toBeDefined();
        expect(createdFile.filename).toBe('test-files');

        file = createdFile
    });

    it.skip('fetchFile should fetch the required files', async ()=> {
        const fetchedFile = await fetchFile('file-T2fUybmQnvO9tG1VrU4CdFF9');
        console.log(await fetchedFile.text());

        expect(fetchedFile).toBeDefined();

    })

    it.skip('deleteFile should delete a given File', async () => {
        const res = await deleteFile(file.id);

        expect(res).toBe(undefined)
    })

    it.skip('deleteThread should delete a given thread', async () => {
        const res = await deleteThread(thread.id);

        expect(res).toBe(undefined)
    })


});
