import { Adapter, StreamingAdapterObserver } from "@nlux/react"

export const openAiStreamingAdapter: Adapter = {
    streamText: streamText
}

async function fetchText(message: string): Promise<string> {

    return "re[pse"
}

async function streamText(message: string, oberver: StreamingAdapterObserver) {
    const body = {
        messages: [{role:'user', content: message}]
    }
    const streamText = await fetch('/api/chat', { method: 'POST', body: JSON.stringify(body) })
    if (streamText.status == 200) {
        readStreamToString(streamText.body as ReadableStream, oberver)

    }
    else oberver.error({ message: 'Error fetching repsonse', name: 'FetchError' })

    // Exit when done

}

async function readStreamToString(stream: ReadableStream<Uint8Array>, oberver: StreamingAdapterObserver) {
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


