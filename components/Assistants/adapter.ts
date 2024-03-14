"use client"
import { getOpenAiResponse } from "@/lib/externalRequests/openai"
import { ChatCompletionCreateParams, ChatCompletionMessage, ChatCompletionUserMessageParam } from "openai/resources"
import { Message } from "ai"
import { StreamObserver } from "."


export async function OpenAiStreamResponse(messages: Message[], observer: StreamObserver) {
    const body = {
        messages: messages.map(message => ({ role: message.role, content: message.content, name: message.name })),
    }
    const streamText = await fetch('/api/chat', { method: 'POST', body: JSON.stringify(body) })
    if (streamText.status == 200) {
        readStreamToString(streamText.body as ReadableStream, observer)

    }
    else observer.error({ message: 'Error fetching repsonse', name: 'FetchError' })


    // Exit when done

}

async function readStreamToString(stream: ReadableStream<Uint8Array>, observer: StreamObserver) {
    const reader = stream.getReader();
    let result = '';
    let complete = false
    while (!complete) {
        const { done, value } = await reader.read();
        if (done) {
            complete = true
            observer.complete(result);
        }
        else {
            let nextChunk = new TextDecoder().decode(value)
            result = result + nextChunk;
            observer.next(nextChunk);
        }
    }
}

