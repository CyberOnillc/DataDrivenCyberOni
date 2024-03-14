"use client";
import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { Message } from "ai";
import { useNotify } from "../Notification";
import MessageDisplay from "./MessageDisplay";
import { ChatCompletion } from "openai/resources";
import { v4 as uuidv4 } from "uuid";

interface AiChat {
    history?: Message[];
    adapter: ChatAdapter;
}

export interface ChatAdapter {
    streamText: (message: Message[], observer: StreamObserver) => void;
}
export interface StreamObserver {
    next: (messageChunk: string) => void;
    error: (error: Error) => void;
    complete: (result: string) => void;
}

const AiAssistant: React.FC<AiChat> = ({ adapter, history }) => {
    const [newMessage, setNewMessage] = useState<string>("");
    const [message, setMessage] = useState("");
    const [disableInput, setDisableInput] = useState(false);
    const [typing, setTyping] = useState(false);
    const [currentHistory, setHistory] = useState(history ?? []);
    const [error, setError] = useState("");
    const notify = useNotify();

    async function onSendMessage(message: Message) {
        setHistory((prev) => [...prev, message]);
        adapter.streamText([...currentHistory, message], streamObserver);
    }

    function next(message: string) {
        setDisableInput(true);
        setTyping(true);
        console.log("next chuck : ", message);
        setNewMessage((prev) => prev + message);
    }
    const streamObserver: StreamObserver = {
        next: next,
        error: (err: Error) => {
            notify(err.message, "fail", {
                autoClose: true,
            });
        },
        complete: (result: string) => {
            setHistory((prev) => [
                ...prev,
                { content: result, role: "assistant", id: uuidv4() },
            ]);
            setTyping(false);
            setDisableInput(false);
            setNewMessage("");
        },
    };

    // update history when new message is added

    return (
        <div className="flex h-[90vh] max-h-[75vh] w-full flex-col items-center  justify-center gap-10 px-5">
            <div className="h-5/6 w-full scrollbar-thin">
                <MessageDisplay
                    current={{ content: newMessage, role: "assistant" }}
                    typing={typing}
                    history={currentHistory}
                />
            </div>
            <div className="h-1/6 w-full">
                <ChatInput disabled={disableInput} onSendMessage={onSendMessage} />
            </div>
        </div>
    );
};

export default AiAssistant;
