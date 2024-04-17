import "server-only"
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function getOpenAiResponse(messages: OpenAI.Chat.Completions.ChatCompletionUserMessageParam[]) {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages,
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)

}


export async function createThread({ starter, files }: { starter: string, files?: { id: string }[] }) {
    const thread = await openai.beta.threads.create({
        messages: [
            {
                "role": "user",
                "content": `${starter}`,
                "file_ids": files?.map((file) => (file.id))
            }
        ]
    });

    return thread
}

export async function fetchAssistant(assistantId: string) {
    try {
        const response = await openai.beta.assistants.retrieve(
            assistantId,
        );
        return response;  // Returns the detailed information of the assistant
    } catch (error) {
        console.error('Error retrieving assistant:', (error as Error).message);
        return null;  // Return null or handle as appropriate in your context
    }

}

export async function runAssistant({ threadId, assistantId }: { threadId: string, assistantId: string }) {

    const run = await openai.beta.threads.runs.create(
        threadId,
        {
            assistant_id: threadId,
            stream: true
        },
    );

    return run;

}


export async function retrieveThread(threadId: string) {
    const thread = await openai.beta.threads.retrieve(threadId);
    return thread

}

export async function addUserMessageToThread(threadId: string, { message, fileIds }: { message: string, fileIds: string[] }) {
    const thread = await openai.beta.threads.messages.create(threadId, {
        content: message,
        file_ids: fileIds,
        role: 'user'
    })

    return thread

}

export async function createFile(file: Blob & {
    name: string, lastModified: number
}, purpose: "fine-tune" | "assistants") {
    const newFile = await openai.files.create({
        file: file,
        purpose: purpose,
    });

    return newFile

}