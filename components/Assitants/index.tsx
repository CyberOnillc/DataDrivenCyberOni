'use client'
import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { Message } from "ai";
import { useNotify } from "../Notification";
import MessageDisplay from "./MessageDisplay";
import { ChatCompletion } from "openai/resources";
interface AiChat {
    history?: Message[],
    adapter: ChatAdapter
}

export interface ChatAdapter {
    streamText: (message: Omit<Message, "id">, oberver: StreamObeserver) => void
}
export type StreamObeserver = {
    next: (message: string) => void,
    error: (error: Error) => void,
    complete: () => void
}

const AiAssitant: React.FC<AiChat> = ({ adapter, history }) => {

    const [newMessage, setNewMessage] = useState<string | null>(null);
    const [disableInput, setDisableInput] = useState(false);
    const [typing, setTyping] = useState(false);
    const [currentHistory, setHistory] = useState(history ?? []);
    const [error, setError] = useState("");
    const notify = useNotify();
    async function onSendMessage(message: Omit<Message, "id">) {

        adapter.streamText(message, streamOberver)
    }

    function next(message: string) {
        setNewMessage(prev => prev + message)
        setDisableInput(true)
        setTyping(true)
    }
    const streamOberver: StreamObeserver = {
        next: next,
        error: (err: Error) => {
            notify(err.message, 'fail', {
                autoClose: true
            })
        },
        complete: () => {
            setDisableInput(false)
            setTyping(false)
            setNewMessage(null)
        }
    }


    useEffect(() => {

        if (typing && newMessage) {
            setHistory(prev => ([...prev, {
                content: newMessage,
                role: 'system',
                id: "1234"

            }]))
        }
    }, [newMessage, typing]);
    return (

        <div>
            <MessageDisplay typing={typing} history={currentHistory} />
            <ChatInput disabled={disableInput} onSendMessage={onSendMessage} />
        </div>);
}

export default AiAssitant;