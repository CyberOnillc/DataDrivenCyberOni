import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from 'martian-node';
import { ChatCompletion, ChatCompletionChunk } from "martian-node/resources";
import { Stream } from "martian-node/streaming";
import { ChatCompletionMessageParam } from "openai/resources";
const openai = new OpenAI({
    apiKey: process.env.MARTIAN_API_KEY, // defaults to process.env["MARTIAN_API_KEY"]
});
async function textCompletion(prompt: string, history?: ChatCompletionMessageParam[] , options?: { stream: boolean }) {

    const chatCompletion = await openai.chat.completions.create({
        messages: [...(history ?? []), { role: 'user', content: prompt }],
        model: 'router',
        stream: options?.stream,
        tools: []
    });




   if(options?.stream) {

    const stream = OpenAIStream(chatCompletion as Stream<ChatCompletionChunk>)
    return new StreamingTextResponse(stream)
   }
   else  return chatCompletion as ChatCompletion

}

export { textCompletion }