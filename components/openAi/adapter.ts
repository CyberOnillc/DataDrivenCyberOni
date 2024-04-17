'use client'
import { Adapter, StreamingAdapterObserver } from "@nlux/react"
export const openAiStreamingAdapter: Adapter = {
    streamText: streamText
}

async function fetchText(message: string): Promise<string> {

    return "re[pse"
}

async function streamText(message: string, observer: StreamingAdapterObserver) {
    try {
        const body = {
            messages: [{role:'user', content: message}]
        }
        const streamText = await fetch('/api/chat', { method: 'POST', body: JSON.stringify(body) })
        if (streamText.status == 200) {
            readStreamToString(streamText.body as ReadableStream, observer)
    
        }
        else observer.error({ message: 'Error fetching response', name: 'FetchError' })
    } catch (error) {
            console.log(error);
    }

    // Exit when done

}

async function readStreamToString(stream: ReadableStream<Uint8Array>, observer: StreamingAdapterObserver) {
    const reader = stream.getReader();
    let complete = false
    let result = '';
    while (!complete) {
        const { done, value } = await reader.read();
        if (done) {
            observer.complete();
            complete=true
        }
        observer.next(new TextDecoder().decode(value));
    }
    return result;
}


