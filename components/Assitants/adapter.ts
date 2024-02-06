"use client"
import { getOpenAiResponse } from "@/lib/externalRequests/openai"
import { ChatCompletionCreateParams, ChatCompletionMessage, ChatCompletionUserMessageParam } from "openai/resources"
import { ChatAdapter, StreamObeserver } from "."
import { Message } from "ai"


export async function OpenAiStreamResponse(message: Omit<Message, "id">, oberver: StreamObeserver) {
    const body = {
        messages:[message as ChatCompletionUserMessageParam]
    }
    const streamText = await fetch('/api/chat', { method: 'POST', body: JSON.stringify(body) })
    if (streamText.status == 200) {
        readStreamToString(streamText.body as ReadableStream, oberver)

    }
    else oberver.error({ message: 'Error fetching repsonse', name: 'FetchError' })


    // Exit when done

}

async function readStreamToString(stream: ReadableStream<Uint8Array>, oberver: StreamObeserver) {
    const reader = stream.getReader();
    let result = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            oberver.complete()
            break;
        }
        oberver.next(new TextDecoder().decode(value));
    }
    return result;
}

